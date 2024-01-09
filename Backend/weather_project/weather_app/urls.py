from django.urls import path
from .views import RegisterView, MyTokenObtainPairView, LogoutView,WeatherDataView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/weather/', WeatherDataView.as_view(), name='weather-list'),
    
]

