from .models import Registration
from .serializers import RegistrationSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.crypto import get_random_string

from .models import User, Campaign, CampaignReview
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer, SocialLoginSerializer,
    CampaignSerializer, CampaignReviewSerializer, ReviewActionSerializer
)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get_permissions(self):
        # Cho phép mọi người POST (đăng ký)
        if self.action == 'create':
            return [permissions.AllowAny()]
        # Các hành động khác (list, retrieve, delete) yêu cầu quyền Admin
        return [permissions.IsAdminUser()]
    


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet quản lý User + Authentication (Login thường + Social Login)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Cho phép login/register/social_login mà không cần token
        if self.action in ['login', 'register', 'social_login']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """Login thường (Username/Password)"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            refresh['role'] = user.role
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def social_login(self, request):
        """
        API xử lý đăng nhập Google/Facebook.
        Logic:
        1. Nhận email, social_id từ Frontend.
        2. Tìm user theo email.
        3. Nếu user tồn tại -> Update social_id -> Trả token.
        4. Nếu user chưa có -> Tạo user mới -> Trả token.
        """
        serializer = SocialLoginSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            provider = data['provider']
            email = data['email']
            social_id = data['social_id']
            full_name = data.get('full_name', '')
            avatar_url = data.get('avatar_url', '')

            # Kiểm tra xem user đã tồn tại chưa (dựa vào email)
            try:
                user = User.objects.get(email=email)
                
                # Cập nhật ID mạng xã hội nếu chưa có (Liên kết tài khoản)
                if provider == 'google' and not user.google_id:
                    user.google_id = social_id
                    user.save()
                elif provider == 'facebook' and not user.facebook_id:
                    user.facebook_id = social_id
                    user.save()
                
                # Cập nhật avatar nếu user chưa có avatar
                if avatar_url and not user.avatar_url:
                    user.avatar_url = avatar_url
                    user.save()

            except User.DoesNotExist:
                # Nếu chưa có user -> Tạo mới
                # Tạo username unique từ email hoặc random
                username = email.split('@')[0]
                if User.objects.filter(username=username).exists():
                    username = f"{username}_{get_random_string(4)}"

                user = User.objects.create(
                    username=username,
                    email=email,
                    full_name=full_name,
                    avatar_url=avatar_url,
                    role=User.Role.CLIENT, # Mặc định là Client
                    is_active=True
                )
                
                if provider == 'google':
                    user.google_id = social_id
                else:
                    user.facebook_id = social_id
                
                user.set_unusable_password() # User này không có password
                user.save()

            # Tạo Token JWT
            refresh = RefreshToken.for_user(user)
            refresh['role'] = user.role

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Lấy thông tin user đang đăng nhập"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class CampaignViewSet(viewsets.ModelViewSet):
    # (Giữ nguyên code cũ)
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.CLIENT:
            return Campaign.objects.filter(client=user)
        elif user.role == User.Role.CTV:
            return Campaign.objects.filter(status=Campaign.Status.RUNNING)
        return Campaign.objects.all()

    def perform_create(self, serializer):
        if self.request.user.role != User.Role.CLIENT and not self.request.user.is_superuser:
            raise permissions.PermissionDenied("Chỉ Client mới được tạo chiến dịch.")
        serializer.save(client=self.request.user)


class CampaignReviewViewSet(viewsets.ModelViewSet):
    # (Giữ nguyên code cũ)
    serializer_class = CampaignReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.CTV:
            return CampaignReview.objects.filter(ctv=user)
        elif user.role == User.Role.CLIENT:
            return CampaignReview.objects.filter(campaign__client=user)
        return CampaignReview.objects.all()

    def perform_create(self, serializer):
        if self.request.user.role != User.Role.CTV:
             raise permissions.PermissionDenied("Chỉ CTV mới được gửi Review.")
        serializer.save(ctv=self.request.user)

    @action(detail=True, methods=['post'])
    def moderate(self, request, pk=None):
        review = self.get_object()
        if review.campaign.client != request.user:
            return Response({"error": "Không có quyền duyệt review này"}, status=status.HTTP_403_FORBIDDEN)

        serializer = ReviewActionSerializer(data=request.data)
        if serializer.is_valid():
            action_type = serializer.validated_data['action']
            reason = serializer.validated_data.get('reason', '')

            if action_type == 'APPROVE':
                review.status = CampaignReview.Status.APPROVED
            else:
                review.status = CampaignReview.Status.REJECTED
                review.reject_reason = reason
            
            review.save()
            return Response(CampaignReviewSerializer(review).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# api/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import ConvertifyAuth
from .serializers import ConvertifyAuthSerializer, Step2CompleteSerializer, Step1EmailSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name='dispatch')
class ConvertifyAuthViewSet(viewsets.ModelViewSet):
    queryset = ConvertifyAuth.objects.all()
    serializer_class = ConvertifyAuthSerializer
    
    # DÒNG QUAN TRỌNG NHẤT ĐỂ SỬA LỖI 403:
    authentication_classes = [] 
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'], url_path='check-email', serializer_class=Step1EmailSerializer)
    def check_email(self, request):
        serializer = Step1EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            exists = ConvertifyAuth.objects.filter(email=email).exists()
            return Response({"email": email, "is_registered": exists})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='finalize', serializer_class=Step2CompleteSerializer)
    def finalize(self, request):
        serializer = Step2CompleteSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            username = serializer.validated_data['login_username']
            password = serializer.validated_data['password']

            # Lưu hoặc cập nhật dữ liệu vào database
            auth_entry, created = ConvertifyAuth.objects.update_or_create(
                email=email,
                defaults={
                    'login_username': username,
                    'password_hash': make_password(password)
                }
            )
            return Response({"message": "Success", "data": ConvertifyAuthSerializer(auth_entry).data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='quick-register', serializer_class=Step1EmailSerializer)
    def quick_register(self, request):
        """
        API đăng ký nhanh chỉ với email.
        Các trường login_username, password_hash, full_name sẽ để null.
        """
        serializer = Step1EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Kiểm tra xem email đã tồn tại chưa
            auth_entry, created = ConvertifyAuth.objects.get_or_create(
                email=email,
                defaults={
                    'login_username': None,
                    'password_hash': None,
                    'full_name': None
                }
            )
            
            if created:
                message = "Đăng ký thành công"
            else:
                message = "Email đã tồn tại, đăng nhập thành công"
            
            return Response({
                "message": message,
                "created": created,
                "data": ConvertifyAuthSerializer(auth_entry).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

