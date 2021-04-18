from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    def __str__(self):
        return self.username

    pass

class Post(models.Model):
    poster = models.ForeignKey("User", on_delete=models.PROTECT, related_name="created_post")
    content = models.TextField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "poster": self.poster.username,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p")
        }

    def __str__(self):
        return f"{self.poster} posted {self.content} on {self.timestamp}"