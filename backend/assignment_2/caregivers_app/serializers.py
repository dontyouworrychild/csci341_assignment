from .models import *
from rest_framework import serializers

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = "__all__"


class CaregiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caregiver
        fields = ('id', 'email', 'given_name', 'surname', 'city', 'phone_number', 'profile_description', 'image', 'gender', 'caregiving_type', 'hourly_rate')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'email', 'given_name', 'surname', 'city', 'phone_number', 'profile_description', 'house_rules')

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('member', 'house_number', 'street', 'town')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'member', 'required_caregiving_type', 'other_requirements', 'date_posted')

class CaregiverJobSerializer(serializers.ModelSerializer):
    applied = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = ('id', 'member', 'required_caregiving_type', 'other_requirements', 'date_posted', 'applied')

    def get_applied(self, obj):
        # Assuming that 'self.context['request'].user' gives you the currently logged-in user
        user = self.context['request'].user
        print(obj.id)
        if user.is_authenticated:
            return JobApplication.objects.filter(job=obj.id, caregiver=user).exists()
        return False


class JobApplicationSerializer(serializers.ModelSerializer):
    # caregiver = CaregiverSerializer()
    # job = JobSerializer()
    class Meta:
        model = JobApplication
        fields = ('id', 'caregiver', 'job', 'date_applied')

class ListJobApplicationSerializer(serializers.ModelSerializer):
    caregiver = CaregiverSerializer()
    job = JobSerializer()
    class Meta:
        model = JobApplication
        fields = ('id', 'caregiver', 'job', 'date_applied')

class CreateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('caregiver', 'member', 'appointment_date', 'appointment_time', 'work_hours', 'status')

class AppointmentSerializer(serializers.ModelSerializer):
    member = MemberSerializer()
    caregiver = CaregiverSerializer()

    class Meta:
        model = Appointment
        fields = ('id', 'caregiver', 'member', 'appointment_date', 'appointment_time', 'work_hours', 'status')



