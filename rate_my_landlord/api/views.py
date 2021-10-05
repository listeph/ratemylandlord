from django.shortcuts import render
from rest_framework import generics
from .models import Landlord
from .serializers import LandlordSerializer

class LandlordView(generics.ListAPIView):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer