from django.shortcuts import render
from rest_framework import viewsets , permissions , serializers
from django.utils import timezone
from django.contrib.auth.models import User , Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import *
from rest_framework import status
from .models import Customer,Milk,EntryClient,MilkReceive,EntryCustomer
from django_filters.rest_framework import DjangoFilterBackend
import datetime


class UserAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('username')
    def get_queryset(self):
        return User.objects.all()

class CustomerAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = CustomerSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('created', 'client')
    def get_queryset(self):
        u=self.request.user
        if u.is_superuser:
            return Customer.objects.all()
        else:
            return Customer.objects.filter(client=u)

class MilkAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = MilkSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'price')
    def get_queryset(self):
        milk=Milk.objects.all()
        if 'id' in self.request.GET:
            return milk.filter(id=self.request.GET['id'])
        return milk

class MilkReceiveAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = MilkReceiveSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'price')
    def get_queryset(self):
        milkReceive=MilkReceive.objects.all()
        if 'id' in self.request.GET:
            return milkReceive.filter(id=self.request.GET['id'])
        return milkReceive

class EntryCustomerAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = EntryCustomerSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('created','amount')
    def get_queryset(self):
        entries=EntryCustomer.objects.all()
        if 'customerId' in self.request.GET:
            entries= entries.filter(customer_id=self.request.GET['customerId'])
        if 'name' in self.request.GET:
            entries= entries.filter(customer_id=self.request.GET['customerId'])
        if 'date' in self.request.GET:
            # print(created , self.request.GET['date'])
            date = datetime.datetime.strptime(self.request.GET['date'], '%Y-%m-%d').date()
            entries= entries.filter(created__startswith=date)
        return entries

class EntryClientAPIViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = EntryClientSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('created','amount')
    def get_queryset(self):
        entries=EntryClient.objects.all()
        if 'clientId' in self.request.GET:
            entries= entries.filter(customer_id=self.request.GET['clientId'])
        if 'name' in self.request.GET:
            entries= entries.filter(customer_id=self.request.GET['clientId'])
        if 'date' in self.request.GET:
            # print(created , self.request.GET['date'])
            date = datetime.datetime.strptime(self.request.GET['date'], '%Y-%m-%d').date()
            entries= entries.filter(created__startswith=date)
        return entries


class TotalAmount(APIView):
    renderer_classes = (JSONRenderer,)
    # permission_classes=(permissions.AllowAny,)
    def get(self , request , format = None):
        today=timezone.now()
        totalAmount=0
        if 'customer' in request.GET:
            customer=request.GET['pk']
            entriesOfMonth = EntryCustomer.objects.filter(created__year=today.year, created__month=today.month ,customer_id=customer)
            for entry in entriesOfMonth:
                totalAmount =totalAmount + entry.milk.price*entry.amount
        if 'client' in request.GET:
            client=request.GET['pk']
            entriesOfMonth = EntryClient.objects.filter(created__year=today.year, created__month=today.month ,customer_id=client)
            for entry in entriesOfMonth:
                totalAmount =totalAmount + entry.milk.price*entry.amount
        return Response({'totalAmount':totalAmount}, status = status.HTTP_200_OK)
