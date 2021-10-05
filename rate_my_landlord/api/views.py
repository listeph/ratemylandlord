from django.shortcuts import render
from rest_framework import generics
from .models import Landlord
from .serializers import LandlordSerializer
from django.http import HttpResponse

def main(request):
     return HttpResponse("<h1>Hello</h1>")

class LandlordView(generics.ListAPIView):
    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer