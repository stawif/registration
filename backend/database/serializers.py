from rest_framework import serializers
from .models import Machine , Owner , Vehicle , Store

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

