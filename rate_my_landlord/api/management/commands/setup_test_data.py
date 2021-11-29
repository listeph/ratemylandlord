from django.db import transaction
from django.core.management.base import BaseCommand

from api.models import Landlord, Review
from api.factory import (
    LandlordFactory,
    ReviewFactory
)

NUM_LANDLORDS = 50
NUM_REVIEWS = 150

class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [Landlord, Review]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        for _ in range(NUM_LANDLORDS):
            landlord = LandlordFactory()
            ReviewFactory(landlord=landlord)