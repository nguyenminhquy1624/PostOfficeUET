from django.contrib import admin
from django.urls import path
from .views import (
    UserRegisterView,
    LoginView,
    UserView,
    LogoutView,
    AllUserView,
    UserByID,
    UpdateAccountView,
    DeleteAccountView,
    RegisterCustomerView,
    LoginCustomerView,
    LogoutCustomerView,
    CustomerByID,
    CustomerAll,
    UpdateCustomer,
    DeleteCustomer,
    RegisterDiemTapKetView,
    DiemTapKetByID,
    DiemTapKetAll,
    UpdateDiemTapKet,
    DeleteDiemTapKet,
    RegisterDiemGiaoDichView,
    DiemGiaoDichByID,
    DiemGiaoDichAll,
    UpdateDiemGiaoDich,
    DeleteDiemGiaoDich,
    RegisterDonHang,
    DonHangByID,
    DonHangAll,
    UpdateDonHang,
    DeleteDonHang,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # test ok dang ky duoc vot tai khoan hop le
    path("api/account/register/", UserRegisterView.as_view(), name="RegisterAccount"),
    path("api/account/login/", LoginView.as_view(), name="LoginAccount"),
    path("api/account/", UserView.as_view(), name="Account"),
    path("api/account/logout/", LogoutView.as_view(), name="LogoutAccount"),
    # test ok lay duoc tat ca cac account
    path("api/account/all/", AllUserView.as_view(), name="AllAccount"),
    # test ok ID dung va ID sai tra ve dung
    path("api/account/<int:id>/", UserByID.as_view(), name="AccountId"),
    # Test ok
    path(
        "api/account/update/<int:id>/",
        UpdateAccountView.as_view(),
        name="UpdateAccount",
    ),
    # Test delete account voi ID dung va sai hoat dong dung
    path(
        "api/account/delete/<int:id>/",
        DeleteAccountView.as_view(),
        name="DeleteAccount",
    ),
    # Test dang ky dung va sai hoat dong dung
    path(
        "api/customer/register/",
        RegisterCustomerView.as_view(),
        name="CustomerRegister",
    ),
    # Test ok
    path("api/customer/login/", LoginCustomerView.as_view(), name="LoginCustomerView"),
    # Test ok
    path(
        "api/customer/logout/", LogoutCustomerView.as_view(), name="LogoutCustomerView"
    ),
    # Test ok
    path(
        "api/customer/<int:id>/",
        CustomerByID.as_view(),
        name="CustomerByID",
    ),
    # Test ok
    path(
        "api/customer/all/",
        CustomerAll.as_view(),
        name="CustomerAll",
    ),
    # Test ok
    path(
        "api/customer/update/<int:id>/",
        UpdateCustomer.as_view(),
        name="UpdateCustomer",
    ),
    # Test ok
    path(
        "api/customer/delete/<int:id>/",
        DeleteCustomer.as_view(),
        name="DeleteCustomer",
    ),
    # Test ok
    path(
        "api/diemtapket/register/",
        RegisterDiemTapKetView.as_view(),
        name="RegisterDiemTapKetView",
    ),
    # Test ok
    path(
        "api/diemtapket/<int:id>/",
        DiemTapKetByID.as_view(),
        name="DiemTapKetByID",
    ),
    # Test ok
    path(
        "api/diemtapket/all/",
        DiemTapKetAll.as_view(),
        name="DiemTapKetAll",
    ),
    # test ok
    path(
        "api/diemtapket/update/<int:id>/",
        UpdateDiemTapKet.as_view(),
        name="UpdateDiemTapKet",
    ),
    # Test ok
    path(
        "api/diemtapket/delete/<int:id>/",
        DeleteDiemTapKet.as_view(),
        name="DeleteDiemTapKet",
    ),
    # Test ok
    path(
        "api/diemgiaodich/register/",
        RegisterDiemGiaoDichView.as_view(),
        name="RegisterDiemGiaoDichView",
    ),
    # Test ok
    path(
        "api/diemgiaodich/<int:id>/",
        DiemGiaoDichByID.as_view(),
        name="DiemGiaoDichByID",
    ),
    # Test ok
    path(
        "api/diemgiaodich/all/",
        DiemGiaoDichAll.as_view(),
        name="DiemGiaoDichAll",
    ),
    # Test ok
    path(
        "api/diemgiaodich/update/<int:id>/",
        UpdateDiemGiaoDich.as_view(),
        name="UpdateDiemGiaoDich",
    ),
    # test ok
    path(
        "api/diemgiaodich/delete/<int:id>/",
        DeleteDiemGiaoDich.as_view(),
        name="DeleteDiemGiaoDich",
    ),
    # Test ok
    path(
        "api/donhang/register/",
        RegisterDonHang.as_view(),
        name="RegisterDonHang",
    ),
    # Test ok
    path(
        "api/donhang/<int:id>/",
        DonHangByID.as_view(),
        name="DonHangByID",
    ),
    # Test ok
    path(
        "api/donhang/all/",
        DonHangAll.as_view(),
        name="DonHangAll",
    ),
    # Test ok
    path(
        "api/donhang/update/<int:id>/",
        UpdateDonHang.as_view(),
        name="UpdateDonHang",
    ),
    # Test ok
    path(
        "api/donhang/delete/<int:id>/",
        DeleteDonHang.as_view(),
        name="DeleteDonHang",
    ),
]
