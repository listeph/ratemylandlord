from django.urls import path
from .views import GetAllReviews, GetMatchingLandlords, main, CreateLandlordView, GetLandlordById, GetAllLandlords

urlpatterns = [
    path('', main),
    path('create-landlord', CreateLandlordView.as_view()),
    path('get-landlord-by-id', GetLandlordById.as_view()),
    path('get-all-landlords', GetAllLandlords.as_view()),
    path('get-matching-landlords', GetMatchingLandlords.as_view()),
    path('get-all-reviews', GetAllReviews.as_view())
]
