from django.shortcuts import render
from .serializers import (MachineSerializer , VehicleSerializer , RecorderSerializer , ItemSerializer,
                            PartySerializer,PurchasePartySerializer,VehiclePartySerializer,MachinePartySerializer,
                            MachineWorkSerializer , VehicleWorkSerializer,VehicleWorkVehicleSerializer,WorkerSerializer,
                            DailyWorkSerializer,ItemListSerializer)
from rest_framework.views import APIView
from .models import  (Machine , Owner , Vehicle , Recorder , Party , Item , 
                        MachineParty,PurchaseParty,VehicleParty,MachineWork,VehicleWork,VehicleWorkVehicles,
                        MixDebit,Worker,Purchase,DailyWork,DailyParty,MachineSupply,VehicleSupply)
from rest_framework.response import Response
from django.http import Http404 ,JsonResponse,HttpResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

"""
api_ : represents that this data is comes from API
_i : represents that this is a instance of model
"""

def PartyContact(request):
    """
    Return json packet with all parties contacts
    """
    contacts= []
    party_i = Party.objects.all()
    for party in party_i:
        contacts.append(party.contact)
    jsonPacket = json.dumps(contacts)
    return JsonResponse(jsonPacket, safe=False)   

class PartyThroughContact(APIView):
    """
    Return name and village through contact
    """
    def post(self, request):
        api_contact = request.data['contact']
        party_i = Party.objects.get(contact=api_contact)
        derived_party_i= None 
        try:
            derived_party_i = MachineParty.objects.get(credit_id= party_i)
            print("In machine")
        except Exception:
            try:
                derived_party_i = VehicleParty.objects.get(credit_id= party_i)
                print("In vehicle")
            except Exception:
                try:
                    derived_party_i = DailyParty.objects.get(credit_id= party_i)        
                    print("In daily")
                except Exception as e:
                    print(e)
                    return HttpResponse("Can't find any party related to this contact") 
        packet = {
            "name": derived_party_i.name,
            "village": party_i.village
        }
        jsonPacket = json.dumps(packet)
        return JsonResponse(jsonPacket, safe= False)

    
