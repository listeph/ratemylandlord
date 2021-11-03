from django.urls import path
from .views import LandlordView, main, CreateLandlordView, GetLandlord

urlpatterns = [
    path('', main),
    path('home', LandlordView.as_view()),
    path('create-landlord', CreateLandlordView.as_view()),
    path('get-landlord', GetLandlord.as_view())
]
