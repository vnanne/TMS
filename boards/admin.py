from django.contrib import admin

from .models import Board,Customer,Workorder,Address,Address_Type,Receiver,Terminals,Import,Export,Chassis_provide,Rate,Documents

admin.site.register(Board)
admin.site.register(Customer)
admin.site.register(Workorder)
admin.site.register(Address)
admin.site.register(Address_Type)
admin.site.register(Receiver)
admin.site.register(Terminals)
admin.site.register(Import)
admin.site.register(Export)
admin.site.register(Chassis_provide)
admin.site.register(Rate)
admin.site.register(Documents)
