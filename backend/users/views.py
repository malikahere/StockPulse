# users/views.py
from rest_framework import generics , permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken    
from rest_framework import status  
from rest_framework.decorators import api_view
from .models import Watchlist
from .serializers import WatchlistSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegistrationAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
   

class UserLoginAPIView(ObtainAuthToken):
     queryset = User.objects.all()
     serializer_class = UserSerializer
     
     def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        # Call the parent class's post method to handle authentication
        response = super().post(request)
        
        # Check if authentication was successful
        if 'token' in response.data:
            # If authentication was successful, retrieve the user and return the token
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        
        # If authentication failed, return the response as is
        return response
     
@api_view(['POST'])
def create_watchlist(request):
    serializer = WatchlistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def watchlist_detail(request, watchlist_id):
    try:
        watchlist = Watchlist.objects.get(id=watchlist_id)
    except Watchlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WatchlistSerializer(watchlist)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WatchlistSerializer(watchlist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        watchlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
