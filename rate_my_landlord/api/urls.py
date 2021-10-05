from django.urls import path
from .views import LandlordView, main

urlpatterns = [
    path('', main),
    path('home', LandlordView.as_view()),
]
