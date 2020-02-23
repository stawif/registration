from django.shortcuts import render
from .serializers import (MachineSerializer , VehicleSerializer , RecorderSerializer , ItemSerializer,
                            PartySerializer,PurchasePartySerializer,VehiclePartySerializer,MachinePartySerializer,
                            MachineWorkSerializer)
from rest_framework.views import APIView
from .models import  (Machine , Owner , Vehicle , Recorder , Party , Item , 
                        MachineParty,PurchaseParty,VehicleParty,MachineWork)
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

class ItemList(APIView):
    """
    View to return List of Party.
    """
    def get(self,request):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset,many=True)
        return Response(serializer.data)

class AddItem(APIView):
    """
    View to Add New Item in Store in Database.
    """
    def post(self,request):
        item_list = Item.objects.all().values('owner','name')
        owner = Owner.objects.get(id=1)
        
        item_dict = {'owner':owner.id,'name':request.data['name']}
        """
        Condition to check Whether a Item is already exists or not.
        """
        if item_dict in item_list:
            return Response("Item Already Exists.")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("StoreItem Added", status=status.HTTP_201_CREATED)
            return Response("Please provide Correct Details/Item already exists.",status=status.HTTP_400_BAD_REQUEST)

class MachinePartyList(APIView):
    """
    View to return List of Machine Party.
    """
    def get(self,request):
        queryset = MachineParty.objects.all()
        serializer = MachinePartySerializer(queryset,many=True)
        return Response(serializer.data)

class AddMachineParty(APIView):
    """
    View to Add New Machine party in Database.
    """
    def post(self,request):
        machine_party_list = MachineParty.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        dict1 = {"name":request.data['name']}
        if dict1 in machine_party_list:
            return Response('Party Already Exists in Machine Work.')
        else:
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                n = Party.objects.create(owner=owner,contact=contact,village=village)
                n2 = MachineParty.objects.create(credit_id=n,name=name)
                return Response("party added.")
            except Exception:
                n.delete()
                return Response("Party not Created.Network problem.")

        return Response("Please Provide Correct data.",status=status.HTTP_400_BAD_REQUEST)

class VehiclePartyList(APIView):
    """
    View to return List of Vehicle Party.
    """
    def get(self,request):
        queryset = VehicleParty.objects.all()
        serializer = VehiclePartySerializer(queryset,many=True)
        return Response(serializer.data)

class AddVehicleParty(APIView):
    """
    View to Add New Vehicle Party in Database.
    """
    def post(self,request):
        vehicle_party_list = VehicleParty.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        dict1 = {"name":request.data['name']}
        if dict1 in vehicle_party_list:
            return Response('Party Already Exists in Vehicle Work.')
        else:
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                n = Party.objects.create(owner=owner,contact=contact,village=village)
                n2 = VehicleParty.objects.create(credit_id=n,name=name)
                return Response("party added.")
            except Exception:
                n.delete()
                return Response("Party not Created.Network problem.")

        return Response("Please Provide Correct data.",status=status.HTTP_400_BAD_REQUEST)

class PurchasePartyList(APIView):
    """
    View to return List of Purchase Party.
    """
    def get(self,request):
        queryset = PurchaseParty.objects.all()
        serializer = PurchasePartySerializer(queryset,many=True)
        return Response(serializer.data)

class AddPurchaseParty(APIView):
    """
    View to Add New Purchase Party in Database.
    """
    def post(self,request):
        purchase_party_list = PurchaseParty.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        dict1 = {"name":request.data['name']}
        if dict1 in purchase_party_list:
            return Response('Party Already Exists in Purchase Work.')
        else:
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                n = Party.objects.create(owner=owner,contact=contact,village=village)
                n2 = PurchaseParty.objects.create(credit_id=n,name=name)
                return Response("party added.")
            except Exception:
                n.delete()
                return Response("Party not Created.Network problem.")
        
        return Response("Please Provide Correct data.",status=status.HTTP_400_BAD_REQUEST)

class AddMachineWork(APIView):
    """
    View to Add New Purchase Party in Database.
    """
    def post(self,request):
        machine_party_list = MachineParty.objects.all().values('name')
        machine_list = Machine.objects.all().values('name')
        machine_work_list = MachineWork.objects.all().values('party','machine')
        dict1 = {'name':request.data['party']}
        dict2 = {'name':request.data['machine']}
        party_id = MachineParty.objects.get(name=request.data['party'])
        machine_id = Machine.objects.get(name=request.data['machine'])
        dict3 = {"party":party_id.id,"machine":machine_id.id}
        print(dict3,machine_work_list)
        if dict1 not in machine_party_list:
            return Response('Machine Party Does not exists.')
        elif dict2 not in machine_list:
            return Response("Machine Does not  exists.")
        elif dict3 in machine_work_list:
            return Response("This Machine Work already exists for this party.")
        else:
            try:
                if request.data:
                    machine_work = MachineWork.objects.create(party=party_id,machine=machine_id,date=request.data['date'],
                    drilling_feet=float(request.data['drilling_feet']),diesel_amount=float(request.data['diesel_amount']),remark=request.data['remark'])
                    return Response("Machine Work Created ")
            except Exception as e:
                return Response("Data is not correct.")
            return Response("Working.......")
        

        return Response("Working",status=status.HTTP_400_BAD_REQUEST)