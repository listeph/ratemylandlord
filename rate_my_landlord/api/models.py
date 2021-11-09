from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Landlord(models.Model):
    '''A landlord listed on the site to review.'''
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Review(models.Model):
    '''A review associated with a landlord on the site.'''
    reviewer_name = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE)
    safety_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    responsiveness_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    transparency_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    organization_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    student_friendliness_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    overall_rating = models.DecimalField(max_digits=3, decimal_places=1)
