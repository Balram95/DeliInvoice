from django.shortcuts import render
from django.views.generic import ListView,DetailView,CreateView,UpdateView
from .models import Post

# Create your views here.
class PostListView(ListView):
    model=Post
    template_name='blogs/posts.html'
    context_object_name='posts'

class PostDetailView(DetailView):
    model=Post

class PostCreateView(CreateView):
    model=Post
    fields=['title','content']

    def form_valid(self,form):
        form.instance.author=self.request.user
        return super().form_valid(form)

class PostUpdateView(UpdateView):
    model=Post
    template_name='blogs/posts.html'
    context_object_name='posts'
