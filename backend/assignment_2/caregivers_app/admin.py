from django.contrib import admin
from .models import *

class CaregiverAdmin(admin.ModelAdmin):
    exclude = ('role', 'is_staff', 'is_active', 'is_admin', 'last_login', 'groups', 'is_superuser', 'user_permissions')

    fieldsets = (
        (None, {"fields": ("email", "password", "given_name", "surname", "image", "gender", "caregiving_type", "hourly_rate")}),
    )
    list_display = ("email", "given_name", "surname","image", "gender", "caregiving_type", "hourly_rate")


class MemberAdmin(admin.ModelAdmin):
    exclude = ('role', 'is_staff', 'is_active', 'is_admin', 'last_login', 'groups', 'is_superuser', 'user_permissions')

    fieldsets = (
        (None, {"fields": ("email", "password", "given_name", "surname", "house_rules")}),
    )
    list_display = ("email", "given_name", "surname", "house_rules")




admin.site.register(Caregiver, CaregiverAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(Address)
admin.site.register(Job)
admin.site.register(JobApplication)
admin.site.register(Appointment)
