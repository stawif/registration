# Generated by Django 3.0 on 2020-02-26 07:20

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
                ('five_feet', models.IntegerField()),
                ('five_feet_rate', models.IntegerField()),
                ('two_half_feet', models.IntegerField()),
                ('two_half_feet_rate', models.IntegerField()),
                ('diesel_spend', models.IntegerField()),
                ('net_amount', models.IntegerField()),
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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
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
                ('date', models.DateField(auto_now_add=True)),
                ('spend_amount', models.IntegerField(default=0)),
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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact', models.IntegerField()),
                ('village', models.CharField(max_length=30)),
                ('date', models.DateField(auto_now_add=True)),
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
                ('five_feet', models.IntegerField()),
                ('two_half_feet', models.IntegerField()),
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
                ('advance', models.IntegerField()),
                ('exit_date', models.DateField()),
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
            name='Supply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('quantity', models.IntegerField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Item')),
                ('party', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Party')),
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
                ('credit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.Party')),
                ('debit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('rate', models.IntegerField()),
                ('net_amount', models.IntegerField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('debit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
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
                ('drilling_feet', models.IntegerField()),
                ('diesel_amount', models.IntegerField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Machine')),
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
            name='DailyExpense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expense', models.IntegerField()),
                ('remark', models.CharField(blank=True, max_length=50)),
                ('debit_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='database.MixDebit')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Owner')),
            ],
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
