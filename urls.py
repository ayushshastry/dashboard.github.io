from django.urls import path
from . import views

urlpatterns = [
    path("candle/", views.candle),
    path("bar/", views.bar),
    path("pie/", views.pie),
    path("line/", views.line),
]
