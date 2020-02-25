from django.shortcuts import render
from .serializers import (MachineSerializer , VehicleSerializer , RecorderSerializer , ItemSerializer,
                            PartySerializer,PurchasePartySerializer,VehiclePartySerializer,MachinePartySerializer,
                            MachineWorkSerializer , VehicleWorkSerializer,VehicleWorkVehicleSerializer,WorkerSerializer)
from rest_framework.views import APIView
from .models import  (Machine , Owner , Vehicle , Recorder , Party , Item , 
                        MachineParty,PurchaseParty,VehicleParty,MachineWork,VehicleWork,VehicleWorkVehicles,
                        MixDebit,Worker,Purchase,DailyExpense)
from rest_framework.response import Response
from django.http import Http404 ,JsonResponse
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
        machine_party_list = MachineParty.objects.all().values('name')  #Return Dictionary with name of machines
        owner = Owner.objects.get(id=1)
        machine_name_dict = {"name":request.data['name']}
        if machine_name_dict in machine_party_list:
            return Response('Party Already Exists in Machine Work.')
        else:
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                party_instance = Party.objects.create(owner=owner,contact=contact,village=village)
            except Exception:
                return Response("Data is not sufficient",status=status.HTTP_404_NOT_FOUND)
            try:
                machine_party_instance = MachineParty.objects.create(credit_id=party_instance,name=name)
                return Response("party added.",status=status.HTTP_201_CREATED)
            except Exception:
                party_instance.delete()
                return Response("Party not Created.Network problem.",status=status.HTTP_408_REQUEST_TIMEOUT)

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
        vehicle_party = {"name":request.data['name']}
        if vehicle_party in vehicle_party_list:
            return Response('Party Already Exists in Vehicle Work.')
        else:
            try:
                name = request.data['name']
                contact = request.data['contact'] 
                village=request.data['village']
                try:
                    party_instance = Party.objects.create(owner=owner,contact=contact,village=village)
                except Exception:
                    return Response("Data is not correct",status=status.HTTP_400_BAD_REQUEST)
                try:
                    vehicle_party_instance = VehicleParty.objects.create(credit_id=party_instance,name=name)
                    return Response("party added.")
                except Exception:
                    party_instance.delete()
                    return Response("Party not Created.Network problem.")
            except Exception:
                return Response("Data is not correct",status=status.HTTP_400_BAD_REQUEST)

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
        party_name = {"name":request.data['name']}
        if party_name in purchase_party_list:
            return Response('Party Already Exists in Purchase Work.')
        else:
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                party_instance = Party.objects.create(owner=owner,contact=contact,village=village)
                purchase_party_instance = PurchaseParty.objects.create(credit_id=party_instance,name=name)
                return Response("Party added.")
            except Exception:
                party_instance.delete()
                return Response("Party not Created.Network problem.")
        return Response("Please Provide Correct data.",status=status.HTTP_400_BAD_REQUEST)

class AddMachineWork(APIView):
    """
    View to Add New MAchine Work in Database.
    """
    def post(self,request):
        machine_party_list = MachineParty.objects.all().values('name')
        machine_list = Machine.objects.all().values('name')
        party_name = {'name':request.data['party']}
        machine_name = {'name':request.data['machine']}
        try:
            party_id = MachineParty.objects.get(name=request.data['party'])
            machine_id = Machine.objects.get(name=request.data['machine'])
        except Exception as e:
            return Response("Party or MAchine does not Exists in Machine or Machine Party List.")
        if party_name not in machine_party_list:
            return Response('Machine Party Does not exists.')
        elif machine_name not in machine_list:
            return Response("Machine Does not  exists.")
        else:
            try:
                if request.data:
                    machine_work = MachineWork.objects.create(party=party_id,machine=machine_id,date=request.data['date'],
                    drilling_feet=float(request.data['drilling_feet']),diesel_amount=float(request.data['diesel_amount']),remark=request.data['remark'])
                    return Response("Machine Work Created ")
            except Exception as e:
                return Response("Data is not correct.")
        return Response(status=status.HTTP_400_BAD_REQUEST)

