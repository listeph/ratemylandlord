from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator; 

class Landlord(models.Model):
    '''A landlord listed on the site to review.'''
    first_name = models.CharField(max_length=30);
    last_name = models.CharField(max_length=30);
    overall_rating = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0), MaxValueValidator(10)]);

class Property(models.Model):
    '''A property associated with a landlord listed on the site.'''
    address = models.CharField(max_length=254);
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE);
