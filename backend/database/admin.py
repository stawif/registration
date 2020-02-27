from django.contrib import admin
from .models import (Owner,Machine, Vehicle, Recorder, Party, Item , MachineParty,VehicleParty,
<<<<<<< HEAD
                    PurchaseParty,MachineWork , VehicleWork,VehicleWorkVehicles,Worker,Purchase,MixDebit,DailyWork,DailyParty)
=======
                    PurchaseParty,MachineWork , VehicleWork,VehicleWorkVehicles,Worker,Purchase,MixDebit,
                    MachineSupply, VehicleSupply)

>>>>>>> 1a8c8c2695da678bfa5f785d2883ade167f6e99c
admin.site.register(Owner)
admin.site.register(Machine)
admin.site.register(Vehicle)
admin.site.register(Recorder)
admin.site.register(Item)
admin.site.register(Party)
admin.site.register(MachineParty)
admin.site.register(VehicleParty)
admin.site.register(PurchaseParty)
admin.site.register(MachineWork)
admin.site.register(VehicleWork)
admin.site.register(VehicleWorkVehicles)
admin.site.register(Worker)
admin.site.register(Purchase)
admin.site.register(MixDebit)
<<<<<<< HEAD
admin.site.register(DailyWork)
admin.site.register(DailyParty)
=======
admin.site.register(MachineSupply)
admin.site.register(VehicleSupply)
>>>>>>> 1a8c8c2695da678bfa5f785d2883ade167f6e99c
