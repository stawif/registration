from django.urls import path
from .views import (AddMachine , MachineList , VehicleList , AddVehicle , AddRecorder , ItemList , AddItem,
                    MachinePartyList , PurchasePartyList,VehiclePartyList , AddMachineParty , AddPurchaseParty , 
                    AddVehicleParty,AddMachineWork,AddVehicleWork,AddWorker,AddPurchase, WorkerList,AddDailyWork,

                    AddMachineSupply,AddVehicleSupply, PartyContact, PartyThroughContact)

urlpatterns = [
    path('machine-registration/',AddMachine.as_view()),
    path('list-of-partycontacts/',PartyContact),
    path('list-of-machines/',MachineList.as_view()),
    path('list-of-vehicles/',VehicleList.as_view()),
    path('list-of-item/',ItemList.as_view()),
    path('list-of-worker/',WorkerList.as_view()),
    path('list-of-machineparty/',MachinePartyList.as_view()),
    path('list-of-vehicleparty/',VehiclePartyList.as_view()),
    path('list-of-purchaseparty/',PurchasePartyList.as_view()),
    path('party-through-contact/', PartyThroughContact.as_view()),
    path('vehicle-registration/',AddVehicle.as_view()),
    path('worker-registration/',AddWorker.as_view()),
    path('recorder-registration/',AddRecorder.as_view()),
    path('item-registration/',AddItem.as_view()),
    path('machine-party-registration/',AddMachineParty.as_view()),
    path('vehicle-party-registration/',AddVehicleParty.as_view()),
    path('purchase-party-registration/',AddPurchaseParty.as_view()),
    path('enter-machineparty-work/',AddMachineWork.as_view()),
    path('enter-vehicleparty-work/',AddVehicleWork.as_view()),
    path('enter-purchase-detail/',AddPurchase.as_view()),
    path('enter-daily-work/',AddDailyWork.as_view()),
    path('enter-machine-supply/',AddMachineSupply.as_view()),
    path('enter-vehicle-supply/',AddVehicleSupply.as_view()),
]