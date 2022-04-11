from rest_framework import mixins
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
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


class AuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return_data = {
            'token': token.key,
            'id': user.id
        }
        return Response(return_data)
