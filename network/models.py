from decimal import Decimal
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.db import models


class User(AbstractUser):
    # following = models.ManyToManyField("User", related_name="followers", blank=True)

    def __str__(self):
        return self.username

    # TODO: Add  helper function to get length of following


class Post(models.Model):
    poster = models.ForeignKey("User", on_delete=models.PROTECT, related_name="post")
    content = models.TextField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "poster": self.poster.username,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p")
        }

    # TODO: Cut the tweet if it is too long with [:30]
    def __str__(self):
        return f"{self.poster} posted {self.content} on {self.timestamp}"     
