# Generated by Django 3.0.3 on 2020-02-27 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0008_auto_20200227_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='date',
            field=models.DateField(),
        ),
    ]
