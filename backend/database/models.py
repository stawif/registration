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
    date = models.DateField(blank=False)
    total_credit = models.IntegerField()

    def __str__(self):
        return self.pk    


"""
Above models are complete
"""

class MixDebit(models.Model):
    """
    A class to generalize debit type
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    spend_amount = models.IntegerField(blank=False)

    def __str__(self):
        return self.pk    

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
    advance = models.IntegerField(blank=False)
    exit_date = models.DateField()

    def __str__(self):
        return self.name    

class DailyExpense(models.Model):
    """
    Owner has some daily expenses
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit,on_delete=models.CASCADE)
    expense = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.debit_id   

class MachineParty(models.Model):
    """
    Parties that gives work related to machine
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

class VehicleParty(models.Model):
    """
    Parties that gives work related to vehicle
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

class PurchaseParty(models.Model):
    """
    Parties that gives work related to purchase
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

class DailyParty(models.Model):
    """
    Parties that gives work for one day
    """
    credit_id = models.OneToOneField(Party,on_delete=models.CASCADE)
    name = models.CharField(max_length=30,blank=False)

class MachineWork(models.Model):
    """
    This is a type of work owner do for party in mining
    """
    party = models.ForeignKey(MachineParty, on_delete=models.CASCADE)
    machine = models.OneToOneField(Machine, on_delete=models.CASCADE)    
    date = models.DateField()
    drilling_feet = models.IntegerField(blank=False)
    diesel_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.date    

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
        return self.date    

class VeicleWorkVehicles(models.Model):
    """
    All vehicles that are used in VehicleWork
    """
    vehicle_work = models.ForeignKey(VehicleWork, on_delete=models.CASCADE)
    Vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

    def __str__(self):
        return self.vehicle_work    

class DailyWork(models.Model):
    """
    This is a type of  work owner do for a party
    """
    party = models.ForeignKey(DailyParty, on_delete=models.CASCADE)
    five_feet = models.IntegerField(blank=False)
    five_feet_rate = models.IntegerField(blank=False)
    two_half_feet = models.IntegerField(blank=False)
    two_half_feet_rate = models.IntegerField(blank=False)
    diesel_spend = models.IntegerField(blank=False)
    net_amount = models.IntegerField(blank=False)

    def __str__(self):
        return self.pk    
     
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
    debit_id = models.OneToOneField(MixDebit, on_delete=models.CASCADE)
    rate = models.IntegerField(blank=False)
    net_amount = models.IntegerField(blank=False)
    paid = models.IntegerField(blank=False)
    remaining = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.debit_id    

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

<<<<<<< HEAD

"""
Above models are complete
"""

class MixDebit(models.Model):
    """
    A class to generalize debit type
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    spend_amount = models.IntegerField(blank=False)

    def __str__(self):
        return self.pk    

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
    advance = models.IntegerField(blank=False)
    exit_date = models.DateField()

    def __str__(self):
        return self.name    

class DailyExpense(models.Model):
    """
    Owner has some daily expenses
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit,on_delete=models.CASCADE)
    expense = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.debit_id   

class Work(models.Model):
    """
    Work is a generalised term for different types of work which are given by Parties
    """
    party = models.ForeignKey(Party,on_delete=models.CASCADE)
    paid_amount = models.IntegerField(default=0)
    date = models.DateField(blank=False)
    remark = models.CharField(max_length=50,blank=True)

    def __str__(self):
        return self.pk    

class MachineWork(models.Model):
    """
    This is a type of work owner do for party in mining
    """
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    machine = models.OneToOneField(Machine, on_delete=models.CASCADE)    
    date = models.DateField()
    drilling_feet = models.IntegerField(blank=False)
    diesel_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.date    

class VehicleWork(models.Model):
    """
    This is a type of work owner do for a party 
    """
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    date = models.DateField()
    five_feet = models.IntegerField(blank=False)
    two_half_feet = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.date    

class VeicleWorkVehicles(models.Model):
    """
    All vehicles that are used in VehicleWork
    """
    vehicle_work = models.ForeignKey(VehicleWork, on_delete=models.CASCADE)
    Vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

    def __str__(self):
        return self.vehicle_work    

class DailyWork(models.Model):
    """
    This is a type of  work owner do for a party
    """
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    five_feet = models.IntegerField(blank=False)
    five_feet_rate = models.IntegerField(blank=False)
    two_half_feet = models.IntegerField(blank=False)
    two_half_feet_rate = models.IntegerField(blank=False)
    diesel_spend = models.IntegerField(blank=False)
    net_amount = models.IntegerField(blank=False)

    def __str__(self):
        return self.pk    
     
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
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    debit_id = models.OneToOneField(MixDebit, on_delete=models.CASCADE)
    rate = models.IntegerField(blank=False)
    net_amount = models.IntegerField(blank=False)
    paid = models.IntegerField(blank=False)
    remaining = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.debit_id    

class Supply(models.Model):
    """
    Records of items supplied to any work
    """    
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
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
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    credit_amount = models.IntegerField(blank=False)
    remark = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.work

=======
>>>>>>> 50834f44e4d7641df4fe0ea5a1c53bdbfca7b143
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
