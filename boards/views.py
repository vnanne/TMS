from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import UpdateView, ListView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.db.models import Q

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import NewTopicForm, PostForm
from .models import Board,Topic,Post,Driver, Customer,Workorder,Address,Address_Type,Receiver,Terminals,Import,Export,Chassis_provide,Rate,Documents,Shipement_Details,Appointments,Shipment_Specifications
from django.contrib import messages



class BoardListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'home.html'


class TopicListView(ListView):
    model = Topic
    context_object_name = 'topics'
    template_name = 'topics.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        kwargs['board'] = self.board
        return super().get_context_data(**kwargs)

    def get_queryset(self):
        self.board = get_object_or_404(Board, pk=self.kwargs.get('pk'))
        queryset = self.board.topics.order_by('-last_updated').annotate(replies=Count('posts') - 1)
        return queryset


class PostListView(ListView):
    model = Post
    context_object_name = 'posts'
    template_name = 'topic_posts.html'
    paginate_by = 20

    def get_context_data(self, **kwargs):
        session_key = 'viewed_topic_{}'.format(self.topic.pk)
        if not self.request.session.get(session_key, False):
            self.topic.views += 1
            self.topic.save()
            self.request.session[session_key] = True
        kwargs['topic'] = self.topic
        return super().get_context_data(**kwargs)

    def get_queryset(self):
        self.topic = get_object_or_404(Topic, board__pk=self.kwargs.get('pk'), pk=self.kwargs.get('topic_pk'))
        queryset = self.topic.posts.order_by('created_at')
        return queryset


@login_required
def new_topic(request, pk):
    board = get_object_or_404(Board, pk=pk)
    if request.method == 'POST':
        form = NewTopicForm(request.POST)
        if form.is_valid():
            topic = form.save(commit=False)
            topic.board = board
            topic.starter = request.user
            topic.save()
            Post.objects.create(
                message=form.cleaned_data.get('message'),
                topic=topic,
                created_by=request.user
            )
            return redirect('topic_posts', pk=pk, topic_pk=topic.pk)
    else:
        form = NewTopicForm()
    return render(request, 'new_topic.html', {'board': board, 'form': form})


@login_required
def reply_topic(request, pk, topic_pk):
    topic = get_object_or_404(Topic, board__pk=pk, pk=topic_pk)
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.topic = topic
            post.created_by = request.user
            post.save()

            topic.last_updated = timezone.now()
            topic.save()

            topic_url = reverse('topic_posts', kwargs={'pk': pk, 'topic_pk': topic_pk})
            topic_post_url = '{url}?page={page}#{id}'.format(
                url=topic_url,
                id=post.pk,
                page=topic.get_page_count()
            )

            return redirect(topic_post_url)
    else:
        form = PostForm()
    return render(request, 'reply_topic.html', {'topic': topic, 'form': form})


@method_decorator(login_required, name='dispatch')
class PostUpdateView(UpdateView):
    model = Post
    fields = ('message', )
    template_name = 'edit_post.html'
    pk_url_kwarg = 'post_pk'
    context_object_name = 'post'

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(created_by=self.request.user)

    def form_valid(self, form):
        post = form.save(commit=False)
        post.updated_by = self.request.user
        post.updated_at = timezone.now()
        post.save()
        return redirect('topic_posts', pk=post.topic.board.pk, topic_pk=post.topic.pk)


class NewLoadListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'newload.html'
    paginate_by = 10

class AdminListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'admin.html'
    paginate_by = 10

class DriversListView(ListView):
    model = Driver
    context_object_name = 'drivers'
    template_name = 'drivers.html'
    paginate_by = 10

class CustomersListView(ListView):
    model = Customer
    context_object_name = 'customers'
    template_name = 'customers.html'
    paginate_by = 10

class TerminalListView(ListView):
    model = Terminals
    context_object_name = 'terminals'
    template_name = 'terminal.html'
    paginate_by = 10

class InvoiceListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'invoice.html'
    paginate_by = 10

class DocumentsListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'documents.html'
    
