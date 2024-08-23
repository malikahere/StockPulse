from django.db import models, transaction
from django.contrib.auth.models import User
from datetime import datetime


def update_user_concurrently(user_id, new_username, new_email):
    try:
        with transaction.atomic():
            # Retrieve the user instance and acquire a row-level lock
            user = User.objects.select_for_update().get(id=user_id)
            # Update the user's fields
            user.username = new_username
            user.email = new_email
            user.save()
            return True, "User details updated successfully"
    except User.DoesNotExist:
        return False, "User not found"
    except Exception as e:
        return False, str(e)
    
    
class Stock(models.Model):
    symbol  = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=255, null=True)
    open = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    high = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    low = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    close = models.DecimalField(max_digits=10, decimal_places=4 , null=True)
    volume = models.PositiveIntegerField(null=True)
    last_updated = models.DateTimeField(null=True)
    # Other fields like market cap, sector, etc. can be added here

    def __str__(self):
        return self.symbol
    

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    stocks = models.ManyToManyField(Stock, related_name='watchlists', default=list)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

    