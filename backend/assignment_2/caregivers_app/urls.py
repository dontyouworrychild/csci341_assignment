from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CaregiverViewsets,
    MemberViewsets,
    AddressViewsets,
    AppointmentViewsets,
    JobViewsets,
    JobApplicationViewsets,
)

# Create a router and register your viewsets
router = DefaultRouter()

router.register(r'caregivers', CaregiverViewsets, basename='caregiver')
router.register(r'members', MemberViewsets, basename='member')
router.register(r'addresses', AddressViewsets, basename='address')
router.register(r'appointments', AppointmentViewsets, basename='appointment')
router.register(r'jobs', JobViewsets, basename='job')
router.register(r'job_applications', JobApplicationViewsets, basename='jobapplication')

# Include the generated URLs in your patterns
urlpatterns = [
    path('', include(router.urls)),
]