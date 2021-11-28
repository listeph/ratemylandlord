import json
from numpy.lib.function_base import average
from rest_framework import serializers
from api.factory import LandlordFactory, ReviewFactory
from api.serializers import LandlordSerializer, ReviewSerializer 
from django.test import TestCase


class LandlordAPITest(TestCase):

    def normalize(self, response):
        """
        Return de-seralized a response object to Python
        """
        return json.loads(response.content.decode())


    def test_get_landlord_list_returns_json_200(self):
        """
        Assert created list of landloards returns and display
        correctly. 
        """
        
        # this implicitly tests serializers, and create landlord

        base_url = '/api/get-all-landlords'
        landlords = [] 
        for _ in range(3):
            landlords.append(LandlordFactory())
        raw_response = self.client.get(base_url)
        serialized_landlords = LandlordSerializer(landlords, many=True) # returns Ordered dict
        self.assertEqual(raw_response.status_code, 200)
        response = self.normalize(raw_response)
        self.assertCountEqual(response, 
                                json.loads(json.dumps(serialized_landlords.data))) # compare every item


    def test_create_landlord(self):
        """
        Assert a landlord is successfully created
        checks that input data is apart of the response
        """
        raw_response = self.client.post('/api/create-landlord', data={'first_name':'Mike', 'last_name':'Jones'})
        response = self.normalize(raw_response)
        self.assertDictEqual({'first_name':response['first_name'],
                            'last_name':response['last_name']}, {'first_name':'Mike', 'last_name':'Jones'})

    
    def test_get_landlord_by_id(self):
        """
        Assert a created landload is retrieve 
        """
        landlord = LandlordFactory()
        raw_response = self.client.get('/api/get-landlord-by-id?id={}'.format(landlord.id))
        response = self.normalize(raw_response)
        self.assertDictEqual({'first_name':response['first_name'],
                            'last_name':response['last_name']}, 
                            {'first_name':landlord.first_name, 
                            'last_name':landlord.last_name})

    def test_get_match_landlords(self):
        """
        Assert landlord search functionality returns
        correctly 'processed' names
        """
        #  the logic in this view may effect what would be reasonable
        # to return, since the number of character in first and last name
        # contribute to the ratio
        landlord_1 = LandlordFactory(first_name='Happy', last_name='Gilmore')
        landlord_2 = LandlordFactory(first_name='Dr',last_name='Suess')
        test_name = "Sloppy Gilmore"
        raw_response = self.client.get('/api/get-matching-landlords?searchkey={}'.format(test_name))
        response = self.normalize(raw_response)
        self.assertEqual(len(response), 1)
        self.assertNotEqual({'first_name':response[0]['first_name'],
                            'last_name':response[0]['last_name'] },
                            {'first_name':landlord_2.first_name,
                            'last_name':landlord_2.last_name }
                            )


    def test_get_all_reviews(self):
        """
        Assert all reviews created are retriveable
        """
        landlord = LandlordFactory()
        reviews = []
        for _ in range(5):
            reviews.append(ReviewFactory()) 
        raw_response = self.client.get('/api/get-all-reviews')
        
        response = self.normalize(raw_response)
        serialized_reviews = ReviewSerializer(reviews, many=True)
        # self.assertEqual(len(response), len(reviews)) # simple assertion
        self.assertCountEqual(response, json.loads(json.dumps(serialized_reviews.data))) 

    def test_get_reviews_for_landlord(self):
        """
        Assert reviews are retrieved for correct landlord
        """
        landlord_1 = LandlordFactory(first_name='Happy', last_name='Gilmore')
        landlord_2 = LandlordFactory(first_name='Dr',last_name='Suess')
        reviews = []
        for _ in range(5):
            reviews.append(ReviewFactory(landlord=landlord_2))
        url = '/api/get-reviews-for-landlord?landlordID={}'.format(landlord_2.id)
        raw_response = self.client.get(url)
        response = self.normalize(raw_response)
        self.assertTrue(any(map(lambda x: x['landlord'] != landlord_1.id, response)))
        #lets just make sure it isnt any other landlord
        self.assertTrue(any(map(lambda x: x['landlord'] == landlord_2.id, response)))

    def test_create_review_for_landlord(self):
        """
        Assert a review can be created for a landlord
        """ 
        landlord = LandlordFactory()
        url = '/api/create-review?landlordID={}'.format(landlord.id)
        post_data = {
            'reviewer_name':"Richard",
            'safety_rating':5,
            'responsiveness_rating':5,
            'transparency_rating':5,
            'organization_rating':5,
            'student_friendliness_rating':5,
            'overall_rating':"8.0" # JSON returns str
        }
        raw_response = self.client.post(url, data=post_data)
        response = self.normalize(raw_response)
        self.assertNotIn(raw_response.status_code, [400, 404])
        for k in post_data:            
            self.assertEqual(response[k], post_data[k])

    def test_filter_landlords_by_rating(self):
        """
        Assert landlords are correctly displayed by filter
        filter is a gte value
        """
        averages = [50, 75, 80, 90, 10]
        landlords = []
        for i in range(5):
            landlords.append(LandlordFactory(average_overall_rating=averages[i]))
    
        landlords.sort(key=lambda x : x.average_overall_rating)
        filter_query = 80
        url = '/api/filter-landlords-by-rating?filterValue={}'.format(filter_query)
        raw_response = self.client.get(url)
        response = self.normalize(raw_response)
        self.assertNotIn(raw_response.status_code, [400, 404])
        self.assertEqual(len(response), len(list(filter(lambda x: x >=filter_query, averages))))
        below_averages = filter(lambda x: x < filter_query, averages)
        response_averages = map(lambda x: x['average_overall_rating'], response)
        self.assertTrue(any(map( lambda num: num not in below_averages, response_averages)))
