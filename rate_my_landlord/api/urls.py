from django.urls import path
from .views import LandlordView, main, CreateLandlordView

urlpatterns = [
    path('', main),
    path('home', LandlordView.as_view()),
    path('create-landlord', CreateLandlordView.as_view()),
]
