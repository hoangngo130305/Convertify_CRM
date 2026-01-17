from django.db import models

class ConvertifyAuth(models.Model):
    # id được Django tự động tạo là BigAutoField khớp với bigint(20) UNSIGNED
    email = models.EmailField(unique=True, verbose_name="Email xác nhận")
    login_username = models.CharField(
        max_length=100, 
        unique=True, 
        null=True, 
        blank=True, 
        verbose_name="Tên tài khoản"
    )
    password_hash = models.CharField(
        max_length=255, 
        null=True, 
        blank=True, 
        verbose_name="Mật khẩu (Hashed)"
    )
    full_name = models.CharField(
        max_length=255, 
        null=True, 
        blank=True, 
        verbose_name="Họ và tên"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Ngày cập nhật")

    class Meta:
        db_table = 'convertify_auth' # Khớp với bảng MySQL của bạn
        ordering = ['-created_at']
        verbose_name = "Xác thực Convertify"

    def __str__(self):
        return f"{self.login_username} ({self.email})"



from rest_framework import serializers
from .models import ConvertifyAuth

class ConvertifyAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConvertifyAuth
        fields = ['id', 'email', 'login_username', 'full_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# Serializer cho Ảnh 2 (Check Email)
class Step1EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

# Serializer cho Ảnh 1 (Nhập User/Pass)
class Step2CompleteSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    login_username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)






from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import ConvertifyAuth
from .serializers import (
    ConvertifyAuthSerializer, Step1EmailSerializer, Step2CompleteSerializer
)

class ConvertifyAuthViewSet(viewsets.ModelViewSet):
    queryset = ConvertifyAuth.objects.all()
    serializer_class = ConvertifyAuthSerializer

    def get_permissions(self):
        # Cho phép gọi API check-email và finalize mà không cần đăng nhập
        if self.action in ['check_email', 'finalize']:
            return [permissions.AllowAny()]
        # Các thao tác quản trị khác (list, delete...) yêu cầu Admin
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['post'], url_path='check-email', serializer_class=Step1EmailSerializer)
    def check_email(self, request):
        """Xử lý Ảnh 2: Kiểm tra email tồn tại"""
        serializer = Step1EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            exists = ConvertifyAuth.objects.filter(email=email).exists()
            return Response({
                "email": email,
                "is_registered": exists,
                "message": "Vui lòng hoàn tất thông tin tài khoản."
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='finalize', serializer_class=Step2CompleteSerializer)
    def finalize(self, request):
        """Xử lý Ảnh 1: Đăng ký hoặc Đăng nhập tự do"""
        serializer = Step2CompleteSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            username = serializer.validated_data['login_username']
            password = serializer.validated_data['password']

            auth_entry = ConvertifyAuth.objects.filter(email=email).first()

            if auth_entry:
                # Nếu đã có email -> Kiểm tra mật khẩu (Đăng nhập)
                if check_password(password, auth_entry.password_hash):
                    auth_entry.login_username = username
                    auth_entry.save()
                    msg = "Đăng nhập thành công"
                else:
                    return Response({"error": "Mật khẩu không khớp."}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                # Nếu chưa có -> Tạo mới (Đăng ký)
                if ConvertifyAuth.objects.filter(login_username=username).exists():
                    return Response({"error": "Username đã tồn tại."}, status=status.HTTP_400_BAD_REQUEST)
                
                auth_entry = ConvertifyAuth.objects.create(
                    email=email,
                    login_username=username,
                    password_hash=make_password(password)
                )
                msg = "Đăng ký thành công"

            return Response({
                "message": msg,
                "data": ConvertifyAuthSerializer(auth_entry).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)