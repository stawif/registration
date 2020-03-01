# Generated by Django 3.0.3 on 2020-03-01 13:02


import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DailyParty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='DailyWork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('five_feet', models.FloatField()),
                ('five_feet_rate', models.FloatField()),
                ('two_half_feet', models.FloatField()),
                ('two_half_feet_rate', models.FloatField()),
                ('diesel_spend', models.FloatField()),
                ('net_amount', models.FloatField()),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.DailyParty')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('measurement', models.CharField(max_length=30)),
                ('quantity', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('name', models.CharField(max_length=30, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MachineParty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='MixDebit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.datetime.now)),
                ('spend_amount', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=30)),
                ('contact', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Party',
            fields=[
                ('contact', models.IntegerField(primary_key=True, serialize=False)),
                ('village', models.CharField(max_length=30)),
                ('date', models.DateField(default=datetime.datetime.now)),
                ('total_credit', models.IntegerField(default=0)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='VehicleParty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('credit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.Party')),
            ],
        ),
        migrations.CreateModel(
            name='VehicleWork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('five_feet', models.FloatField()),
                ('two_half_feet', models.FloatField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.VehicleParty')),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('contact', models.IntegerField()),
                ('village', models.CharField(max_length=30)),
                ('salary', models.IntegerField()),
                ('exit_date', models.DateField(blank=True, null=True)),
                ('debit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='VehicleWorkVehicles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Vehicle')),
                ('vehicle_work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.VehicleWork')),
            ],
        ),
        migrations.CreateModel(
            name='VehicleSupply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('quantity', models.IntegerField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Item')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.VehicleParty')),
            ],
        ),
        migrations.CreateModel(
            name='Recorder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=30)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseParty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('contact', models.IntegerField()),
                ('village', models.CharField(max_length=50)),
                ('debit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.datetime.now)),
                ('quantity', models.IntegerField()),
                ('rate', models.FloatField()),
                ('net_amount', models.FloatField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Item')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.PurchaseParty')),
            ],
        ),
        migrations.AddField(
            model_name='mixdebit',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner'),
        ),
        migrations.CreateModel(
            name='MachineWork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('drilling_feet', models.FloatField()),
                ('diesel_amount', models.FloatField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Machine')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.MachineParty')),
            ],
        ),
        migrations.CreateModel(
            name='MachineSupply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('quantity', models.IntegerField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Item')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.MachineParty')),
            ],
        ),
        migrations.AddField(
            model_name='machineparty',
            name='credit_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.Party'),
        ),
        migrations.AddField(
            model_name='machine',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner'),
        ),
        migrations.AddField(
            model_name='item',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner'),
        ),
        migrations.CreateModel(
            name='Debit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('debit_amount', models.IntegerField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('debit_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='DailyWorkVehicles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Vehicle')),
                ('daily_work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.DailyWork')),
            ],
        ),
        migrations.AddField(
            model_name='dailyparty',
            name='credit_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.Party'),
        ),
        migrations.CreateModel(
            name='Credit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('credit_amount', models.IntegerField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
                ('work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Party')),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_credit', models.IntegerField(default=0)),
                ('total_debit', models.IntegerField(default=0)),
                ('balance', models.IntegerField(default=0)),
                ('owner', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
        ),
    ]
