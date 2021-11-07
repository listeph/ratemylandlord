from django.urls import path
from .views import GetAllLandlords, main, CreateLandlordView, GetLandlord

urlpatterns = [
    path('', main),
    path('create-landlord', CreateLandlordView.as_view()),
    path('get-landlord', GetLandlord.as_view()),
    path('get-all-landlords', GetAllLandlords.as_view()),
]
