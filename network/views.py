from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.core.paginator import Paginator
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post
from .forms import NewPost


def index(request):

    # Get all posts
    posts = Post.objects.all()

    return render_with_pagination(request, posts)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# Function to render the new post form page
@login_required
def new_post(request):
    new_post_form = NewPost()
    return render(request, "network/new_post.html", {
        "new_post_form": new_post_form
    })


# Function that will create post in the DB
@login_required
def create_post(request):
    form = NewPost(request.POST)
    # Check whether form is valid:
    if form.is_valid():

        # Create new post
        post = Post(
            content=form.cleaned_data["content"],
            poster= request.user
        )
        post.save()

        # Redirect to home page
        return HttpResponseRedirect(reverse("index"))

    else:

        # Redirect to create a new post form
        return HttpResponseRedirect(reverse("new-post"))


# Function that when given a requests and a number of posts
# will create a paginator to display posts
def render_with_pagination(request, posts):
    
    # Get current page number from the URL parameter page
    page_number = request.GET.get('page', 1)
    
    # Create a paginator with posts object
    paginator = Paginator(posts, 2) # TODO: Change to 10 once done
    
    # Get the current page's posts
    page = paginator.page(page_number)

    return render(request, "network/index.html", {
        "page": page
    })

