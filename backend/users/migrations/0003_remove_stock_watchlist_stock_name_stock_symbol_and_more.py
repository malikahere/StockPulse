# Generated by Django 5.0.6 on 2024-05-13 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_stock_watchlist_delete_user_stock_watchlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stock',
            name='watchlist',
        ),
        migrations.AddField(
            model_name='stock',
            name='name',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AddField(
            model_name='stock',
            name='symbol',
            field=models.CharField(default='NA', max_length=10),
        ),
        migrations.AddField(
            model_name='watchlist',
            name='name',
            field=models.CharField(default='Unknown', max_length=100),
        ),
        migrations.AddField(
            model_name='watchlist',
            name='stocks',
            field=models.ManyToManyField(related_name='watchlists', to='users.stock'),
        ),
    ]
