import factory
from factory.django import DjangoModelFactory
from .models import Landlord, Review
import numpy as np
from django.utils import timezone

# Creates a randomized Landlord object, used by the setup_test_data command
class LandlordFactory(DjangoModelFactory):
    '''Create test landlord objects in the database for development / testing.'''
    class Meta:
        model = Landlord
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

# Creates a randomized Review object, used by the setup_test_data command
class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review
    class Params:
        # Array of length 5, representing 5 integer ratings with values from 0-10
        generated_ratings = factory.LazyFunction(lambda: np.random.randint(0,11,5))
    reviewer_name = factory.Faker('name')
    # retrieving timezone based on user's device locale
    created_at = factory.Faker('date_time', tzinfo=timezone.get_current_timezone())
    # selecting a random Landlord from the database to be this review's foreign key
    landlord = factory.LazyFunction(lambda: Landlord.objects.order_by('?').first())
    safety_rating = factory.LazyAttribute(lambda o: o.generated_ratings[0])
    responsiveness_rating = factory.LazyAttribute(lambda o: o.generated_ratings[1])
    transparency_rating = factory.LazyAttribute(lambda o: o.generated_ratings[2])
    organization_rating = factory.LazyAttribute(lambda o: o.generated_ratings[3])
    student_friendliness_rating = factory.LazyAttribute(lambda o: o.generated_ratings[4])
    overall_rating = factory.LazyAttribute(lambda o: round(sum(o.generated_ratings) / len(o.generated_ratings),1))