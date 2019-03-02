from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Client(models.Model):
    username=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    phoneNumber=models.CharField(max_length=20)
    street=models.CharField(max_length=100)
    city=models.CharField(max_length=20)
    state=models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name=models.CharField(max_length=100,null=True)
    phoneNumber=models.CharField(max_length=20,null=True)
    street=models.CharField(max_length=100,null=True)
    city=models.CharField(max_length=20,null=True)
    state=models.CharField(max_length=20,null=True)
    is_receiver=models.BooleanField(default=True)
    created=models.DateTimeField(default=timezone.now)
    client=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.name




class Milk(models.Model):
    name=models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.type

class MilkReceive(models.Model):
    name=models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.type


class EntryClient(models.Model):
    created=models.DateTimeField(auto_now_add = True)
    milk=models.ForeignKey(MilkReceive,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount=models.FloatField(default=0)

class EntryCustomer(models.Model):
    created=models.DateTimeField(auto_now_add = True)
    milk=models.ForeignKey(Milk,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount=models.FloatField(default=0)
