# Generated by Django 3.2.12 on 2023-12-23 15:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20231223_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donhang',
            name='MaTaiKhoan',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
