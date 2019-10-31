import math

from django.contrib.auth.models import User
from django.db import models
from django.utils.html import mark_safe
from django.utils.text import Truncator

from markdown import markdown


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
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.customer_name

    def get_customer_address(self):
        return Address.objects.get(customer_id=self.id)

class Workorder(models.Model):
    id=models.AutoField(primary_key=True)
    customer_id=models.ForeignKey(Customer,on_delete=False,related_name='customer_ids',)
    receiver_id=models.IntegerField(blank=True, null=True)
    load_id=models.IntegerField(blank=True, null=True)
    chassis_provider_id=models.IntegerField(blank=True, null=True)
    terminal_id=models.IntegerField(blank=True, null=True)
    import_id=models.CharField(max_length=250, blank=True, null=True)
    export_id=models.CharField(max_length=250 ,blank=True, null=True)
    po=models.CharField(max_length=250, blank=True, null=True)
    product_decription=models.CharField(max_length=250 , blank=True, null=True)
    vessel_name=models.CharField(max_length=250, blank=True, null=True)
    vessel_eat=models.CharField(max_length=250, blank=True, null=True)
    lfd=models.CharField(max_length=250, blank=True, null=True)
    customer_notes=models.CharField(max_length=250, blank=True, null=True)
    receiver_notes=models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.id

class Address_Type(models.Model):
    address_type_id=models.IntegerField(blank=True, null=True)
    address_type=models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.address_type_id

class Receiver(models.Model):
    id=models.AutoField(primary_key=True)
    contact_name=models.CharField(max_length=250, blank=True, null=True)
    email=models.EmailField(blank=True, null=True)
    telephone=models.CharField(max_length=250, blank=True, null=True)
    address_type_id=models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.contact_name

class Terminals(models.Model):
    id=models.AutoField(primary_key=True)
    terminal_name=models.CharField(max_length=250, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    telephone = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.terminal_name)

    def get_terminal_address(self):
        return Address.objects.get(terminal_id=self.id)

class Import(models.Model):
    id=models.AutoField(primary_key=True)
    bill_of_landing_reference=models.CharField(max_length=250)
    container=models.CharField(max_length=250, blank=True,null=True)
    container_type_id=models.CharField(max_length=250, blank=True,null=True)
    workorder_id=models.IntegerField(blank=True,null=True)

    def __str__(self):
        return self.id


class Export(models.Model):
    id=models.AutoField(primary_key=True)
    booking=models.CharField(max_length=250, blank=True,null=True)
    container=models.CharField(max_length=250, blank=True,null=True)
    container_type_id=models.CharField(max_length=250, blank=True,null=True)
    workorder_id=models.IntegerField(blank=True,null=True)

    def __str__(self):
        return self.id

class Driver(models.Model):
    id=models.AutoField(primary_key=True)
    driver_name=models.CharField(max_length=250, blank=True, null=True)
    licence=models.CharField(max_length=250, blank=True, null=True)
    hazmat_endorsement=models.BooleanField(default =False)
    dual_endorsement=models.BooleanField(default=False)
    tank_endorsement=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
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
        return self.id

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
        return self.id


class Documents(models.Model):
    id= models.AutoField(primary_key=True)
    document_type_id=models.CharField(max_length=250, blank=True,null=True)
    document_name=models.CharField(max_length=250, blank=True,null=True)
    load_id=models.CharField(max_length=250, blank=True,null=True)

    def __str__(self):
        return self.id



class Address(models.Model):
    id=models.AutoField(primary_key=True)
    flat=models.CharField(max_length=250, blank=True,null=True)
    street=models.CharField(max_length=250, blank=True,null=True)
    city=models.CharField(max_length=250, blank=True,null=True)
    state=models.CharField(max_length=250, blank=True,null=True)
    country=models.CharField(max_length=250,blank=True,null=True)
    zipcode=models.CharField(max_length=250, blank=True,null=True)
    customer_id=models.IntegerField(blank=True, null=True)
    receiver_id=models.IntegerField(blank=True, null=True)
    terminal_id=models.IntegerField(blank=True, null=True)
    driver_id=models.IntegerField(blank=True, null=True)

    def __str__(self):
        return str(self.flat)+","+str(self.street)+","+str(self.city)+","+str(self.state)+","+str(self.country)+","+str(self.zipcode)
