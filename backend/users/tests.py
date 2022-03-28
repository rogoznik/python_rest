from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from rest_framework import status

from users.models import User
from users.views import UserCustomViewSet


class TestUserApi(TestCase):

    def test_401(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list1(self):
        user = User.objects.create_superuser(username='user', email='user@example.com', password='123')
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        force_authenticate(request, user)
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list2(self):
        user = User.objects.create_superuser(username='user1', email='user1@example.com', password='123')
        client = APIClient()
        client.login(username=user.username, password='123')
        response = client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserApiApiTestCase(APITestCase):

    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin', email='admin@example.com', password='123')

    def test_get_list(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
