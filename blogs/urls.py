from django.urls import path
from .views import PostListView,PostDetailView,PostCreateView

urlpatterns = [
    path('', PostListView.as_view(),name="blogs-home"),
    path('new/', PostCreateView.as_view(),name="blogs-create"),
    path('<int:pk>', PostDetailView.as_view(),name="blogs-detail"),
]
