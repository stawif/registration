from django.shortcuts import render
from .serializers import (MachineSerializer , VehicleSerializer , RecorderSerializer , ItemSerializer,
                            PartySerializer,PurchasePartySerializer,VehiclePartySerializer,MachinePartySerializer,
                            MachineWorkSerializer , VehicleWorkSerializer,VehicleWorkVehicleSerializer,WorkerSerializer)
from rest_framework.views import APIView
from .models import  (Machine , Owner , Vehicle , Recorder , Party , Item , 
                        MachineParty,PurchaseParty,VehicleParty,MachineWork,VehicleWork,VehicleWorkVehicles,
                        MixDebit,Worker,Purchase,MachineSupply,VehicleSupply)
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
            return Response("machine already exists")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = MachineSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("Machine added", status=status.HTTP_201_CREATED)
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class MachineList(APIView):
    """
    View to return List of Vehicles.
    """
    def get(self,request):
        queryset = Machine.objects.all()
        serializer = MachinePartySerializer(queryset,many=True)
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
            return Response("vehicle already exists")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = VehicleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("Vehicle added", status=status.HTTP_201_CREATED)
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
            return Response("username already exists")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = RecorderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("Recorder created", status=status.HTTP_201_CREATED)
            return Response("Either recorder exists or details are incorrect",status=status.HTTP_400_BAD_REQUEST)

class ItemList(APIView):
    """
    View to return List of Party.
    """
    def get(self,request):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset,many=True)
        return Response(serializer.data)

class WorkerList(APIView):
    """
    View to return List of party
    """
    def get(self,request):
        queryset = Worker.objects.all()
        serializer = WorkerSerializer(queryset,many=True)
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
            return Response("item already exists")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("Store item added", status=status.HTTP_201_CREATED)
            return Response("Either exists or incorrect details",status=status.HTTP_400_BAD_REQUEST)

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

        return Response("please provide correct details",status=status.HTTP_400_BAD_REQUEST)

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

        return Response("please provide correct data",status=status.HTTP_400_BAD_REQUEST)

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
            try:
                mix_debit_create = MixDebit.objects.create(owner=owner)
            except Exception:
                return Response("Error due to mix_debit_creation")
            name = request.data['name']
            contact = request.data['contact'] 
            village=request.data['village']
            try:
                party_instance = Party.objects.create(owner=owner,contact=contact,village=village)
                purchase_party_instance = PurchaseParty.objects.create(credit_id=party_instance,debit_id=mix_debit_create,name=name)
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
                    return Response("Machine work added")
            except Exception as e:
                return Response("Details are not correct")
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
                 return Response("Vehicle work added",status = status.HTTP_201_CREATED)
            else:
                return Response("Vehicle Added.....")

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
            api_quantity = request.data['quantity']
            api_rate = request.data['rate']
            net_amount = api_quantity*api_rate
            api_remark = request.data['remark']
            api_date = request.data['date']
            
            purchase_create = Purchase.objects.create(party=purchase_party,item=item_instance,rate=api_rate,
            date =api_date,quantity=api_quantity,net_amount=net_amount,remark=api_remark)
            
            new_quantity = item_instance.quantity+api_quantity
            Item.objects.filter(name=request.data['item']).update(quantity=new_quantity)          
            
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response('Please Provide All Required Data.',status=status.HTTP_204_NO_CONTENT)
        #return Response(status=status.HTTP_400_BAD_REQUEST)

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
                return Response("please provide correct data",status=status.HTTP_400_BAD_REQUEST)
            try:
                worker_create = Worker.objects.create(owner=owner,debit_id=mix_debit_create,name=request.data['name'],contact=int(request.data['contact']),
                village=request.data['village'],salary=float(request.data['salary']))
                return Response(status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                mix_debit_create.delete()
                return Response('please provide all required datad',status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

class AddMachineSupply(APIView):
    """
    View for supply entry for machine
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        if request.data:
            # get all data from api
            try:
                api_party = request.data['party']
                api_item = request.data['item']
                api_date = request.data['date']
                api_quantity = request.data['quantity']
            except Exception as e:
                print(e) 
                return Response("please provide all information correctly",status=status.HTTP_204_NO_CONTENT)   
            # get MachineParty instance from databse
            try:
                machine_party_i = MachineParty.objects.get(name=api_party)
            except Exception as e:
                print(e)
                return Response("please provide a valid party name",status=status.HTTP_204_NO_CONTENT)        
            # get Item instance from database
            try:
                item_i = Item.objects.get(name=api_item)
            except Exception as e:
                print(e)
                return Response("please provide a valid item name",status=status.HTTP_204_NO_CONTENT)        
            try:
                machine_supply_create = MachineSupply.objects.create(party=machine_party_i,
                item=item_i,date=api_date,quantity=api_quantity)

                item_new_quantity = item_i.quantity - api_quantity
                Item.objects.filter(pk=item_i.pk).update(quantity=item_new_quantity)          

                return Response("{} is supplied to {} at {}".format(api_item,api_party,api_date),status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                return Response("there is error while saving data in database",status=status.HTTP_204_NO_CONTENT)    

class AddVehicleSupply(APIView):
    """
    View for supply entry for vehicle
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        if request.data:
            # get all data from api
            try:
                api_party = request.data['party']
                api_item = request.data['item']
                api_date = request.data['date']
                api_quantity = request.data['quantity']
            except Exception as e:
                print(e) 
                return Response("please provide all information correctly",status=status.HTTP_204_NO_CONTENT)   
            # get MachineParty instance from databse
            try:
                vehicle_party_i = VehicleParty.objects.get(name=api_party)
            except Exception as e:
                print(e)
                return Response("please provide a valid party name",status=status.HTTP_204_NO_CONTENT)        
            # get Item instance from database
            try:
                item_i = Item.objects.get(name=api_item)
            except Exception as e:
                print(e)
                return Response("please provide a valid item name",status=status.HTTP_204_NO_CONTENT)        
            try:
                vehicle_supply_create = VehicleSupply.objects.create(party=vehicle_party_i,
                item=item_i,date=api_date,quantity=api_quantity)

                item_new_quantity = item_i.quantity - api_quantity
                Item.objects.filter(pk=item_i.pk).update(quantity=item_new_quantity)          

                return Response("{} is supplied to {} at {}".format(api_item,api_party,api_date),status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                return Response("there is error while saving data in database",status=status.HTTP_204_NO_CONTENT)                