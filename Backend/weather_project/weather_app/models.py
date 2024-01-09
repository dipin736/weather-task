from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WeatherData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    temperature = models.FloatField()
    humidity = models.FloatField()
    feels_like = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.location} - {self.timestamp}"
