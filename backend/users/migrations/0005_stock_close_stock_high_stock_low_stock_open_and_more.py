# Generated by Django 5.0.6 on 2024-05-15 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_stock_name_alter_stock_symbol_userstock_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='close',
            field=models.DecimalField(decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='high',
            field=models.DecimalField(decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='low',
            field=models.DecimalField(decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='open',
            field=models.DecimalField(decimal_places=4, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='timestamp',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='volume',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='stock',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='stock',
            name='symbol',
            field=models.CharField(max_length=10, null=True, unique=True),
        ),
    ]
