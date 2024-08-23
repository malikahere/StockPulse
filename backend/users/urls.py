# users/urls.py
from django.urls import path
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView
from .views import UserRegistrationAPIView, UserLoginAPIView
from .stock_api import StockDataView
from . import watchlist_views


urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),
    path('register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('stocks/', StockDataView.as_view(), name='stocks'),
    path('watchlist/', watchlist_views.get_watchlist, name='get_watchlist'),
    path('watchlist/add/', watchlist_views.add_to_watchlist, name='add_to_watchlist'),
    path('watchlist/<int:watchlist_id>/', watchlist_views.update_watchlist, name='update_watchlist'),
    path('watchlist/remove/<int:watchlist_id>/', watchlist_views.remove_from_watchlist, name='remove_from_watchlist'),
    path('watchlist/uid/<int:user_id>/', watchlist_views.get_watchlists_by_user, name='get-watchlists-by-user'),
  
]
