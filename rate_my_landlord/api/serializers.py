from rest_framework import serializers
from .models import Landlord, Review

# Serializer for Landlord model used in views.py for returning POST and GET 
# request responses for Landlord data
class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ('id', 'first_name', 'last_name')

# Serializer for Landlord model used in views.py for the add landlord POST request handler
class CreateLandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = ('first_name', 'last_name')

# Serializer for Review model used in views.py for returning POST and GET 
# request responses for Review data
class ReviewSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ('id', 'reviewer_name', 'created_at', 'landlord', 'safety_rating', 
            'responsiveness_rating', 'transparency_rating', 'organization_rating',
            'student_friendliness_rating', 'overall_rating')
    def get_created_at(self, obj):
        # Convert the date_time object stored in created_at to formatted 12 hr time string
        return obj.created_at.strftime("%m/%d/%Y, at %I:%M %p")

# Serializer for Review model used in views.py for the add review POST request handler
class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('reviewer_name', 'safety_rating', 'responsiveness_rating',
            'transparency_rating', 'organization_rating', 'student_friendliness_rating',
            'overall_rating')