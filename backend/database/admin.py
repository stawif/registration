from django.contrib import admin
from .models import Owner,Machine, Vehicle, Recorder, Party, Item , MachineParty,VehicleParty,PurchaseParty,MachineWork
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
