from django.db import models

# from django.contrib.auth import get_user_model
# User = get_user_model()

from user.models import User



GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
]
def unique_directory_path(instance, filename):
    extension = filename.split('.')[-1]
    return f"caregivers/{instance.id}.{extension}"

class Caregiver(User):
    image = models.ImageField(upload_to=unique_directory_path, blank=True)
    gender = models.CharField(max_length=7, choices=GENDER_CHOICES)
    caregiving_type = models.CharField(max_length=63)
    hourly_rate = models.DecimalField(max_digits=9, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.given_name} {self.surname} - {self.caregiving_type}"
    
    def save(self, *args, **kwargs):
        self.role = 'caregiver' 
        super().save(*args, **kwargs)
    

class Member(User):
    house_rules = models.TextField()

    def __str__(self) -> str:
        return f"{self.given_name} {self.surname} - {self.house_rules}"
    
    def save(self, *args, **kwargs):
        self.role = 'member'
        super().save(*args, **kwargs)

class Address(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True)
    house_number = models.CharField(max_length=7)
    street = models.CharField(max_length=127)
    town = models.CharField(max_length=63)

    def __str__(self) -> str:
        return f"{self.town} city, {self.street} street, {self.house_number} house"

class Job(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    required_caregiving_type = models.CharField(max_length=50)
    other_requirements = models.TextField()
    date_posted = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.required_caregiving_type

class JobApplication(models.Model):
    caregiver = models.ForeignKey(Caregiver, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    date_applied = models.DateField(auto_now_add=True)
    class Meta:
        unique_together = ('caregiver', 'job')

    def __str__(self) -> str:
        return f"{self.caregiver.given_name} {self.caregiver.surname} applied to {self.job.required_caregiving_type} at {self.date_applied}"
    

class Appointment(models.Model):
    caregiver = models.ForeignKey(Caregiver, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    work_hours = models.IntegerField()
    status = models.CharField(max_length=15, default='Scheduled')

    def __str__(self) -> str:
        return f"{self.caregiver.given_name} {self.caregiver.surname} and {self.member.given_name} {self.member.surname} will meet at {self.appointment_date} {self.appointment_time} - {self.status}"
