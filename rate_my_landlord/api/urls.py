from django.urls import path, include
from .views import LandlordView

urlpatterns = [
    path('home', LandlordView.as_view())
]
