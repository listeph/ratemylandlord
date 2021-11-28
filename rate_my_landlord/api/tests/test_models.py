from django.test import TestCase
from api.models import Landlord, Review
from django.utils import timezone

class TestAverages(TestCase):
    def setUp(self):
        Landlord.objects.create(first_name="Steph", last_name="Li")
        Landlord.objects.create(first_name="Javier", last_name="Portorreal")
        Review.objects.create(reviewer_name="Randy Wang", created_at=timezone.now(), 
            landlord=Landlord.objects.get(first_name="Steph"), safety_rating=9,
            responsiveness_rating=9,transparency_rating=9,organization_rating=9,
            student_friendliness_rating=9,overall_rating=9)

    def test_no_ratings_average(self):
        """A Landlord's average_overall_rating field begins as null"""
        landlord = Landlord.objects.get(first_name="Javier")
        self.assertEqual(landlord.average_overall_rating, None)
    
    def test_one_rating_average(self):
        """A Landlord's average_overall_rating field is set correctly once they get a review"""
        landlord = Landlord.objects.get(first_name="Steph")
        self.assertEqual(landlord.average_overall_rating, 9.0)