class AddMachine(APIView):
    """
    View to Add New Machine in Database
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        machine_name_list = Machine.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
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
                return Response("{} Machine Added".format(api_name), status=status.HTTP_201_CREATED)
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class MachineList(APIView):
    """
    View to return List of Vehicles.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
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
    View to Add New Vehicle in Database.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        vehicle_name_list = Vehicle.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
        except Exception as e:
             return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
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
                return Response("{} Vehicle added".format(request.data['name']), status=status.HTTP_201_CREATED)
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class AddRecorder(APIView):
    """
    View to Add New Recorder in Database
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        recorder_name_list = Recorder.objects.all().values('username')
        owner = Owner.objects.get(id=1)
        try:
            api_username = request.data['username']
            api_password = request.data['password']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT) 
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
                return Response("{} Recorder created".format(api_username), status=status.HTTP_201_CREATED)
            return Response("Either recorder exists or details are incorrect",status=status.HTTP_400_BAD_REQUEST)

class ItemList(APIView):
    """
    View to return List of Party.
    """
    def get(self,request):
        queryset = Item.objects.all()
        serializer = ItemListSerializer(queryset,many=True)
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
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        item_list = Item.objects.all().values('owner','name')
        owner = Owner.objects.get(id=1)
        
        item_dict = {'owner':owner.id,'name':request.data['name']}
        try:
            api_name = request.data['name']
            api_measurement = request.data['measurement']
            api_quantity = request.data['quantity']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT) 
        """
        Condition to check Whether a Item is already exists or not.
        """
        if item_dict in item_list:
            return Response("item already exists")
        else:
            request.data["owner"]=owner.id                                      #Owner Id for Owner field in 
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid():
                print("Reacher here")
                serializer.save()
                return Response("{} Store item added".format(api_name), status=status.HTTP_201_CREATED)
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
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        machine_party_list = MachineParty.objects.all().values('name')  #Return Dictionary with name of machines
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
            api_contact = request.data['contact']
            api_village = request.data['village']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        try:
            api_contact_i  = Party.objects.get(contact=api_contact)
        except Exception as e:
            print(e)
        machine_name = {"name":api_name}
        if machine_name in machine_party_list:
            return Response('Party Already Exists in Machine Work ')
        else:
            try:
                if api_contact_i:
                    try:
                        machine_party_i = MachineParty.objects.create(credit_id=api_contact_i,name=api_name)
                        return Response("{} party added".format(api_name),status=status.HTTP_201_CREATED)
                    except Exception:
                        return Response("party is already exists in machine party with same name and contact ",status=status.HTTP_408_REQUEST_TIMEOUT)
            except :
                try:
                    party_i = Party.objects.create(owner=owner,contact=api_contact,village=api_village)
                except Exception:
                    return Response("Data is not sufficient",status=status.HTTP_404_NOT_FOUND)
                try:
                    machine_party_i = MachineParty.objects.create(credit_id=party_i,name=api_name)
                    return Response("{} party added".format(api_name),status=status.HTTP_201_CREATED)
                except Exception:
                    party_i.delete()
                    return Response("Party not Created , Network problem ",status=status.HTTP_408_REQUEST_TIMEOUT)

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
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        vehicle_party_list = VehicleParty.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
            api_contact = request.data['contact']
            api_village = request.data['village']
        except Exception as e:
            print(e)
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        try:
            api_contact_i  = Party.objects.get(contact=api_contact)
        except Exception as e:
            print(e)
        vehicle_party = {"name":api_name}
        if vehicle_party in vehicle_party_list:
            return Response('Party Already Exists in Vehicle Work')
        else:
            try:
                if api_contact_i:
                    try:
                        vehicle_party_i = VehicleParty.objects.create(credit_id=api_contact_i,name=api_name)
                        return Response("{} party added".format(api_name),status=status.HTTP_201_CREATED)
                    except Exception:
                        return Response("party is already exists in vehicle party with same name and contact",status=status.HTTP_408_REQUEST_TIMEOUT)
            except :
                try:
                    party_i = Party.objects.create(owner=owner,contact=api_contact,village=api_village)
                except Exception:
                    return Response("Data is not correct",status=status.HTTP_400_BAD_REQUEST)
                try:
                    vehicle_party_i = VehicleParty.objects.create(credit_id=party_i,name=api_name)
                    return Response("{} party added".format(api_name,status=status.HTTP_201_CREATED))
                except Exception:
                    party_i.delete()
                    return Response("Party not Created, Network problem")

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
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        purchase_party_list = PurchaseParty.objects.all().values('name')
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
            api_contact = request.data['contact']
            api_village = request.data['village']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        if api_name in purchase_party_list:
            return Response('Party Already Exists in Purchase Work.')
        else:
            try:
                mix_debit_create = MixDebit.objects.create(owner=owner)
            except Exception:
                return Response("Error due to mix_debit_creation")
            try:
                purchase_party_instance = PurchaseParty.objects.create(owner=owner,debit_id=mix_debit_create,name=api_name,contact=api_contact,village=api_village)
                return Response("{} party added".format(api_name),status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                mix_debit_create.delete()
                return Response("Party not Created due to Network problem.")
        return Response("Please Provide Correct data.",status=status.HTTP_400_BAD_REQUEST)

class AddMachineWork(APIView):
    """
    View to Add New MAchine Work in Database.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        try:
            api_party_name = request.data['party']
            api_machine_name = request.data['machine']
            api_date = request.data['date']
            api_drilling_feet = request.data['drilling_feet']
            api_diesel_amount = request.data['diesel_amount']
            api_remark = request.data['remark']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        try:
            party_id = MachineParty.objects.get(name=request.data['party'])
            machine_id = Machine.objects.get(name=request.data['machine'])
        except Exception as e:
            return Response("Party or MAchine does not Exists in Machine or Machine Party List.")
        if request.data:
            try:
                machine_work = MachineWork.objects.create(party=party_id,machine=machine_id,date=api_date,
                drilling_feet=float(api_drilling_feet),diesel_amount=float(api_diesel_amount),remark=api_remark)
                return Response("{} Machine work added".format(machine_id.name),status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response("Details are not correct")
        return Response(status=status.HTTP_400_BAD_REQUEST)

class AddVehicleWork(APIView):
    """
    View to Add New Vehicle Work in Database.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        vehicle_party_list = VehicleParty.objects.all().values('name')
        vehicle_list = Vehicle.objects.all().values('name')
        try:
            api_party_name = request.data['party']
            api_vehicle_names = request.data['vehicle']
            api_date = request.data['date']
            api_five_feet = request.data['five_feet']
            api_two_half_feet = request.data['two_half_feet']
            api_remark = request.data['remark']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        party_name = {'name':api_party_name}
        vehicles_name_list = {'name':api_vehicle_names}
        number_of_vehicle = len(vehicles_name_list['name'])
        for i in range(number_of_vehicle):
            name_of_vehicle = {"name":vehicles_name_list['name'][i]}
            if name_of_vehicle not in vehicle_list:
                return Response("Vehicle Does not exists.")
        if party_name not in vehicle_party_list:
            return Response('Vehicle Party Does not exists.')
        else:
            party_id_i = VehicleParty.objects.get(name=api_party_name)
            if request.data:
                 vehicle_work_i = VehicleWork.objects.create(party=party_id_i,date=api_date,
                 five_feet=float(api_five_feet),two_half_feet=float(api_two_half_feet),remark=api_remark)
                 for i in range(number_of_vehicle):
                     vehicle_id = Vehicle.objects.get(name=vehicles_name_list['name'][i])
                     vehicle_i = VehicleWorkVehicles.objects.create(vehicle=vehicle_id,vehicle_work=vehicle_work_i)
                 return Response("{} Vehicle work for vehicle {} added".format(api_party_name,api_vehicle_names),status = status.HTTP_201_CREATED)
            else:
                return Response("please provide all information correct",status=status.HTTP_204_NO_CONTENT)

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
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        owner = Owner.objects.get(id=1)
        try:
            api_name = request.data['name']
            api_contact = request.data['contact']
            api_date = request.data['date']
            api_village = request.data['village']
            api_salary = request.data['salary']
            api_advance = request.data['advance']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        if request.data:
            try:
                mix_debit_create_i = MixDebit.objects.create(owner=owner,date=api_date,spend_amount=api_advance)
            except Exception:
                return Response("please provide correct data",status=status.HTTP_400_BAD_REQUEST)
            try:
                worker_create_i = Worker.objects.create(owner=owner,debit_id=mix_debit_create_i,name=api_name,contact=int(api_contact),
                village=api_village,salary=float(api_salary))
                return Response("{} Worker Added".format(api_name),status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                mix_debit_create_i.delete()
                return Response('please provide all required datad',status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

class AddDailyWork(APIView):
    """
    View to Add New Worker in Database.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def post(self,request):
        try:
            api_name = request.data['name']
            api_contact = request.data['contact']
            api_date = request.data['date']
            api_village = request.data['village']
            api_five_feet = request.data['five_feet']
            api_five_feet_rate = request.data['five_feet_rate']
            api_two_half_feet = request.data['two_half_feet']
            api_two_half_feet_rate = request.data['two_half_feet_rate']
            api_diesel_spend = request.data['diesel_spend']
        except Exception as e:
            return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        net_amount = float(api_five_feet)*float(api_five_feet_rate)+float(api_two_half_feet)*float(api_two_half_feet_rate)
        try:
            owner = Owner.objects.get(id=1)
            try:
                party_i = Party.objects.create(owner=owner,date=api_date,village=api_village,contact=api_contact)
            except Exception as e:
                return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
            try:
                daily_party_i = DailyParty.objects.create(credit_id=party_i,name=api_name)
            except Exception as e:
                party_i.delete()
                return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
            try:
                daily_work_i = DailyWork.objects.create(party=daily_party_i,five_feet=float(api_five_feet),five_feet_rate=float(api_five_feet_rate),
                                            two_half_feet=float(api_two_half_feet),two_half_feet_rate=float(api_two_half_feet_rate),diesel_spend=float(api_diesel_spend),
                                            net_amount=float(net_amount))
                return Response('daily work for party {} added'.format(api_name),status=status.HTTP_201_CREATED)
            except Exception as e:
                party_i.delete()
                daily_party_i.delete()
                return Response('please provide all information correctly',status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
             return Response('please provide all data',status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_400_BAD_REQUEST)

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

class MachinePartyList(APIView):
    """
    View to return List of Machine Party.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def get(self,request):
        queryset = MachineParty.objects.all()
        serializer = MachinePartySerializer(queryset,many=True)
        return Response(serializer.data)

class VehiclePartyList(APIView):
    """
    View to return List of Vehicle Party.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def get(self,request):
        queryset = VehicleParty.objects.all()
        serializer = VehiclePartySerializer(queryset,many=True)
        return Response(serializer.data)

class WorkerList(APIView):
    """
    View to return List of Worker.
    api_ is for indication that this data in came from api
    _i is for indication that this data is a model instance
    """
    def get(self,request):
        queryset = Worker.objects.all()
        serializer = WorkerSerializer(queryset,many=True)
        return Response(serializer.data)

class MachinePayment(APIView):
    def post(self,request):
        try:
            api_contact = request.data['contact']
            api_start_date = request.data['start_date']
            api_end_date = request.data['end_date']
        except Exception as e:
            return Response('please provide all information')
        try:
            party_i = Party.objects.get(contact=api_contact)
        except:
            return Response("contact not found ",status=status.HTTP_404_NOT_FOUND)
        try:
            machine_party_i = MachineParty.objects.get(credit_id=party_i)
        except:
            return Response('machine party does not exists for this contact',status=status.HTTP_404_NOT_FOUND)
        try:
            machine_work_i = MachineWork.objects.filter(party=machine_party_i,date__range=[api_start_date,api_end_date])
            if machine_work_i:
                for i in machine_work_i:
                    MachineWork.objects.filter(party=i.party,date=i.date).update(paid=True)
                return Response('Machine Work for party {} from {} to {} is paid'.format(machine_party_i,api_start_date,api_end_date),status=status.HTTP_200_OK)
            else:
                 return Response('No machine work exists for this machine party')
        except:
            return Response('please provide correct date',status=status.HTTP_400_BAD_REQUEST)
        return Response('no work for this machine party exists.',status=status.HTTP_200_OK)

class VehiclePayment(APIView):
    def post(self,request):
        return Response('no work for this vehicle party exists.',status=status.HTTP_200_OK)