class AddVehicleWork(APIView):
    """
    View to Add New Vehicle Work in Database.
    """
    def post(self,request):
        vehicle_party_list = VehicleParty.objects.all().values('name')
        vehicle_list = Vehicle.objects.all().values('name')
        party_name = {'name':request.data['party']}
        vehicles_name_list = {'name':request.data['vehicle']}
        number_of_vehicle = len(vehicles_name_list['name'])
        for i in range(number_of_vehicle):
            name_of_vehicle = {"name":vehicles_name_list['name'][i]}
            if name_of_vehicle not in vehicle_list:
                return Response("Vehicle Does not exists.")
        if party_name not in vehicle_party_list:
            return Response('Vehicle Party Does not exists.')
        else:
            party_id = VehicleParty.objects.get(name=request.data['party'])
            if request.data:
                 vehicle_work = VehicleWork.objects.create(party=party_id,date=request.data['date'],
                 five_feet=float(request.data['five_feet']),two_half_feet=float(request.data['two_half_feet']),remark=request.data['remark'])
                 for i in range(number_of_vehicle):
                     vehicle_id = Vehicle.objects.get(name=vehicles_name_list['name'][i])
                     vehicle = VehicleWorkVehicles.objects.create(vehicle=vehicle_id,vehicle_work=vehicle_work)
                 return Response("Vehicle Work Added",status = status.HTTP_201_CREATED)
            else:
                return Response("Vehicle Added.....")

        return Response(status=status.HTTP_400_BAD_REQUEST)

class AddWorker(APIView):
    """
    View to Add New Worker in Database.
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        if request.data:
            try:
                mix_debit_create = MixDebit.objects.create(owner=owner,date=request.data['date'],spend_amount=request.data['advance'])
            except Exception:
                return Response("Please provide correct data",status=status.HTTP_400_BAD_REQUEST)
            try:
                worker_create = Worker.objects.create(owner=owner,debit_id=mix_debit_create,name=request.data['name'],contact=int(request.data['contact']),
                village=request.data['village'],salary=float(request.data['salary']),advance=float(request.data['advance']),exit_date=request.data['exit_date'])
                return Response(status=status.HTTP_201_CREATED)
            except Exception:
                mix_debit_create.delete()
                return Response('Please Provide All Required Data.',status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

class AddDailyExpense(APIView):
    """
    View to Add Daily Expenses in Database.
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        if request.data:
            try:
                mix_debit_create = MixDebit.objects.create(owner=owner,date=request.data['date'],spend_amount=float(request.data['expense']))
            except Exception:
                return Response("Please provide correct data",status=status.HTTP_400_BAD_REQUEST)
            try:
                daily_expense_create = DailyExpense.objects.create(owner=owner,debit_id=mix_debit_create,expense=float(request.data['expense']),
                remark=request.data['remark'])
                return Response(status=status.HTTP_201_CREATED)
            except Exception:
                mix_debit_create.delete()
                return Response('Please Provide All Required Data.',status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class AddPurchase(APIView):
    """
    View to Add Purchase in Database.
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        try:
            purchase_party = PurchaseParty.objects.get(name=request.data['party'])
        except Exception:
            return Response("Purchase Party Does not Exists.")
        try:
            item_instance = Item.objects.get(name=request.data['item'])
        except Exception:
            return Response("Item Does not Exists.Please Add item.")
        try:
            mix_debit_create = MixDebit.objects.create(owner=owner,date=request.data['date'],spend_amount=request.data['paid'])
        except Exception:
            return Response("Please provide correct data",status=status.HTTP_400_BAD_REQUEST)
        try:
            purchase_create = Purchase.objects.create(party=purchase_party,item=item_instance,debit_id=mix_debit_create,rate=float(request.data['rate']),
            net_amount=float(request.data['net_amount']),paid=float(request.data['paid']),remaining=float(request.data['remaining']),remark=request.data['remark'])
            return Response(status=status.HTTP_201_CREATED)
        except Exception:
                mix_debit_create.delete()
                return Response('Please Provide All Required Data.',status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)






























        return Response(status=status.HTTP_400_BAD_REQUEST)








