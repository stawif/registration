from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save

class Owner(models.Model):
    """
    Owner is the actor for which this application is build    
    """
    name = models.CharField(max_length=30,blank=False,unique=True)
    username = models.CharField(max_length=30,blank=False,unique=True)
    password = models.CharField(max_length=30,blank=False)
    contact = models.IntegerField(blank=False)

    def __str__(self):
        return self.name    

class Machine(models.Model):
    """
    Machines are assets of owner which are used in Work
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)    
    name = models.CharField(max_length=30,blank=False,unique=True)
  
    def __str__(self):
        return self.name    

class Vehicle(models.Model):
    """
    Vehicles are assets of owner which are used in Work
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)    
    name = models.CharField(max_length=30,blank=False,unique=True)

    def __str__(self):
        return self.name    

class Recorder(models.Model):
    """
    Recorder is a employee of owner who has job of data entry in this application
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    username = models.CharField(max_length=30,blank=False,unique=True)
    password = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.username    

class Store(models.Model):
    """
    Store is for keeping records of things used by owner in works for party
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False)
    measurement = models.CharField(max_length=30, blank=False)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name    

@receiver(pre_save, sender=Store)
def check_item_availability(sender,instance,**kwarge):
    all_items = sender.objects.filter(owner=instance.owner)
    for item in all_items:
        if instance.name.lower() == item.name.lower():
            raise Exception('Name of item is already exist')


type_of_party = (
    ('Machine_work','Machine_work'),
    ('Vehicle_work','Vehicle_work'),
    ('Daily_work','Daily_work'),
    ('Purchase_party','Purchase_party'),
)

class Party(models.Model):
    """
    Party are the entity which gives work to owner
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)
    contact = models.IntegerField(blank=False)
    village = models.CharField(max_length=30,blank=False)
    party_type = models.CharField(max_length=20,blank=False, choices=type_of_party)

    def __str__(self):
        return self.name    

@receiver(pre_save, sender=Party)
def check_party_name_availability(sender,instance,**kwarge):
    all_parties = sender.objects.filter(party_type=instance.party_type)
    for party in all_parties:
        if party.name.lower() == instance.name.lower():
            raise Exception('Name of party is already exist in same Party type')

