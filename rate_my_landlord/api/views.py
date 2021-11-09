from django.shortcuts import render
from rest_framework import status
from .models import Landlord
from .serializers import LandlordSerializer, CreateLandlordSerializer
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from fuzzywuzzy import fuzz


def main(request):
     return HttpResponse("<h1>Hello</h1>")

# APIView has default get and post methods that we can override
class CreateLandlordView(APIView):
     serializer_class = CreateLandlordSerializer
     # Handles a post request from frontend
     def post(self, request, format=None):
          serializer = self.serializer_class(data=request.data)
          if serializer.is_valid():
               landlord_first_name = serializer.data.get('first_name')
               landlord_last_name = serializer.data.get('last_name')
          # TODO: handle duplicate values --> what will we use to uniquely identify a landlord?
          new_landlord = Landlord(first_name=landlord_first_name, last_name=landlord_last_name)
          new_landlord.save()
          return Response(LandlordSerializer(new_landlord).data, status=status.HTTP_201_CREATED)

# APIView has default get and post methods that we can override
class GetLandlordById(APIView):
     serializer_class = LandlordSerializer
     lookup_url_kwarg = 'id'
     # Handles a get request from frontend
     def get(self, request, format=None):
          id = request.GET.get(self.lookup_url_kwarg)
          if id != None:
               landlord = Landlord.objects.filter(id=id)
               if len(landlord) > 0:
                    data = LandlordSerializer(landlord[0]).data
                    return Response(data, status=status.HTTP_200_OK)
               return Response({'Landlord Not Found': 'Invalid ID'}, status=status.HTTP_404_NOT_FOUND)
          return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class GetAllLandlords(APIView):
     serializer_class = LandlordSerializer
     def get(self, request, format=None):
          queryset = Landlord.objects.all().order_by('first_name','last_name')
          data = LandlordSerializer(queryset, many=True).data
          return Response(data, status=status.HTTP_200_OK)

class GetMatchingLandlords(APIView):
     serializer_class = LandlordSerializer
     lookup_url_kwarg = 'searchkey'
     def get(self, request, format=None):
          searchKey = request.GET.get(self.lookup_url_kwarg)
          queryset = filter(
               lambda landlord: fuzz.partial_ratio(
                         landlord.first_name.lower() + " " + landlord.last_name.lower(),
                         searchKey.lower()
                    ) > 80,
               Landlord.objects.all().order_by('first_name','last_name')
          )
          data = LandlordSerializer(queryset, many=True).data
          return Response(data, status=status.HTTP_200_OK)