from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView
from user.views import RegisterView, RegisterCaregiverView, RegisterMemberView
from django.conf import settings
from django.conf.urls.static import static


from user.views import get_user_info, made_appointment, get_all_jobs, get_my_appointments, get_my_posted_jobs, get_my_job_applications

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh-token"),
    path("token/verify/", TokenVerifyView.as_view(), name="verify-token"),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('register_member/', RegisterMemberView.as_view(), name='register_member'),
    path('register_caregiver/', RegisterCaregiverView.as_view(), name='register_caregiver'),
    path('api/user_info/', get_user_info, name='get_user_info'),
    path('api/made_appointment/', made_appointment, name='made_appointment'),
    path('api/all_jobs/', get_all_jobs, name='get_all_jobs'),
    path('api/my_posted_jobs/', get_my_posted_jobs, name='get_my_posted_jobs'),
    path('api/my_appointments/', get_my_appointments, name='my_appointments'),
    path('api/my_job_applications/', get_my_job_applications, name='my_job_applications'),
    path('', include('caregivers_app.urls')),
    # path("", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)