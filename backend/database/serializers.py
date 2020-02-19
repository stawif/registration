from rest_framework import serializers
from .models import Machine , Owner , Vehicle , Recorder , Party , Store

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

class PartySerializer(serializers.ModelSerializer):
    """
    Serializer for the Party Model.
    """
    class Meta:
        model = Party
        fields = ['owner','name','contact','village','party_type']

class StoreSerializer(serializers.ModelSerializer):
    """
    Serializer for the Store Model.
    """
    class Meta:
        model = Store
        fields = ['owner','name','measurement','quantity']