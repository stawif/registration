from django.urls import path
from .views import AddMachine , MachineList , VehicleList , AddVehicle , AddRecorder , PartyList , AddParty , StoreItemList , AddStoreItem

urlpatterns = [
    path('machine-registration/',AddMachine.as_view()),
    path('list-of-machines/',MachineList.as_view()),
    path('list-of-vehicles/',VehicleList.as_view()),
    path('vehicle-registration/',AddVehicle.as_view()),
    path('recorder-registration/',AddRecorder.as_view()),
    path('list-of-party/',PartyList.as_view()),
    path('party-registration/',AddParty.as_view()),
    path('list-of-item/',StoreItemList.as_view()),
    path('store-registration/',AddStoreItem.as_view())
]