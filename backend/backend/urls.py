from django.contrib import admin
from django.urls import path
from .views import UserRegisterView, LoginView, UserView, LogoutView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/register/", UserRegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/user/", UserView.as_view(), name="user"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
]
