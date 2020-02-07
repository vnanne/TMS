import math

from django.contrib.auth.models import User
from django.db import models
from django.utils.html import mark_safe
from django.utils.text import Truncator
from django.core.exceptions import ValidationError
from markdown import markdown
import re
email_re = re.compile(
    r"(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"  # dot-atom
    r'|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*"' # quoted-string
    r')@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?$', re.IGNORECASE)

class Board(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def get_posts_count(self):
        return Post.objects.filter(topic__board=self).count()

    def get_last_post(self):
        return Post.objects.filter(topic__board=self).order_by('-created_at').first()


class Topic(models.Model):
    subject = models.CharField(max_length=255)
    last_updated = models.DateTimeField(auto_now_add=True)
    board = models.ForeignKey(Board, related_name='topics',on_delete=False)
    starter = models.ForeignKey(User, related_name='topics',on_delete=False)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.subject

    def get_page_count(self):
        count = self.posts.count()
        pages = count / 20
        return math.ceil(pages)

    def has_many_pages(self, count=None):
        if count is None:
            count = self.get_page_count()
        return count > 6

    def get_page_range(self):
        count = self.get_page_count()
        if self.has_many_pages(count):
            return range(1, 5)
        return range(1, count + 1)

    def get_last_ten_posts(self):
        return self.posts.order_by('-created_at')[:10]


class Post(models.Model):
    message = models.TextField(max_length=4000)
    topic = models.ForeignKey(Topic, related_name='posts',on_delete=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(User, related_name='posts',on_delete=False)
    updated_by = models.ForeignKey(User, null=True, related_name='+',on_delete=False)

    def __str__(self):
        truncated_message = Truncator(self.message)
        return truncated_message.chars(30)

    def get_message_as_markdown(self):
        return mark_safe(markdown(self.message, safe_mode='escape'))

#########################

class Customer(models.Model):
    id=models.AutoField(primary_key=True)
    customer_name=models.CharField(max_length=250, blank=True, null=True)
    customer_trade_name=models.CharField(max_length=250 ,blank=True, null=True)
    email=models.EmailField(blank=True, null=True)
    contact_person=models.CharField(max_length=250 , blank=True, null=True)
    telephone=models.CharField(max_length=250, blank=True, null=True)
    fax=models.CharField(max_length=250, blank=True, null=True)
    tax_id=models.CharField(max_length=250, blank=True, null=True)
    motor_carrier=models.CharField(max_length=250,blank=True,null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.customer_name)

    def get_customer_address(self):
        return Address.objects.get(customer_id=self.id)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['customer_name'] = self.customer_name
        ret['customer_trade_name'] = self.customer_trade_name
        ret['email']=self.email
        ret['contact_person']=self.contact_person
        ret['telephone']=self.telephone
        ret['fax=models']=self.fax
        ret['tax_id']=self.tax_id
        ret['motor_carrier']=self.motor_carrier
        ret['is_active']=self.is_active
        return ret


class Terminals(models.Model):
    id=models.AutoField(primary_key=True)
    terminal_name=models.CharField(max_length=250, blank=True, null=True)
    email = models.EmailField(max_length=70,blank=True, null= True, unique= True)
    telephone = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.terminal_name)

    def get_terminal_address(self):
        return Address.objects.get(terminal_id=self.id)

    def save(self, *args, **kwargs):
        # ... other things not important here
        self.email = self.email.lower().strip()  # Hopefully reduces junk to ""
        if self.email != "":  # If it's not blank
            if not email_re.match(self.email):  # If it's not an email address
                raise ValidationError(u'%s is not an email address, dummy!' % self.email)
        if self.email == "":
            self.email = None
        super(Terminals, self).save(*args, **kwargs)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['terminal_name'] = self.terminal_name
        ret['email'] = self.email
        ret['telephone']=self.telephone
        return ret

class Workorder(models.Model):
    id=models.AutoField(primary_key=True)
    customer_id=models.ForeignKey(Customer,on_delete=False,related_name='customer_ids',)
    receiver_id=models.IntegerField(blank=True, null=True)
    load_id=models.IntegerField(blank=True, null=True)
    chassis_provider_id=models.IntegerField(blank=True, null=True)
    pick_up_terminal_id=models.ForeignKey(Terminals,on_delete=False,blank=True, null=True, related_name='pick_up_terminal_workorders')
    import_id=models.CharField(max_length=250, blank=True, null=True)
    export_id=models.CharField(max_length=250 ,blank=True, null=True)
    vessel_name=models.CharField(max_length=250, blank=True, null=True)
    return_terminal_id=models.ForeignKey(Terminals,on_delete=False,blank=True, null=True, related_name='return_terminal_workorders')


    def __str__(self):
        return str(self.id)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['customer_id'] = self.customer_id
        ret['receiver_id'] = self.receiver_id
        ret['load_id']=self.load_id
        ret['chassis_provider_id']=self.chassis_provider_id
        ret['pick_up_terminal_id']=self.pick_up_terminal_id
        ret['import_id=models']=self.import_id
        ret['export_id']=self.export_id
        ret['vessel_name']=self.vessel_name
        ret['return_terminal_id']=self.return_terminal_id
        return ret

class Address_Type(models.Model):
    address_type_id=models.IntegerField(blank=True, null=True)
    address_type=models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.address_type_id)

