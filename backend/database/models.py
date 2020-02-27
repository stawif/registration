from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from datetime import datetime  

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

class Item(models.Model):
    """
    Item is for keeping records of things used by owner in works for party
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False)
    measurement = models.CharField(max_length=30, blank=False)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name    

@receiver(pre_save, sender=Item)
def check_item_availability(sender,instance,**kwarge):
    all_items = sender.objects.filter(owner=instance.owner)
    for item in all_items:
        if instance.name.lower() == item.name.lower():
            raise Exception('Name of item is already exist')

class Party(models.Model):
    """
    Party are the entity which gives work to owner
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    contact = models.IntegerField(blank=False)
    village = models.CharField(max_length=30,blank=False)
    date = models.DateField(blank=False)  #Add aunto now date
    total_credit = models.IntegerField(default=0)   

    def __str__(self):
        return str(self.pk)    


"""
Above models are complete
"""

class MixDebit(models.Model):
    """
    A class to generalize debit type
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now, blank=False)
    spend_amount = models.IntegerField(default=0)

    def __str__(self):
        return str(self.pk)


class PurchaseParty(models.Model):
    """
    Parties that gives work related to purchase
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit, on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.name


class Worker(models.Model):
    """
    Workers are also employees od owner who do work for owner
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)
    contact = models.IntegerField(blank=False)
    village = models.CharField(max_length=30,blank=False)
    salary = models.IntegerField(blank=False)
    exit_date = models.DateField(blank=True,null=True)

    def __str__(self):
        return self.name    

class MachineParty(models.Model):
    """
    Parties that gives work related to machine
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

    def __str__(self):  
        return self.name


class VehicleParty(models.Model):
    """
    Parties that gives work related to vehicle
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.name

    
class DailyParty(models.Model):
    """
    Parties that gives work for one day
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.name

class MachineWork(models.Model):
    """
    This is a type of work owner do for party in mining
    """
    party = models.ForeignKey(MachineParty, on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)    
    date = models.DateField()
    drilling_feet = models.IntegerField(blank=False)
    diesel_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    # def __str__(self):
    #     return self.party," ",str(self.date)    

    def __str__(self):
        template = '{0.party} {0.date}'
        return template.format(self)

class VehicleWork(models.Model):
    """
    This is a type of work owner do for a party 
    """
    party = models.ForeignKey(VehicleParty, on_delete=models.CASCADE)
    date = models.DateField()
    five_feet = models.IntegerField(blank=False)
    two_half_feet = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        template = '{0.party} {0.date}'
        return template.format(self)    

class VehicleWorkVehicles(models.Model):
    """
    All vehicles that are used in VehicleWork
    """
    vehicle_work = models.ForeignKey(VehicleWork, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

    def __str__(self):
        template = '{0.vehicle_work} {0.vehicle}'
        return template.format(self)    

class DailyWork(models.Model):
    """
    This is a type of  work owner do for a party
    """
    party = models.ForeignKey(DailyParty, on_delete=models.CASCADE)
    five_feet = models.FloatField(blank=False)
    five_feet_rate = models.FloatField(blank=False)
    two_half_feet = models.FloatField(blank=False)
    two_half_feet_rate = models.FloatField(blank=False)
    diesel_spend = models.FloatField(blank=False)
    net_amount = models.FloatField(blank=False)

    def __str__(self):
        return self.party.name    
     
class DailyWorkVehicles(models.Model):
    """
    All vehicles that are used in DailyWork
    """
    daily_work = models.ForeignKey(DailyWork, on_delete=models.CASCADE)
    Vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

    def __str__(self):
        return self.daily_work    

class Purchase(models.Model):
    """
    Purchase records of owner from any party
    """
    party = models.ForeignKey(PurchaseParty, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now, blank=False)    
    quantity = models.IntegerField(blank=False)
    rate = models.IntegerField(blank=False)
    net_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return str(self.party)    

class Supply(models.Model):
    """
    Records of items supplied to any work
    """    
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    date = models.DateField()
    quantity = models.IntegerField(blank=False)

    def __str__(self):
        return self.pk    

class Account(models.Model):
    """
    Account of owner about it's overall credit, debit and current balance
    """
    owner = models.OneToOneField(Owner, on_delete=models.CASCADE)
    total_credit = models.IntegerField(default=0)
    total_debit = models.IntegerField(default=0)
    balance = models.IntegerField(default=0)    

    def __str__(self):
        return self.owner    

class Credit(models.Model):
    """
    Credit history of owner account
    """
    work = models.ForeignKey(Party, on_delete=models.CASCADE)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    credit_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.work


class Debit(models.Model):
    """
    Debit history of owner account
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    debit_id = models.ForeignKey(MixDebit, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    debit_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.debit_id   


"""
class DailyExpense(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit,on_delete=models.CASCADE)
    expense = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return str(self.debit_id)

"""