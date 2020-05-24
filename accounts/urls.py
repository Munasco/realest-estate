from django.urls import path
from .views import Signupiew

urlpatterns = [
    path('signup', Signupiew.as_view()),
]