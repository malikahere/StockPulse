from django.contrib import admin
from .models import  Stock , Watchlist
from django.contrib.auth.models import User


class WatchlistAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'user')  # Adjust this according to your model fields

admin.site.register(Watchlist, WatchlistAdmin)
admin.site.register(Stock)


