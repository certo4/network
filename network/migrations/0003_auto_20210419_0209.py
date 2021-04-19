# Generated by Django 3.1.6 on 2021-04-19 02:09

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_auto_20210419_0205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='like_count',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=8, validators=[django.core.validators.MinValueValidator(Decimal('0'))]),
        ),
    ]
