from rest_framework import serializers
from .models import Customer,Milk,EntryClient,MilkReceive,EntryCustomer
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username',)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=('id','name','phoneNumber','street','city','state','is_receiver','created','client')

        def create(self ,  validated_data):
            c = Customer(**validated_data)
            c.save()
            return c

class MilkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Milk
        fields=('id','name','price')

        def create(self ,  validated_data):
            c = Milk(**validated_data)
            c.save()
            return c
        # def update(self ,instance, validated_data):
        #
        # if 'articleOwner' in self.context['request'].data:
        #     instance.articleOwner = User.objects.get(pk=self.context['request'].data['articleOwner'])
        # if 'process' in self.context['request'].data:
        #     instance.process = CompanyProcess.objects.get(pk=self.context['request'].data['process'])
        # instance.save()
        # return instance

class MilkReceiveSerializer(serializers.ModelSerializer):
    class Meta:
        model=MilkReceive
        fields=('id','name','price')

        def create(self ,  validated_data):
            c = Milk(**validated_data)
            c.save()
            return c

class EntryCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=EntryCustomer
        fields=('id','created','milk','customer','amount')

        def create(self ,  validated_data):
            c = Entry(**validated_data)
            print(c)
            c.save()
            return c

class EntryClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=EntryClient
        fields=('id','created','milk','customer','amount')

        def create(self ,  validated_data):
            c = Entry(**validated_data)
            print(c)
            c.save()
            return c
