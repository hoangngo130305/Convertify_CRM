from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class Registration(models.Model):
    name = models.CharField(max_length=255, verbose_name="Họ và tên")
    email = models.EmailField(unique=True, verbose_name="Email")
    note = models.TextField(null=True, blank=True, verbose_name="Ghi chú")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày đăng ký")

    class Meta:
        db_table = 'registrations' # Khớp với tên bảng MySQL bạn vừa tạo
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.email})"
    


class User(AbstractUser):
    """
    Custom User Model hỗ trợ:
    1. Phân quyền: Client/CTV (Logic cũ)
    2. Social Login: Google/Facebook (Logic mới từ Convertify DB)
    """
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        CLIENT = 'CLIENT', 'Khách hàng (Client)'
        CTV = 'CTV', 'Cộng tác viên'

    # --- Các trường cũ của Review Seeding ---
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CLIENT)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    phone = models.CharField(max_length=15, blank=True, null=True)
    
    # --- CÁC TRƯỜNG MỚI CHO SOCIAL LOGIN (Mapping với bảng users trong SQL) ---
    # Lưu ID từ Google/Facebook để định danh
    google_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    facebook_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    
    # Lưu link ảnh đại diện
    avatar_url = models.TextField(null=True, blank=True)
    
    # Tên hiển thị đầy đủ (nếu không muốn dùng first_name/last_name tách rời)
    full_name = models.CharField(max_length=255, null=True, blank=True)

    # Override email để bắt buộc và là duy nhất (quan trọng cho định danh)
    email = models.EmailField(_('email address'), unique=True)

    def __str__(self):
        # Hiển thị email nếu không có username, hoặc ngược lại
        return f"{self.username} ({self.email}) - {self.role}"

    def save(self, *args, **kwargs):
        # Tự động điền full_name từ first/last name nếu full_name trống
        if not self.full_name and (self.first_name or self.last_name):
            self.full_name = f"{self.first_name} {self.last_name}".strip()
        super().save(*args, **kwargs)

# ... Các class Campaign và CampaignReview giữ nguyên ...
class Campaign(models.Model):
    # (Giữ nguyên code cũ của bạn)
    class Status(models.TextChoices):
        RUNNING = 'RUNNING', 'Đang chạy'
        PAUSED = 'PAUSED', 'Tạm dừng'
        COMPLETED = 'COMPLETED', 'Hoàn thành'
        CANCELLED = 'CANCELLED', 'Đã hủy'

    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='campaigns')
    name = models.CharField(max_length=255)
    url = models.URLField(help_text="Link cần review (Google Maps, Facebook, Shopee...)")
    content_instruction = models.TextField(help_text="Hướng dẫn nội dung review cho CTV")
    
    price_per_review = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_target = models.IntegerField(default=10)
    quantity_done = models.IntegerField(default=0)
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.RUNNING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.client.username}"

class CampaignReview(models.Model):
    # (Giữ nguyên code cũ của bạn)
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Chờ duyệt'
        APPROVED = 'APPROVED', 'Đã duyệt'
        REJECTED = 'REJECTED', 'Từ chối'

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='reviews')
    ctv = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_done')
    
    content = models.TextField(help_text="Nội dung review đã viết")
    proof_image = models.ImageField(upload_to='proofs/', blank=True, null=True, help_text="Ảnh bằng chứng")
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    reject_reason = models.CharField(max_length=255, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('campaign', 'ctv') 

    def __str__(self):
        return f"Review #{self.id} by {self.ctv.username}"

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
        db_table = 'convertify_auth'