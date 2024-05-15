# users/urls.py
from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView
from .views import UserRegistrationAPIView, UserLoginAPIView
from .stock_api import StockDataView
from . import views


urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('stocks/', StockDataView.as_view(), name='stocks'),
    path('watchlists/', views.create_watchlist),
    path('watchlists/<int:watchlist_id>/', views.watchlist_detail),
]