def Dashboard(request):
    dashboard_data=[]
    data= Workorder.objects.all()

    for row in data:
        res={}
        res['workorder_details']=row.json()
        try:
            res['import_details']=row.workorders_import.get().json()
        except:
            pass
        try:
            res['export_details']=row.workorders_export.get().json()
        except:
            pass
        try:
            res['shipement_details']= row.workorders_shipement_details.get().json()
        except:
            pass
        try:
            res['appointments_details']=row.workorders_appointments.get().json()
        except:
            pass
        try:
            res['workorders_shipment_specifications']=row.workorders_shipment_specifications.get().json()
        except:
            pass
        try:
            res['workorders_address']=row.workorders_address.get().json()
        except:
            pass
        try:
            res['receiver_details']=row.workorders_receiver.get().json()
        except:
            pass
        dashboard_data.append(res)
    return render(request,'dashboard.html',{'dashboard_data':dashboard_data})


def Addcustomer(request):
    data=request.POST

    if data['customer_Id']:
        Customer.objects.filter(id=data['customer_Id']).update(customer_name=data['contact_name'],customer_trade_name=data['company_name'],email=data['email'], telephone=data['ph_no'],tax_id=data['t_id'], motor_carrier=data['Carrier'])

        Address.objects.filter(customer_id=data['customer_Id']).update(flat=data['street_add_1'],street=data['street_add_2'], city=data['City'],state=data['State'], country=data['Country'],zipcode=data['Zipcode'] )
        msg = str(data['contact_name'])+str(' Changes updated successfully ')
        messages.success(request, msg)

    else:
        Customer.objects.create(customer_name=data['contact_name'], customer_trade_name=data['company_name'],
                            email=data['email'], telephone=data['ph_no'], tax_id=data['t_id'],motor_carrier=data['Carrier'])

        Address.objects.create(flat=data['street_add_1'], street=data['street_add_2'], city=data['City'],
                           state=data['State'], country=data['Country'], zipcode=data['Zipcode'],
                           customer_id=Customer.objects.all().order_by("-id")[0].id)
        msg = str(data['contact_name'])+ str(' added successfully ')
        messages.success(request, msg)
    return redirect('customers')

@csrf_exempt
def DeleteCustomer(request):
    data=request.POST
    if data['actionStr']=='Active':
        Customer.objects.filter(id=data['customer_Id']).update(is_active=False)
        # Address.objects.filter(customer_id=data['customer_Id']).delete()
        message = 'Customer ID ', data['customer_Id'], ' is Successfully InActivted '
    else:
        Customer.objects.filter(id=data['customer_Id']).update(is_active=True)
        #Address.objects.filter(customer_id=data['customer_Id']).delete()
        message='Customer ID ', data['customer_Id'],' is Successfully Activted '
    return JsonResponse({'msg':message })


def Addterminal(request):
    data = request.POST
    if data['terminal_Id']:
        Terminals.objects.filter(id=data['terminal_Id']).update(terminal_name=data['terminal_name'],email=data['email'],)
        Address.objects.filter(terminal_id=data['terminal_Id']).update(flat=data['street_add_1'], street=data['street_add_2'], city=data['City'],
                               state=data['State'], country=data['Country'], zipcode=data['Zipcode'])
        msg=str(data['terminal_name'])+ str(' Changes updated successfully ')
        messages.success(request, msg)

    else:
        Terminals.objects.create(terminal_name=data['terminal_name'],email=data['email'], telephone=data['ph_no'])
        Address.objects.create(flat=data['street_add_1'], street=data['street_add_2'], city=data['City'],state=data['State'], country=data['Country'], zipcode=data['Zipcode'],terminal_id=Terminals.objects.all().order_by("-id")[0].id)
        msg = str(data['terminal_name'])+str(' added successfully ')
        messages.success(request, msg)

    return redirect('terminal')

@csrf_exempt
def DeleteTerminal(request):
    data=request.POST
    Terminals.objects.filter(id=data['terminal_Id']).delete()
    Address.objects.filter(terminal_id=data['terminal_Id']).delete()
    message='Terminal ID ', data['terminal_Id'],' is Successfully Deleted '
    return JsonResponse({'msg':message })

