from django.db import models

class Owner(models.Model):
    """
    Owner is the actor for which this application is build    
    """
    name = models.CharField(max_length=30,blank=False)
    username = models.CharField(max_length=30,blank=False)
    password = models.CharField(max_length=30,blank=False)
    contact = models.IntegerField(blank=False)

    def __str__(self):
        return self.name    

class Machine(models.Model):
    """
    Machines are assets of owner which are used in Work
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)    
    name = models.CharField(max_length=30,blank=False)
  
    def __str__(self):
        return self.name    

class Vehicle(models.Model):
    """
    Vehicles are assets of owner which are used in Work
    """
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE)    
    name = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.name    

class Recorder(models.Model):
    """
    Recorder is a employee of owner who has job of data entry in this application
    """
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    username = models.CharField(max_length=30,blank=False)
    password = models.CharField(max_length=30,blank=False)

    def __str__(self):
        return self.username    

class Store(models.Model):
    """
    Store is for keeping records of things used by owner in works for party
    """
    owner = models.OneToOneField(Owner,on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False)
    measurement = models.CharField(max_length=30, blank=False)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name    

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
