from django.contrib.auth.models import AbstractUser
from django.db import models
from . import settings


class DiemTapKet(models.Model):
    MaDiemTapKet = models.AutoField(primary_key=True)
    TenDiemTapKet = models.CharField(max_length=255)
    DiaDiem = models.CharField(max_length=255)
    Hotline = models.CharField(max_length=255)


class DiemGiaoDich(models.Model):
    MaDiemGiaoDich = models.AutoField(primary_key=True)
    TenDiaDiemGiaoDich = models.CharField(max_length=255)
    DiaDiem = models.CharField(max_length=255)
    Hotline = models.CharField(max_length=255)
    MaDiemTapKet = models.ForeignKey(
        DiemTapKet, null=True, blank=True, on_delete=models.SET_NULL
    )


class Account(AbstractUser):
    MaTaiKhoan = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    HoVaTen = models.CharField(max_length=255)
    SoDienThoai = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True)
    ACCOUNT_TYPES = (
        (1, "Lanh Dao"),
        (2, "Truong Diem Giao Dich"),
        (3, "Giao Dich Vien"),
        (4, "Truong Diem Tap Ket"),
        (5, "Tap Ket Vien"),
    )
    LoaiTaiKhoan = models.IntegerField(choices=ACCOUNT_TYPES)
    MaDiemTapKet = models.ForeignKey(
        DiemTapKet, null=True, blank=True, on_delete=models.SET_NULL
    )
    MaDiemGiaoDich = models.ForeignKey(
        DiemGiaoDich, null=True, blank=True, on_delete=models.SET_NULL
    )


class Customer(models.Model):
    MaKhachHang = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    HoVaTen = models.CharField(max_length=255)
    SoDienThoai = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True)


class DonHang(models.Model):
    MaDonHang = models.AutoField(primary_key=True)
    MaKhachHang = models.ForeignKey(
        Customer, null=True, blank=True, on_delete=models.SET_NULL
    )
    MaTaiKhoan = models.ForeignKey(
        Account, null=True, blank=True, on_delete=models.SET_NULL
    )
    NgayGuiHang = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    NgayNhanHang = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    State = (
        (1, "Nguoi gui den diem giao dich"),
        (2, "Diem giao dich den diem tap ket goc"),
        (3, "Diem tap ket goc den dich"),
        (4, "Diem tap ket goc den diem tap ket dich"),
        (5, "Diem tap ket dich den nguoi nhan"),
        (6, "Tra don hang"),
        (7, "Giao dich thanh cong"),
    )
    TrangThai = models.IntegerField(choices=State)
    LoaiHang = models.CharField(max_length=255)
    KhoiLuong = models.CharField(max_length=255)
    Tien = models.IntegerField()
    MoTaDonHang = models.CharField(max_length=255)
    HoVaTenNguoiNhan = models.CharField(max_length=255)
    DiaChiNhanHang = models.CharField(max_length=255)
    SoDienThoaiNguoiNhan = models.CharField(max_length=255)
    MaDiemGiaoDich = models.ForeignKey(
        DiemGiaoDich, null=True, blank=True, on_delete=models.CASCADE
    )
    DiemTapKet = models.ForeignKey(
        DiemTapKet, null=True, blank=True, on_delete=models.CASCADE
    )
    DiaChiNguoiGui = models.CharField(max_length=255)