def Adddriver(request):
    data=request.POST
    if data['haz_switch']=="true":
        haz_switch=True
    else:
        haz_switch=False
    if data['dual_endors_switch']=="true":
        dual_endors_switch=True
    else:
        dual_endors_switch=False

    if data['tank_switch']=="true":
        tank_switch=True
    else:
        tank_switch=False


    if data['driver_Id']:
        Driver.objects.filter(id=data['driver_Id']).update(driver_name=data['display_name'], telephone=data['ph_no'], email=data['email'],
                              ssn_tax_id=data['t_id'], licence=data['driver_lience'],dob=data['dob'],
                              licence_issue_date=data['licence_issue_date'],
                              licence_expiry_date=data['licence_expiry_date'], hazmat_endorsement=haz_switch,dual_endorsement=dual_endors_switch,tank_endorsement=tank_switch)
        Address.objects.filter(driver_id=data['driver_Id']).update(flat=data['street_add_1'], street=data['street_add_2'], city=data['City'],
                               state=data['State'], country=data['Country'], zipcode=data['Zipcode'])

        msg = str(data['display_name'])+str(' Changes updated successfully ')
        messages.success(request, msg)
    else:
        Driver.objects.create(driver_name=data['display_name'], telephone=data['ph_no'], email=data['email'],
                          ssn_tax_id=data['t_id'], licence=data['driver_lience'],dob=data['dob'],
                          licence_issue_date=data['licence_issue_date'], licence_expiry_date=data['licence_expiry_date'], hazmat_endorsement=haz_switch,dual_endorsement=dual_endors_switch,tank_endorsement=tank_switch)
        Address.objects.create(flat=data['street_add_1'], street=data['street_add_2'], city=data['City'],state=data['State'], country=data['Country'], zipcode=data['Zipcode'],driver_id=Driver.objects.all().order_by("-id")[0].id)
        msg = str(data['display_name'])+str(' added successfully ')
        messages.success(request, msg)

    return redirect('drivers')


@csrf_exempt
def DeleteDriver(request):
    data=request.POST
    if data['actionStr'] == 'Active':
        Driver.objects.filter(id=data['driver_Id']).update(is_active=False)
        message = 'Driver ID ', data['driver_Id'], ' is Successfully InActivted '
    else:
        Driver.objects.filter(id=data['driver_Id']).update(is_active=True)
        message='Driver ID ', data['driver_Id'],' is Successfully Activted '
    return JsonResponse({'msg':message })


