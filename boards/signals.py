from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Terminals, Customer, Receiver, Driver, Address

@receiver(post_save, sender=Terminals)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Address.objects.create(user=instance)

@receiver(post_save, sender=Terminals)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()