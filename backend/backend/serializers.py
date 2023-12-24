from rest_framework import serializers
from .models import Account, Customer, DonHang, DiemGiaoDich, DiemTapKet


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"
        # fields = [
        #     "username",
        #     "password",
        #     "HoVaTen",
        #     "SoDienThoai",
        #     "email",
        #     "LoaiTaiKhoan",
        # ]
        # extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        # fields = ["username", "password", "HoVaTen", "SoDienThoai", "email"]


class DiemTapKetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiemTapKet
        fields = "__all__"


class DiemGiaoDichSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiemGiaoDich
        fields = "__all__"


class DonHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonHang
        fields = "__all__"
