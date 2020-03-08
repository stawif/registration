from django.contrib import admin
from .models import (Owner,Machine, Vehicle, Recorder, Material , MachineParty,VehicleParty,
                    PurchaseParty,MachineWork , VehicleWork,Worker,Purchase,MixDebit,DailyWork,
                    MachineSupply, VehicleSupply,MixCredit)

admin.site.register(Owner)
admin.site.register(Machine)
admin.site.register(Vehicle)
admin.site.register(Recorder)
admin.site.register(Material)
# admin.site.register(Party)
admin.site.register(MachineParty)
admin.site.register(VehicleParty)
admin.site.register(PurchaseParty)
admin.site.register(MachineWork)
admin.site.register(VehicleWork)
admin.site.register(Worker)
admin.site.register(Purchase)
admin.site.register(MixDebit)
admin.site.register(DailyWork)
admin.site.register(MachineSupply)
admin.site.register(VehicleSupply)
admin.site.register(MixCredit)
