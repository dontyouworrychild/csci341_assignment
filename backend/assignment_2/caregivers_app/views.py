from rest_framework import viewsets
from .models import *
from .serializers import CaregiverSerializer, MemberSerializer, AddressSerializer, AppointmentSerializer, JobSerializer, JobApplicationSerializer, CreateAppointmentSerializer
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets, status
from rest_framework.decorators import action

class CaregiverViewsets(viewsets.ModelViewSet):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer

class MemberViewsets(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer 

class AddressViewsets(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer 

class AppointmentViewsets(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer 
    permission_classes = (IsAuthenticated, )

    

    def create(self, request):
        member_id = self.request.user.id
        data = {
            'member': member_id,
            **request.data
        }
        serializer = CreateAppointmentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class JobViewsets(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer 
    permission_classes = (IsAuthenticated, )

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.action in ['get_all_jobs']:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        jobs = Job.objects.filter(member=self.request.user)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        member_id = self.request.user.id
        data = {
            'member': member_id,
            **request.data
        }
        serializer = JobSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class JobApplicationViewsets(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

    def create(self, request):
        caregiver_id = self.request.user.id
        data = {
            'caregiver': caregiver_id,
            **request.data
        }
        serializer = JobApplicationSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)