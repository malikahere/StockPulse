from django.db import models, transaction
from django.contrib.auth.models import User

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
    timestamp = models.DateTimeField(null=True)
    # Other fields like market cap, sector, etc. can be added here

    def __str__(self):
        return self.symbol
    

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    stocks = models.ManyToManyField(Stock, related_name='watchlists')
    # Other fields like description, creation date, etc. can be added here

    def __str__(self):
        return self.name
    
class UserStock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    # Other fields like quantity, purchase price, etc. can be added here

    def __str__(self):
        return f"{self.user.username}'s {self.stock.symbol}"
    