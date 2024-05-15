# stock_api.py

from django.views import View
import requests
from django.http import JsonResponse
import psycopg2
import psycopg2.extras
from psycopg2.extras import Json
from django.utils.dateparse import parse_datetime


from users.models import Stock

class StockDataView(View):
    def fetch_stock_data(self, symbol):
        # Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
        api_key = '5DKQGKRHOJ18NARH'
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={api_key}'
        # url = f'https://jsonplaceholder.typicode.com/posts'
        response = requests.get(url)
        data = response.json()
        print(PendingDeprecationWarning)
        print(data)
    #     con = psycopg2.connect(dbname="stockDB", user="sAdmin", password="sAdmin@13", host="localhost", port="5432")
    #     cur= con.cursor()   
    #     cur.execute('''
    # CREATE TABLE IF NOT EXISTS public.users_stock (
    #     timestamp TEXT PRIMARY KEY,
    #     open REAL,
    #     high REAL,
    #     low REAL,
    #     close REAL,
    #     volume INTEGER
    # )
    # ''')

        # cur.execute("INSERT INTO public.users_stock VALUES (%s)", [Json(data)['']])
        # cur.close()
        # con.close()
   
        return data
    
    def save_stock_data(self, symbol, data):
        time_series = data.get('Time Series (5min)', {})
        for timestamp, values in time_series.items():
            Stock.objects.create(
                symbol=symbol,
                timestamp=parse_datetime(timestamp),
                open=values['1. open'],
                high=values['2. high'],
                low=values['3. low'],
                close=values['4. close'],
                volume=values['5. volume']
            )
    
    def get(self, request, *args, **kwargs):
        stock_symbol = 'IBM' # Example stock symbol
        stock_data = self.fetch_stock_data(stock_symbol)
        # print(stock_data)
        self.save_stock_data(stock_symbol,stock_data)
        return JsonResponse(stock_data)