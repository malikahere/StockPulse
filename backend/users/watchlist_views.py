from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Watchlist, Stock
from .serializers import WatchlistSerializer, StockSerializer
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
import json
from django.db import IntegrityError
from django.contrib.auth.models import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watchlist(request):
    watchlists = Watchlist.objects.filter(user=request.user)
    user = request.user
    watchlist_data = []
    for watchlist in watchlists:
        watchlist_dict = {
            'id': watchlist.id,
            'user_id':user.id,
            'title': watchlist.title,
            'description': watchlist.description,
            'stocks': []  # List to hold stock data
        }
        
        stocks = watchlist.stocks.all()
        latest_stocks = {}
        for stock in stocks:
            if stock.symbol not in latest_stocks or stock.last_updated > latest_stocks[stock.symbol].last_updated:
                latest_stocks[stock.symbol] = stock

        stock_serializer = StockSerializer(latest_stocks.values(), many=True)

        watchlist_dict['stocks'] = stock_serializer.data
        watchlist_data.append(watchlist_dict)

    return Response(watchlist_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watchlists_by_user(request, user_id):
    
    try:
        watchlists = Watchlist.objects.filter(user_id=user_id)
        
        watchlist_data = []
        for watchlist in watchlists:
            watchlist_dict = {
                'id': watchlist.id,
                'user_id': user_id,
                'title': watchlist.title,
                'description': watchlist.description,
                'stocks': []  # List to hold stock data
            }
            
            stocks = watchlist.stocks.all()
            latest_stocks = {}
            for stock in stocks:
                if stock.symbol not in latest_stocks or stock.last_updated > latest_stocks[stock.symbol].last_updated:
                    latest_stocks[stock.symbol] = stock
            
            stock_serializer = StockSerializer(latest_stocks.values(), many=True)
            
            watchlist_dict['stocks'] = stock_serializer.data
            
            watchlist_data.append(watchlist_dict)

        return Response(watchlist_data, status=status.HTTP_200_OK)
    
    except Watchlist.DoesNotExist:
        return Response({'error': 'No watchlists found for this user.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_watchlist(request):
    user_id = request.data.get('user_id')
    title = request.data.get('title')
    description = request.data.get('description', '')
    stocks = request.data.get('stocks', [])

    if not title:
        return Response({'error': 'Watchlist title is required'}, status=status.HTTP_400_BAD_REQUEST)
    if not user_id:
        return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Create or update the watchlist
        user = User.objects.get(id=user_id)
        watchlist_data = {
            'title': title,
            'user_id': user.id,
            'description': description
        }

        serializer = WatchlistSerializer(data=watchlist_data, context={'request': request})
        if serializer.is_valid():
            watchlist = serializer.save(user=user)  # This will automatically assign the current user
            
            if stocks:
                valid_stocks = Stock.objects.filter(symbol__in=stocks)
                invalid_symbols = set(stocks) - set(valid_stocks.values_list('symbol', flat=True))

                if invalid_symbols:
                    return Response({'warning': f'Following stock symbols are invalid: {", ".join(invalid_symbols)}'}, status=status.HTTP_400_BAD_REQUEST)

                watchlist.stocks.set(valid_stocks)
                
            return Response({'message': 'Watchlist created successfully', 'watchlist_id': watchlist.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except IntegrityError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_watchlist(request, watchlist_id):
    try:
        # Fetch the watchlist object
        watchlist = Watchlist.objects.get(id=watchlist_id)

        # Retrieve data from request
        title = request.data.get('title', watchlist.title)
        description = request.data.get('description', watchlist.description)
        stocks = request.data.get('stocks', [])

        # Update fields
        watchlist.title = title
        watchlist.description = description
        watchlist.save()

        if stocks is not None:
            # Validate stock symbols
            valid_stocks = Stock.objects.filter(symbol__in=stocks)
            invalid_symbols = set(stocks) - set(valid_stocks.values_list('symbol', flat=True))

            if invalid_symbols:
                return Response({'warning': f'Following stock symbols are invalid: {", ".join(invalid_symbols)}'}, status=status.HTTP_400_BAD_REQUEST)

            # Update the stocks in the watchlist
            watchlist.stocks.set(valid_stocks)

        return Response({'message': 'Watchlist updated successfully'}, status=status.HTTP_200_OK)
    except Watchlist.DoesNotExist:
        return Response({'error': 'Watchlist not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_watchlist(request, watchlist_id):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        watchlist = Watchlist.objects.get(id=watchlist_id, user_id=user_id)
        watchlist.delete()
        return Response({'message': 'Watchlist removed successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Watchlist.DoesNotExist:
        return Response({'message': 'Watchlist not found'}, status=status.HTTP_404_NOT_FOUND)