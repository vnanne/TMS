from django.contrib import admin

from .models import Board,Customer,Workorder,Address,Address_Type,Receiver,Terminals,Import,Export

admin.site.register(Board)
admin.site.register(Customer)
admin.site.register(Workorder)
admin.site.register(Address)
admin.site.register(Address_Type)
admin.site.register(Receiver)
admin.site.register(Terminals)
admin.site.register(Receiver)
admin.site.register(Import)
admin.site.register(Export)
