from django.core.management.base import BaseCommand
from todo.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        admin = User.objects.create_superuser('admin', 'admin@todo.local', '123')
        admin.firstname = "Ivan"
        admin.lastname = "Ivanov"
        admin.save()
        user1 = User.objects.create_user('user1', 'user1@todo.local', '123')
        user1.firstname = "Max"
        user1.lastname = "Maximov"
        user1.save()
        user2 = User.objects.create_user('user2', 'user2@todo.local', '123')
        user2.firstname = "Karl"
        user2.lastname = "Karlov"
        user2.save()
        user3 = User.objects.create_user('user3', 'user3@todo.local', '123')
        user3.firstname = "Alex"
        user3.lastname = "Alexandrov"
        user3.save()
