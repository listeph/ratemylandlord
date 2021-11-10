from django.urls import path
from .views import GetAllReviews, GetMatchingLandlords, main, CreateLandlord, GetLandlordById, GetAllLandlords, GetReviewsForLandlord, CreateReview

urlpatterns = [
    path('', main),
    path('create-landlord', CreateLandlord.as_view()),
    path('get-landlord-by-id', GetLandlordById.as_view()),
    path('get-all-landlords', GetAllLandlords.as_view()),
    path('get-matching-landlords', GetMatchingLandlords.as_view()),
    path('get-all-reviews', GetAllReviews.as_view()),
    path('get-reviews-for-landlord', GetReviewsForLandlord.as_view()),
    path('create-review', CreateReview.as_view())
]
