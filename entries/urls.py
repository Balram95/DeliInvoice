from django.conf.urls import include, url
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'customers' , CustomerAPIViewSet , base_name = 'customerProfile')
router.register(r'users' , UserAPIViewSet , base_name = 'userProfile')
router.register(r'milk' , MilkAPIViewSet , base_name = 'milkProfile')
router.register(r'milkreceive' , MilkReceiveAPIViewSet , base_name = 'milkReceiveProfile')
router.register(r'entrycustomers' , EntryCustomerAPIViewSet , base_name = 'entriesCustomer')
router.register(r'entryclients' , EntryClientAPIViewSet , base_name = 'entriesClients')


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'getTotalAmount/$' , TotalAmount.as_view() ),
]
