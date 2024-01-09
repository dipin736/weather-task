from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import MyTokenObtainPairSerializer, UserSerializer,WeatherDataSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import generics,status
from .models import WeatherData
import requests
from rest_framework.views import APIView

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.data['message'] = 'Login successful.'
        return response

class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        return Response({"detail": "Successfully logged out."})


class WeatherDataView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        location = request.data.get('location')
        weather_api_url = f'https://api.openweathermap.org/data/2.5/weather?q={location}&appid=bc4ac82d76d080becd8c78ff08e382e7'
        response = requests.get(weather_api_url)
        weather_data = response.json()

        print('Response Content:', response.content)
        print('Weather Data:', weather_data)

        # Check if the API response contains 'weather' key
        if 'weather' not in weather_data:
            return Response({"message": "Error fetching weather data from the API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Extract relevant data from the API response
        description = weather_data['weather'][0]['description']
        temperature = weather_data['main']['temp']
        humidity = weather_data['main']['humidity']
        feels_like = weather_data['main']['feels_like']

        
        WeatherData.objects.create(
            user=request.user,
            location=location,
            description=description,
            temperature=temperature,
            humidity=humidity,
            feels_like=feels_like
        )

        return Response({"message": "Weather data saved successfully."})

    def get(self, request):
   
        weather_data = WeatherData.objects.filter(user=request.user).order_by('-timestamp').first()

        if weather_data:
            serializer = WeatherDataSerializer(weather_data)
            return Response(serializer.data)
        else:
            return Response({"message": "No weather data available."})

