import factory
from factory.django import DjangoModelFactory
from .models import Landlord
from random import uniform

class LandlordFactory(DjangoModelFactory):
    '''Create test landlord objects in the database for development / testing.'''
    class Meta:
        model = Landlord
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    overall_rating = factory.LazyFunction(lambda: round(uniform(0, 10),1));