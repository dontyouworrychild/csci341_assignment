from rest_framework import serializers
# from django.contrib.auth import get_user_model
# User = get_user_model() 

from user.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from caregivers_app.models import Caregiver, Member


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'password', 'password2', 'email', 'given_name', 'surname', 'city', 'phone_number', 'profile_description') 

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            given_name=validated_data['given_name'],
            surname=validated_data['surname'],
            city=validated_data['city'],
            phone_number=validated_data['phone_number'],
            profile_description=validated_data['profile_description'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
class RegisterMemberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Member
        fields = ('id', 'password', 'password2', 'email', 'given_name', 'surname', 'city', 'phone_number', 'profile_description', 'house_rules') 

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Member.objects.create(
            email=validated_data['email'],
            given_name=validated_data['given_name'],
            surname=validated_data['surname'],
            city=validated_data['city'],
            phone_number=validated_data['phone_number'],
            profile_description=validated_data['profile_description'],
            house_rules=validated_data['house_rules']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
class RegisterCaregiverSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Caregiver
        fields = ('id', 'password', 'password2', 'email', 'given_name', 'surname', 'city', 'phone_number', 'profile_description', 'gender', 'caregiving_type', 'hourly_rate') 

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Caregiver.objects.create(
            email=validated_data['email'],
            given_name=validated_data['given_name'],
            surname=validated_data['surname'],
            city=validated_data['city'],
            phone_number=validated_data['phone_number'],
            profile_description=validated_data['profile_description'],
            gender=validated_data['gender'],
            caregiving_type=validated_data['caregiving_type'],
            hourly_rate=validated_data['hourly_rate']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = "__all__"