def Addnewload(request):

    data=request.POST
    print(data)
    if data['I_load_type'] =='import':
        if data['I_customs_hold_switch']=='true':
            I_customs_hold_switch=True
        else:
            I_customs_hold_switch=False
        if data['I_over_weight_switch']=='true':
            I_over_weight_switch=True
        else:
            I_over_weight_switch=False
        if data['I_tri_axle_switch']=='true':
            I_tri_axle_switch=True
        else:
            I_tri_axle_switch=False
        if data['I_hazmat_switch']=='true':
            I_hazmat_switch=True
        else:
            I_hazmat_switch=False
        if data['I_live_switch']=='true':
            I_live_switch=True
        else:
            I_live_switch=False
        if data['I_drop_pick_switch']=='true':
            I_drop_pick_switch=True
        else:
            I_drop_pick_switch=False

        customer_id=Customer.objects.get(id=data['I_customer_id'])
        Workorder.objects.create(customer_id=customer_id, vessel_name=data['I_vessel_name'], pick_up_terminal_id=Terminals.objects.get(id=data['I_pickup_terminal']),return_terminal_id=Terminals.objects.get(id=data['I_return_terminal']))
        workorder_id=Workorder.objects.get(id=Workorder.objects.all().order_by('-id')[0].id)
        Import.objects.create(workorder_id=workorder_id, bill_of_landing_reference=data['I_bill_of_landing'],container=data['I_container_name'] , contains_size=data['I_container_size'])
        Shipement_Details.objects.create(workorder_id=workorder_id,po=data['I_po&ref'], weight=data['I_weight'], commidty=data['I_commodity'], customs_hold=I_customs_hold_switch, over_weight=I_over_weight_switch)
        Appointments.objects.create(workorder_id=workorder_id, vessel_eat=data['ETA'], lfd=data['LFD'], port_apt=data['I_PortAPT'], delivert_apt=data['I_delivery_Appointment'])

        Address.objects.create(flat=data['I_delivery_Location'],street=data['I_street_add_1'], street_1=data['I_street_add_2'], city=data['I_city'],state=data['I_state'], country=data['I_country'], zipcode=data['I_zipcode'], workorder_id=workorder_id)
        Shipment_Specifications.objects.create(workorder_id=workorder_id, cost=data['I_cost'], addition_cost=data['I_extra_costs'], remarks=data['I_remarks'], tri_axl=I_tri_axle_switch, hazmat=I_hazmat_switch, live=I_live_switch, drop=I_drop_pick_switch)
        Receiver.objects.create(contact_name=data['I_contact_Name'], email=data['I_email'], telephone=data['I_tel_no'], website=data['I_website'], delivery_notes=data['I_delivery_notes'],workorder_id=workorder_id)
        msg = str(' NewLoad import inserted successfully ')
    else:
        if data['customs_hold_switch']=='true':
            customs_hold_switch=True
        else:
            customs_hold_switch=False
        if data['over_weight_switch']=='true':
            over_weight_switch=True
        else:
            over_weight_switch=False
        if data['tri_axle_switch']=='true':
            tri_axle_switch=True
        else:
            tri_axle_switch=False
        if data['hazmat_switch']=='true':
            hazmat_switch=True
        else:
            hazmat_switch=False
        if data['live_switch']=='true':
            live_switch=True
        else:
            live_switch=False
        if data['drop_pick_switch']=='true':
            drop_pick_switch=True
        else:
            drop_pick_switch=False

        customer_id=Customer.objects.get(id=data['customer_id'])
        Workorder.objects.create(customer_id=customer_id, vessel_name=data['vessel_name'], pick_up_terminal_id=Terminals.objects.get(id=data['pickup_terminal']),return_terminal_id=Terminals.objects.get(id=data['return_terminal']))
        workorder_id=Workorder.objects.get(id=Workorder.objects.all().order_by('-id')[0].id)
        Export.objects.create(workorder_id=workorder_id, booking=data['booking'],container=data['container_name'] , contains_size=data['container_size'])
        Shipement_Details.objects.create(workorder_id=workorder_id,po=data['po&ref'], weight=data['weight'], commidty=data['commodity'], customs_hold=customs_hold_switch, over_weight=over_weight_switch)
        Appointments.objects.create(workorder_id=workorder_id, vessel_eat=data['ETD'], lfd=data['Cut-OFF'], port_apt=data['PortAPT'], delivert_apt=data['pickup_Appointment'])

        Address.objects.create(flat=data['delivery_Location'],street=data['street_add_1'], street_1=data['street_add_2'], city=data['city'],state=data['state'], country=data['country'], zipcode=data['zipcode'], workorder_id=workorder_id)
        Shipment_Specifications.objects.create(workorder_id=workorder_id, cost=data['cost'], addition_cost=data['extra_costs'], remarks=data['remarks'], tri_axl=tri_axle_switch, hazmat=hazmat_switch, live=live_switch, drop=drop_pick_switch)
        Receiver.objects.create(contact_name=data['contact_Name'], email=data['email'], telephone=data['tel_no'], website=data['website'], delivery_notes=data['delivery_notes'],workorder_id=workorder_id)
        msg = str(' NewLoad export inserted successfully ')

    messages.success(request, msg)
    return redirect('dashboard')



def getPickupTerminals(request):
    terimal_id=[x.json() for x in Terminals.objects.all()]
    return JsonResponse({'res':terimal_id })

@csrf_exempt
def getCustomerId(request):
    print(request.GET)
    query = request.GET['search_keyword']
    customers =[ obj.json() for obj in Customer.objects.filter(Q(id__icontains=query) | Q(customer_name__icontains=query))]
    return JsonResponse({'res':customers })








