from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        admin = User.objects.create_superuser('admin', 'admin@users.local', '123')
        admin.first_name = "Ivan"
        admin.last_name = "Ivanov"
        admin.save()
        user1 = User.objects.create_user('user1', 'user1@users.local', '123')
        user1.first_name = "Max"
        user1.last_name = "Maximov"
        user1.save()
        user2 = User.objects.create_user('user2', 'user2@users.local', '123')
        user2.first_name = "Karl"
        user2.last_name = "Karlov"
        user2.save()
        user3 = User.objects.create_user('user3', 'user3@users.local', '123')
        user3.first_name = "Alex"
        user3.last_name = "Alexandrov"
        user3.save()
