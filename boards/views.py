from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import UpdateView, ListView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import NewTopicForm, PostForm
from .models import Board,Topic,Post,Driver, Customer,Workorder,Address,Address_Type,Receiver,Terminals,Import,Export,Chassis_provide,Rate,Documents
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
    
class DashboardListView(ListView):
    model = Board
    context_object_name = 'boards'
    template_name = 'dashboard.html'
    paginate_by = 10


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


