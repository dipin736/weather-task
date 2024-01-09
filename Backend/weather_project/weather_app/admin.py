from django.contrib import admin
from django.contrib import admin
from .models import WeatherData

# Register your models here.


class WeatherDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'description', 'temperature', 'humidity', 'feels_like', 'timestamp')
    list_filter = ('user', 'location', 'timestamp')
    search_fields = ('location', 'description')

admin.site.register(WeatherData, WeatherDataAdmin)
