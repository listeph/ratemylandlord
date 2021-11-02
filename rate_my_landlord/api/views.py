from django.shortcuts import render
from rest_framework import generics, status
from .models import Landlord
from .serializers import LandlordSerializer, CreateLandlordSerializer
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response


def main(request):
     return HttpResponse("<h1>Hello</h1>")

class LandlordView(generics.ListAPIView):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer

# APIView has default get and post methods that we can override
class CreateLandlordView(APIView):
     serializer_class = CreateLandlordSerializer
     # Handles a post request from frontend
     def post(self, request, format=None):
          serializer = self.serializer_class(data= request.data)
          if serializer.is_valid():
               landlord_first_name = serializer.data.get('first_name')
               landlord_last_name = serializer.data.get('last_name')
          # TODO: handle duplicate values --> what will we use to uniquely identify a landlord?
          new_landlord = Landlord(first_name=landlord_first_name, last_name=landlord_last_name)
          new_landlord.save()
          return Response(LandlordSerializer(new_landlord).data, status=status.HTTP_201_CREATED)