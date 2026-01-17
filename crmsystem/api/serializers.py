from rest_framework import serializers
from .models import Registration
from rest_framework import serializers
from .models import User, Campaign, CampaignReview
from django.contrib.auth import authenticate

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'name', 'email', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value):
        # Kiểm tra email đã tồn tại chưa để trả về lỗi cụ thể cho Frontend
        if Registration.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email này đã được đăng ký trong hệ thống!")
        return value
    


# ================= USER SERIALIZERS =================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Bổ sung các trường mới vào response để Frontend hiển thị (avatar, full_name)
        fields = ['id', 'username', 'email', 'full_name', 'avatar_url', 'role', 'balance', 'phone']
        read_only_fields = ['balance', 'role', 'email', 'username']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'phone', 'first_name', 'last_name', 'full_name']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password) # Mã hóa password
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField() # Có thể nhập username hoặc email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Logic check xem input là username hay email
        username = data.get('username')
        password = data.get('password')
        
        user = None
        # Thử tìm theo username trước
        try:
            user_obj = User.objects.get(username=username)
            if user_obj.check_password(password):
                user = user_obj
        except User.DoesNotExist:
            # Nếu không thấy username, thử tìm theo email
            try:
                user_obj = User.objects.get(email=username)
                if user_obj.check_password(password):
                    user = user_obj
            except User.DoesNotExist:
                pass

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Tài khoản hoặc mật khẩu không đúng.")

class SocialLoginSerializer(serializers.Serializer):
    """
    Serializer nhận dữ liệu từ Frontend sau khi đăng nhập thành công với Google/Facebook
    """
    provider = serializers.ChoiceField(choices=['google', 'facebook'])
    social_id = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    full_name = serializers.CharField(required=False, allow_blank=True)
    avatar_url = serializers.CharField(required=False, allow_blank=True)

# ================= CAMPAIGN SERIALIZERS (Giữ nguyên) =================
class CampaignSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)

    class Meta:
        model = Campaign
        fields = '__all__'
        read_only_fields = ['client', 'quantity_done', 'created_at', 'updated_at']

# ================= REVIEW SERIALIZERS (Giữ nguyên) =================
class CampaignReviewSerializer(serializers.ModelSerializer):
    ctv_name = serializers.CharField(source='ctv.username', read_only=True)
    campaign_name = serializers.CharField(source='campaign.name', read_only=True)

    class Meta:
        model = CampaignReview
        fields = '__all__'
        read_only_fields = ['ctv', 'status', 'reject_reason', 'created_at']

class ReviewActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['APPROVE', 'REJECT'])
    reason = serializers.CharField(required=False, allow_blank=True)


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