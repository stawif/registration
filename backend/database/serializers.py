from rest_framework import serializers
from .models import (Machine , Owner , Vehicle , Recorder , Party , Item , MachineParty,PurchaseParty,VehicleParty,
                    MachineWork,VehicleWork,VehicleWorkVehicles,MixDebit,Worker,Purchase,DailyWork)

class MachineSerializer(serializers.ModelSerializer):
    """
    Serializer for the Machine Model.
    """
    class Meta:
        model = Machine
        fields = ['owner','name']

class VehicleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Vehicle Model.
    """
    class Meta:
        model = Vehicle
        fields = ['owner','name']

class RecorderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Recorder Model.
    """
    class Meta:
        model = Recorder
        fields = ['owner','username','password']

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for the Store Model.
    """
    class Meta:
        model = Item
        fields = ['owner','name','measurement','quantity']

class WorkerSerializer(serializers.ModelSerializer):
    """
    Serializer for worker model
    """
    class Meta:
        model = Worker
        fields = ['owner','name','contact','village','salary']

class PartySerializer(serializers.ModelSerializer):
    """
    Serializer for the party Model.
    """
    class Meta:
        model = Party
        fields = ['owner','contact','village']

class MachinePartySerializer(serializers.ModelSerializer):
    """
    Serializer for the Machine Party Model.
    """
    class Meta:
        model = MachineParty
        fields = ['credit_id','name']

class VehiclePartySerializer(serializers.ModelSerializer):
    """
    Serializer for the Vehicle Party Model.
    """
    class Meta:
        model = VehicleParty
        fields = ['name']

class PurchasePartySerializer(serializers.ModelSerializer):
    """
    Serializer for the Vehicle Party Model.
    """
    class Meta:
        model = VehicleParty
        fields = ['name','contact','village']

class MachineWorkSerializer(serializers.ModelSerializer):
    """
    Serializer for the MachineWork Model.
    """
    class Meta:
        model = MachineWork
        fields = ['party','machine','drilling_feet','diesel_amount','remark']

class VehicleWorkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Vehice Work Model.
    """
    class Meta:
        model = VehicleWork
        fields = ['party','date','five_feet','two_half_feet','remark']

class VehicleWorkVehicleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Vehicle Work Vehicle Model.
    """
    class Meta:
        model = VehicleWorkVehicles
        fields = ['vehicle_work','vehicle']

class MixDebitSerializer(serializers.ModelSerializer):
    """
    Serializer for the Mix Debit Model.
    """
    class Meta:
        model = MixDebit
        fields = ['owner','date','spend_amount']

class PurchaseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Purchase Model.
    """
    class Meta:
        model = Purchase
        fields = ['party','item','debit_id','rate','net_amount','paid','remaining','remark']

"""
class DailyExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyExpense
        fields = ['owner','debit_id','expense','remark']

"""
class DailyWorkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Daily Work Model.
    """
    class Meta:
        model = Purchase
        fields = ['party','five_feet','five_feet_rate','two_half_feet','two_half_feet_rate','diesel_amount','net_amount']