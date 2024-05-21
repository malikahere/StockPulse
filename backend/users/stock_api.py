# stock_api.py

# from django.views import View
# import requests
# from django.http import JsonResponse
# import psycopg2
# import psycopg2.extras
# from psycopg2.extras import Json
# from django.utils.dateparse import parse_datetime
# from users.models import Stock

# class StockDataView(View):
#     def fetch_stock_data(self, symbols):
#         api_key = '5DKQGKRHOJ18NARH'
#         symbols = ['IBM', 'AAPL', 'GOOGL', 'MSFT']
#         base_url = 'https://www.alphavantage.co/query?

#         params = {
#         'function': 'TIME_SERIES_INTRADAY',
#         'symbol': symbols,
#         'interval': '5min',
#         'apikey': api_key,
#         'datatype': 'json'  
#     }
#         response = requests.get(base_url, params=params)
#         data = response.json()
#         print(PendingDeprecationWarning)
#         print(data)
#         return data
    
#     def save_stock_data(request, *args, **kwargs):
      
#       latest_stocks = Stock.objects.order_by('-timestamp')[:10]  
#         'timestamp': stock.timestamp,
#         'open': stock.open,
#         'high': stock.high,
#         'low': stock.low,
#         'close': stock.close,
#         'volume': stock.volume
#       } for stock in latest_stocks]
#       return JsonResponse(stock_data, safe=False)


#     def get(self, request, *args, **kwargs):
#         stock_symbol = 'IBM' # Example stock symbol
#         stock_data = self.fetch_stock_data(stock_symbol)
#         # print(stock_data)
#         self.save_stock_data(stock_symbol,stock_data)
#         return JsonResponse(stock_data)

from django.views import View
from django.http import JsonResponse
import requests
from users.models import Stock
from django.utils.dateparse import parse_datetime
from django.db import IntegrityError
import time

class StockDataView(View):
    def fetch_stock_data(self, symbol):
        api_key = '5DKQGKRHOJ18NARH'
        base_url = 'https://www.alphavantage.co/query'
        
        params = {
            'function': 'TIME_SERIES_INTRADAY',
            'symbol': symbol,
            'interval': '5min',
            'apikey': api_key,
            'datatype': 'json'
        }
        
        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def save_stock_data(self, symbol, stock_data):
        time_series = stock_data.get('Time Series (5min)', {})
        
        for timestamp, data in time_series.items():
            try:
                Stock.objects.create(
                    symbol=symbol,
                    timestamp=parse_datetime(timestamp),
                    open=data['1. open'],
                    high=data['2. high'],
                    low=data['3. low'],
                    close=data['4. close'],
                    volume=data['5. volume']
                )
            except IntegrityError:
                continue  # Handle duplicate entries

    def get(self, request, *args, **kwargs):
        symbols = ['IBM', 'AAPL', 'GOOGL', 'MSFT']
        all_stock_data = {}
        
        for symbol in symbols:
            stock_data = self.fetch_stock_data(symbol)
            if stock_data:
                self.save_stock_data(symbol, stock_data)
                all_stock_data[symbol] = stock_data
            time.sleep(12)  # To comply with API rate limits
        
        return JsonResponse(all_stock_data, safe=False)
