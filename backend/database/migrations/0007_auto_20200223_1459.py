# Generated by Django 3.0.3 on 2020-02-23 09:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0006_auto_20200223_1430'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vehicleworkvehicles',
            old_name='Vehicle',
            new_name='vehicle',
        ),
    ]
