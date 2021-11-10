from rest_framework import serializers
from .models import Landlord, Review

class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ('id', 'first_name', 'last_name')

class CreateLandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ('first_name', 'last_name')

class ReviewSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ('id', 'reviewer_name', 'created_at', 'landlord', 'safety_rating', 
            'responsiveness_rating', 'transparency_rating', 'organization_rating',
            'student_friendliness_rating', 'overall_rating')
    def get_created_at(self, obj):
        #TODO: turn time into 12 hr format and EST (or base timezone on user's device locale)
        # currently displays 24 hr format UTC time
        return obj.created_at.strftime("%m/%d/%Y, at %H:%M:%S")

class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('reviewer_name', 'safety_rating', 'responsiveness_rating',
            'transparency_rating', 'organization_rating', 'student_friendliness_rating',
            'overall_rating')