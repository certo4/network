
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("new-post", views.new_post, name="new-post"),
    path("profile", views.profile, name="profile"),

    # API Routes
    path("create-post", views.create_post, name="create-post"),
    path("posts/<int:post_id>", views.post, name="post"),
]