class Receiver(models.Model):
    id=models.AutoField(primary_key=True)
    contact_name=models.CharField(max_length=250, blank=True, null=True)
    email=models.EmailField(blank=True, null=True)
    telephone=models.CharField(max_length=250, blank=True, null=True)
    website=models.CharField(max_length=250, blank=True, null=True)
    delivery_notes=models.CharField(max_length=250, blank=True, null=True)
    address_type_id=models.CharField(max_length=250, blank=True, null=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_receiver')


    def __str__(self):
        return str(self.contact_name)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['contact_name'] = self.contact_name
        ret['email'] = self.email
        ret['telephone']=self.telephone
        ret['website']=self.website
        ret['delivery_notes']=self.delivery_notes
        return ret


class Import(models.Model):
    id=models.AutoField(primary_key=True)
    bill_of_landing_reference=models.CharField(max_length=250)
    container=models.CharField(max_length=250, blank=True,null=True)
    container_type_id=models.CharField(max_length=250, blank=True,null=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_import')
    contains_size=models.CharField(max_length=250, blank=True,null=True)

    def __str__(self):
        return str(self.id)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['bill_of_landing_reference'] = self.bill_of_landing_reference
        ret['container'] = self.container
        ret['container_type_id']=self.container_type_id
        ret['workorder_id']=self.workorder_id
        ret['contains_size']=self.contains_size
        return ret


class Export(models.Model):
    id=models.AutoField(primary_key=True)
    booking=models.CharField(max_length=250, blank=True,null=True)
    container=models.CharField(max_length=250, blank=True,null=True)
    container_type_id=models.CharField(max_length=250, blank=True,null=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_export')
    contains_size=models.CharField(max_length=250, blank=True,null=True)

    def __str__(self):
        return str(self.id)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['booking'] = self.booking
        ret['container'] = self.container
        ret['container_type_id']=self.container_type_id
        ret['workorder_id']=self.workorder_id
        ret['contains_size']=self.contains_size
        return ret

class Driver(models.Model):
    id=models.AutoField(primary_key=True)
    driver_name=models.CharField(max_length=250, blank=True, null=True)
    licence=models.CharField(max_length=250, blank=True, null=True)
    hazmat_endorsement=models.BooleanField(default =False)
    dual_endorsement=models.BooleanField(default=False)
    tank_endorsement=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    dob=models.DateField(blank=True, null=True)
    licence_issue_date=models.DateField(blank=True, null=True)
    licence_expiry_date=models.DateField(blank=True, null=True)
    ssn_tax_id=models.CharField(max_length=250, blank=True, null=True)
    email=models.EmailField(blank=True, null=True)
    telephone=models.CharField(max_length=250, blank=True, null=True)
    
    def __str__(self):
        return str(self.id)

    def get_driver_address(self):
        return Address.objects.get(driver_id=self.id)
        
class Chassis_provide(models.Model):
    id=models.AutoField(primary_key=True)
    chassis_provide_name=models.CharField(max_length=250, blank=True,null=True)
    email=models.EmailField(blank=True,null=True)
    telephone=models.CharField(max_length=250, blank=True,null=True)
    contact=models.CharField(max_length=250, blank=True,null=True)
    address_id=models.IntegerField(blank=True,null=True)
    addresstype_id=models.IntegerField(blank=True,null=True)
    
    def __str__(self):
        return str(self.id)

class Rate(models.Model):
    id= models.AutoField(primary_key=True)
    rate_description=models.CharField(max_length=250,blank=True,null=True)
    rate_type_id=models.IntegerField(blank=True,null=True)
    amount=models.IntegerField(blank=True,null=True)
    distance_in_miles=models.IntegerField(blank=True,null=True)
    city =models.CharField(max_length=250, blank=True,null=True)
    customer_id=models.ForeignKey(Customer,on_delete=False,related_name='customer_names')
    driver_id=models.ForeignKey(Driver,on_delete=False,related_name='driver_names')
        
    def __str__(self):
        return str(self.id)


class Documents(models.Model):
    id= models.AutoField(primary_key=True)
    document_type_id=models.CharField(max_length=250, blank=True,null=True)
    document_name=models.CharField(max_length=250, blank=True,null=True)
    load_id=models.CharField(max_length=250, blank=True,null=True)

    def __str__(self):
        return str(self.id)



class Address(models.Model):
    id=models.AutoField(primary_key=True)
    flat=models.CharField(max_length=250, blank=True,null=True)
    street=models.CharField(max_length=250, blank=True,null=True)
    street_1=models.CharField(max_length=250, blank=True,null=True)
    city=models.CharField(max_length=250, blank=True,null=True)
    state=models.CharField(max_length=250, blank=True,null=True)
    country=models.CharField(max_length=250,blank=True,null=True)
    zipcode=models.CharField(max_length=250, blank=True,null=True)
    customer_id=models.IntegerField(blank=True, null=True)
    receiver_id=models.IntegerField(blank=True, null=True)
    terminal_id=models.IntegerField(blank=True, null=True)
    driver_id=models.IntegerField(blank=True, null=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_address')


    def __str__(self):
        return str(self.flat)+","+str(self.street)+","+str(self.city)+","+str(self.state)+","+str(self.country)+","+str(self.zipcode)


    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['flat'] = self.flat
        ret['street'] = self.street
        ret['city']=self.city
        ret['state']=self.state
        ret['country']=self.country
        ret['zipcode']=self.zipcode
        return ret

class Shipement_Details(models.Model):
    id=models.AutoField(primary_key=True)
    po=models.CharField(max_length=250, blank=True,null=True)
    billing_of_landing=models.CharField(max_length=250, blank=True,null=True)
    product_decription=models.CharField(max_length=250, blank=True,null=True)
    weight=models.CharField(max_length=250, blank=True,null=True) 
    commidty=models.CharField(max_length=250, blank=True,null=True)
    customs_hold=models.BooleanField(default=False)
    over_weight=models.BooleanField(default=False)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_shipement_details')
    customer_notes=models.CharField(max_length=250, blank=True,null=True) 
    receiver_notes=models.CharField(max_length=250, blank=True,null=True) 

    def __str__(self):
        return str(self.po)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['po'] = self.po
        ret['billing_of_landing'] = self.billing_of_landing
        ret['product_decription']=self.product_decription
        ret['weight']=self.weight
        ret['commidty']=self.commidty
        ret['customs_hold']=self.customs_hold
        ret['over_weight']=self.over_weight
        ret['customer_notes']=self.customer_notes
        ret['receiver_notes']=self.receiver_notes
        return ret    

class Appointments(models.Model):
    id=models.AutoField(primary_key=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_appointments')
    vessel_eat=models.DateField(blank=True, null=True)
    lfd=models.DateField(blank=True, null=True)
    port_apt=models.DateField(blank=True, null=True)
    delivert_apt=models.DateField(blank=True, null=True)

    def __str__(self):
        return str(self.vessel_eat)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['vessel_eat'] = self.vessel_eat
        ret['lfd'] = self.lfd
        ret['port_apt']=self.port_apt
        ret['delivert_apt']=self.delivert_apt
        return ret 

class Shipment_Specifications(models.Model):
    id=models.AutoField(primary_key=True)
    workorder_id=models.ForeignKey(Workorder,on_delete=False,null=True, related_name='workorders_shipment_specifications')
    tri_axl=models.BooleanField(default=False)
    hazmat=models.BooleanField(default=False)
    live=models.BooleanField(default=False) 
    drop=models.BooleanField(default=False)
    cost=models.CharField(max_length=250, blank=True,null=True)
    addition_cost=models.CharField(max_length=250, blank=True,null=True)
    remarks=models.CharField(max_length=250, blank=True,null=True)   


    def __str__(self):
        return str(self.tri_axl)

    def json(self):
        ret = {}
        ret['id'] = self.id
        ret['tri_axl'] = self.tri_axl
        ret['hazmat'] = self.hazmat
        ret['live']=self.live
        ret['drop']=self.drop
        ret['cost']=self.cost
        ret['addition_cost']=self.addition_cost
        ret['remarks']=self.remarks
        return ret 