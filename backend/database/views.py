from django.shortcuts import render
from .serializers import MachineSerializer , VehicleSerializer , RecorderSerializer , PartySerializer
from rest_framework.views import APIView
from .models import Machine , Owner , Vehicle , Recorder , Party
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
# Create your views here.

class AddMachine(APIView):
    """
    View to Add New Machine in Database
    """
    def post(self,request):
        machine_name_list = Machine.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        """
        Condition to check Whether a machine is already exists or not.
        """
        if request.data in machine_name_list:
            return Response("Machine Already Exists.")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = MachineSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class MachineList(APIView):
    """
    View to return List of Machines
    """
    def get(self,request):
        queryset = Machine.objects.all()
        serializer = MachineSerializer(queryset,many=True)
        return Response(serializer.data)

class VehicleList(APIView):
    """
    View to return List of Vehicles.
    """
    def get(self,request):
        queryset = Vehicle.objects.all()
        serializer = VehicleSerializer(queryset,many=True)
        return Response(serializer.data)

class AddVehicle(APIView):
    """
    View to Add New Vehicle in Database
    """
    def post(self,request):
        vehicle_name_list = Vehicle.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        """
        Condition to check Whether a Vehicle is already exists or not.
        """
        if request.data in vehicle_name_list:
            return Response("Vehicle Already Exists.")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = VehicleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class AddRecorder(APIView):
    """
    View to Add New Recorder in Database
    """
    def post(self,request):
        recorder_name_list = Recorder.objects.all().values('username')
        owner = Owner.objects.get(id=1)
        """
        Condition to check Whether a Recorder is already exists or not.
        """
        if request.data['username'] in recorder_name_list:
            return Response("username Already Exists./n Please choose another username")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = RecorderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("Recorder Created", status=status.HTTP_201_CREATED)
            return Response("Please provide Correct Details/User already exists.",status=status.HTTP_400_BAD_REQUEST)

class PartyList(APIView):
    """
    View to return List of Vehicles.
    """
    def get(self,request):
        queryset = Party.objects.all()
        serializer = PartySerializer(queryset,many=True)
        return Response(serializer.data)


