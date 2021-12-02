from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.signals import post_save
from decimal import Decimal

# The schema for a Landlord object in the database, which currently stores their name, averaged
# overall rating (from reviews), and total review count. The average_overall_rating field may be null
# if the Landlord has not yet had any reviews. The review_count field is initialized to 0 by default.
class Landlord(models.Model):
    '''A landlord listed on the site to review.'''
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    average_overall_rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    review_count = models.IntegerField(default=0)

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

# When a new review is created for a Landlord (foreign key), recalculate that Landlord's average rating
# and increment their review count
def update_landlord_rating(sender, **kwargs):
    instance = kwargs['instance']
    created = kwargs['created']
    raw = kwargs['raw']
    if created and not raw:
        landlord = instance.landlord
        if landlord.average_overall_rating == None:
            # edge case -- this is the landlord's first review
            landlord.average_overall_rating = instance.overall_rating
        else:
            # otherwise do math to calculate the new average
            new_rating_sum = Decimal(landlord.average_overall_rating * landlord.review_count) + Decimal(instance.overall_rating)
            landlord.average_overall_rating = new_rating_sum / (landlord.review_count + 1)
        landlord.review_count = landlord.review_count + 1
        landlord.save()
post_save.connect(update_landlord_rating, sender=Review)