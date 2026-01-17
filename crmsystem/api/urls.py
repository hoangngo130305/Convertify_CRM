from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

# ============================================================
# ROUTER CONFIGURATION
# ============================================================
router = DefaultRouter()

# Đăng ký các ViewSets
router.register(r'registrations', views.RegistrationViewSet, basename='registrations')
# /api/users/ -> List users, /api/users/login/, /api/users/register/
router.register(r'users', views.UserViewSet, basename='users')

# /api/campaigns/ -> CRUD Campaigns
router.register(r'campaigns', views.CampaignViewSet, basename='campaigns')

# /api/reviews/ -> CRUD Reviews, /api/reviews/{id}/moderate/
router.register(r'reviews', views.CampaignReviewViewSet, basename='reviews')
# Thêm dòng này vào router bạn đã tạo
router.register(r'auth-convertify', views.ConvertifyAuthViewSet, basename='auth-convertify')
# ============================================================
# URL PATTERNS
# ============================================================
urlpatterns = [
    # # Authentication endpoints
    # path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Router URLs
    
    path('', include(router.urls)),
]