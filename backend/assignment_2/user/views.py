# from django.shortcuts import render

# from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer, RegisterCaregiverSerializer, RegisterMemberSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
# from django.contrib.auth import get_user_model
# User = get_user_model()
from caregivers_app.models import Caregiver, Member, Job, JobApplication
from caregivers_app.serializers import CaregiverJobSerializer, AppointmentSerializer, JobSerializer, ListJobApplicationSerializer
from user.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from caregivers_app.models import Appointment

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class RegisterMemberView(generics.CreateAPIView):
    queryset = Member.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterMemberSerializer

class RegisterCaregiverView(generics.CreateAPIView):
    queryset = Caregiver.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterCaregiverSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({'email': user.email, 'role': user.role, 'first_name': user.given_name, 'last_name': user.surname})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def made_appointment(request):
    user = request.user
    caregiver_id = request.data.get('caregiver')
    
    if caregiver_id is None:
        return Response({'error': 'caregiver is required in the request body'}, status=400)

    result = Appointment.objects.filter(member=user, caregiver__id=caregiver_id)
    if result.exists():
        return Response({'value': True}, status=200)
    return Response({'value': False}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_jobs(request):
    jobs = Job.objects.all()
    serializer = CaregiverJobSerializer(jobs, many=True, context={'request': request})
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_my_posted_jobs(request):
    jobs = Job.objects.filter(member=request.user)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_appointments(request):
    user = request.user 
    if user.role == 'member':
        appointments = Appointment.objects.filter(member=user)
    elif user.role == 'caregiver':
        appointments = Appointment.objects.filter(caregiver=user)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_job_applications(request):
    user = request.user
    jobs = Job.objects.filter(member=user)
    job_applications = JobApplication.objects.filter(job__in=jobs)
    serializer = ListJobApplicationSerializer(job_applications, many=True)

    return Response(serializer.data, status=200)

