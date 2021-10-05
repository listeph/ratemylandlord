from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator; 

# Create your models here.
class Landlord(models.Model):
    first_name = models.CharField(max_length=30);
    last_name = models.CharField(max_length=30);
    overall_rating = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)]);

class Property(models.Model):
    address = models.CharField(max_length=254);
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE);
