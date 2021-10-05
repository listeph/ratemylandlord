from django.db import models

class Landlord(models.Model):
    '''A landlord listed on the site to review.'''
    first_name = models.CharField(max_length=30);
    last_name = models.CharField(max_length=30);
    overall_rating = models.DecimalField(blank=True, null=True, max_digits=3, decimal_places=1);

class Property(models.Model):
    '''A property associated with a landlord listed on the site.'''
    address = models.CharField(max_length=254);
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE);
