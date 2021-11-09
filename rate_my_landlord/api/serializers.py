from rest_framework import serializers
from .models import Landlord, Review

class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ('id', 'first_name', 'last_name')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'reviewer_name', 'created_at', 'landlord', 
            'safety_rating', 'responsiveness_rating', 'transparency_rating', 'organization_rating',
            'student_friendliness_rating', 'overall_rating')