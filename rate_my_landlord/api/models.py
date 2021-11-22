from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# The schema for a Landlord object in the database, which currently only stores their name.
# TODO: Add contact information or properties information.
class Landlord(models.Model):
    '''A landlord listed on the site to review.'''
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

# The schema for a Review object in the database. Each review has a foreign key on a Landlord object.
# The minimum value for each integer rating category is 0, and the maximum value of each integer rating 
# is 10. Lastly, we also store the reviewer's name and the time the review was created.
class Review(models.Model):
    '''A review associated with a landlord on the site.'''
    reviewer_name = models.CharField(max_length=60)
    created_at = models.DateTimeField()
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE)
    safety_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    responsiveness_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    transparency_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    organization_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    student_friendliness_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    overall_rating = models.DecimalField(max_digits=3, decimal_places=1)
