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
    customer_id=models.IntegerField()
    customer_name=models.CharField(max_length=250)
    customer_trade_name=models.CharField(max_length=250)
    address_id=models.IntegerField()
    email=models.EmailField()
    contact_person=models.CharField(max_length=250)
    telephone=models.IntegerField()
    fax=models.IntegerField()
    address_type_id=models.CharField(max_length=250)
    tax_id=models.IntegerField()

    def __str__(self):
        return self.customer_id


class Workorder(models.Model):
    workorder_id=models.IntegerField(primary_key=True)
    customer_id=models.ForeignKey(Customer,on_delete=False,related_name='customer_ids',)
    receiver_id=models.IntegerField()
    load_id=models.IntegerField()
    chassis_provider_id=models.IntegerField()
    terminal_id=models.IntegerField
    import_id=models.CharField(max_length=250)
    export_id=models.CharField(max_length=250)
    po=models.CharField(max_length=250)
    product_decription=models.CharField(max_length=250)
    vessel_name=models.CharField(max_length=250)
    vessel_eat=models.CharField(max_length=250)
    lfd=models.CharField(max_length=250)
    customer_notes=models.CharField(max_length=250)
    receiver_notes=models.CharField(max_length=250)

    def __str__(self):
        return self.workorder_id

class Address(models.Model):
    address_id=models.IntegerField()
    flat=models.CharField(max_length=250)
    street=models.CharField(max_length=250)
    address1=models.CharField(max_length=250)
    address2=models.CharField(max_length=250)
    state=models.CharField(max_length=250)
    zipcode=models.IntegerField()
    addresstype_id=models.IntegerField()

    def __str__(self):
        return self.address_id

class Address_Type(models.Model):
    address_type_id=models.IntegerField()
    address_type=models.CharField(max_length=250)

    def __str__(self):
        return self.address_type_id

class Receiver(models.Model):
    receiver_id=models.IntegerField()
    contact_name=models.CharField(max_length=250)
    address_id=models.IntegerField()
    email=models.EmailField()
    telephone=models.IntegerField()
    address_type_id=models.IntegerField()

    def __str__(self):
        return self.receiver_id

class Terminals(models.Model):
    terminal_id=models.IntegerField()
    terminal_name=models.CharField(max_length=250)
    address_id=models.IntegerField()
    address_type_id=models.IntegerField()

    def __str__(self):
        return self.terminal_id


class Import(models.Model):
    id=models.IntegerField(primary_key=True)
    bill_of_landing_reference=models.CharField(max_length=250)
    container=models.CharField(max_length=250)
    container_type_id=models.IntegerField()
    workorder_id=models.IntegerField()

    def __str__(self):
        return self.id


class Export(models.Model):
    id=models.IntegerField(primary_key=True)
    booking=models.CharField(max_length=250)
    container=models.CharField(max_length=250)
    container_type_id=models.IntegerField()
    workorder_id=models.IntegerField()

    def __str__(self):
        return self.id
