from django.contrib.auth.models import AbstractUser
from django.db import models


class UserAccount(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    First_Last_Name = models.CharField(max_length=255)
    PhoneNumber = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True)
    ACCOUNT_TYPES = (
        (1, "Lanh Dao"),
        (2, "Truong Diem GD"),
        (3, "Giao Dich Vien"),
        (4, "NV Giao Hang"),
        (5, "Truong Diem Tap Ket"),
        (6, "Tap Ket Vien"),
    )
    Type_Account = models.IntegerField(choices=ACCOUNT_TYPES)
