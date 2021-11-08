from django.urls import path
from .views import GetMatchingLandlords, main, CreateLandlordView, GetLandlordById

urlpatterns = [
    path('', main),
    path('create-landlord', CreateLandlordView.as_view()),
    path('get-landlord-by-id', GetLandlordById.as_view()),
    path('get-matching-landlords', GetMatchingLandlords.as_view()),
]
