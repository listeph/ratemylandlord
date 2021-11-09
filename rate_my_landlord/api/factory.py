import factory
from factory.django import DjangoModelFactory
from .models import Landlord, Review
from random import uniform, randrange

class LandlordFactory(DjangoModelFactory):
    '''Create test landlord objects in the database for development / testing.'''
    class Meta:
        model = Landlord
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review
    reviewer_name = factory.Faker('name')
    created_at = factory.Faker('date_time')
    landlord = factory.Iterator(Landlord.objects.all())
    safety_rating = factory.LazyFunction(lambda: randrange(0,11))
    responsiveness_rating = factory.LazyFunction(lambda: randrange(0,11))
    transparency_rating = factory.LazyFunction(lambda: randrange(0,11))
    organization_rating = factory.LazyFunction(lambda: randrange(0,11))
    student_friendliness_rating = factory.LazyFunction(lambda: randrange(0,11))
    overall_rating = factory.LazyFunction(lambda: round(uniform(0, 10),1))