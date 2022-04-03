from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import UserModelSerializer, UserModelSerializerExtended
from .models import User


class UserLimitOffsetPagination(LimitOffsetPagination):
    pass


class UserCustomViewSet(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
    pagination_class = UserLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerExtended
        return UserModelSerializer
