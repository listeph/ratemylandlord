from django.db import transaction
from django.core.management.base import BaseCommand
from api.models import Landlord, Review

class Command(BaseCommand):
    help = "Empties existing data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting data...")
        models = [Landlord, Review]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Done!")