from django.shortcuts import render
from rest_framework import status

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter, ToDoFilter
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectViewSetLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectViewSetLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoViewSetLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoViewSet(ModelViewSet):
    serializer_class = TodoModelSerializer
    queryset = Todo.objects.all()
    pagination_class = TodoViewSetLimitOffsetPagination
    # filterset_fields = ['project']
    # filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # def perform_destroy(self, instance):
    #     instance.is_active = False
