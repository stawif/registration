# Generated by Django 3.0.3 on 2020-03-18 15:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0002_dailywork_received_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dailywork',
            name='received_amount',
        ),
    ]
