from django.urls import path
from .views import AddMachine , MachineList , VehicleList , AddVehicle , AddRecorder , PartyList , AddParty , ItemList , AddItem

urlpatterns = [
    path('machine-registration/',AddMachine.as_view()),
    path('list-of-machines/',MachineList.as_view()),
    path('list-of-vehicles/',VehicleList.as_view()),
    path('vehicle-registration/',AddVehicle.as_view()),
    path('recorder-registration/',AddRecorder.as_view()),
    path('list-of-party/',PartyList.as_view()),
    path('party-registration/',AddParty.as_view()),
    path('list-of-item/',ItemList.as_view()),
    path('item-registration/',AddItem.as_view())
]