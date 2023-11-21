from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    given_name = models.CharField(max_length=63)
    surname = models.CharField(max_length=63)
    city = models.CharField(max_length=63)
    phone_number = models.CharField(max_length=31)
    profile_description = models.TextField()    

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('caregiver', 'Caregiver'),
        ('member', 'Member'),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='admin')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return f"{self.email}"
