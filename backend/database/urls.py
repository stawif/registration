from django.urls import path
from .views import AddMachine , MachineList

urlpatterns = [
    path('machine-registration/',AddMachine.as_view()),
    path('list-of-machines/',MachineList.as_view()),
]