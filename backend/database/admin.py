from django.contrib import admin
from .models import Owner,Machine, Vehicle, Recorder, Party, Item
admin.site.register(Owner)
admin.site.register(Machine)
admin.site.register(Vehicle)
admin.site.register(Recorder)
admin.site.register(Item)
admin.site.register(Party)
