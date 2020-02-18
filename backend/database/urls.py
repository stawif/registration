from django.urls import path
from .views import AddMachine , MachineList , VehicleList , AddVehicle 

urlpatterns = [
    path('machine-registration/',AddMachine.as_view()),
    path('list-of-machines/',MachineList.as_view()),
    path('list-of-vehicle/',VehicleList.as_view()),
    path('vehicle-registration/',AddVehicle.as_view()),
]