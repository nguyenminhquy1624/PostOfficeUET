from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from .serializers import (
    UserSerializer,
    CustomerSerializer,
    DiemTapKetSerializer,
    DiemGiaoDichSerializer,
    DonHangSerializer,
)
from .models import Account, Customer, DiemTapKet, DiemGiaoDich, DonHang
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
import jwt, datetime


# Account user register, login, logout , authentication


# Dang Ky Tai Khoan
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Chuc nang Login voi authentication
class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]

        user = Account.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed("User not found")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, "secret", algorithm="HS256").decode("utf-8")

        response = Response()

        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"jwt": token}
        return response


# Lay ra user tai khoan hien tai
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("Unauthenticated token")
        try:
            payload = jwt.decode(token, "secret", algorithm=["HS256"])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")

        user = Account.objects.filter(id=payload["id"]).first()

        serializer = UserSerializer(user)

        return Response(serializer.data)


# Lay ra tat ca cac user
class AllUserView(APIView):
    def get(self, request, *args, **kwargs):
        users = Account.objects.all()

        serializer = UserSerializer(users, many=True)

        return Response({"users": serializer.data})


# Lay 1 user boi id
class UserByID(APIView):
    def get(sefl, request, id, *args, **kwargs):
        try:
            user = get_object_or_404(Account, pk=id)
            serializer = UserSerializer(user)
            return Response({"account": serializer.data}, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


# Chuc nang logout
class LogoutView(APIView):
    def post(self, request):
        respone = Response()
        respone.delete_cookie("jwt")
        respone.data = {"message": "Successfully"}
        return respone


# Chuc nang sua tai khoan
class UpdateAccountView(APIView):
    def put(self, request, id):
        try:
            account = Account.objects.get(pk=id)
            serializer = UserSerializer(account, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            return Respone(
                {"message": "Account not found"}, status=status.HTTP_404_NOT_FOUND
            )


# Chuc nang xoa tai khoan
class DeleteAccountView(APIView):
    def delete(self, request, id):
        try:
            account = Account.objects.get(pk=id)
            account.delete()
            return Response({"message": "Delete Account successfully"})
        except Account.DoesNotExist:
            return Respone(
                {"message": "Account not found"}, status=status.HTTP_404_NOT_FOUND
            )


## Customer


# Dang ky tai khoan
class RegisterCustomerView(APIView):
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Lay tat ca cac tai khoan
class CustomerAll(APIView):
    def get(self, request):
        customer = Customer.objects.all()
        serializer = CustomerSerializer(customer, many=True)
        return Response({"customer": serializer.data})


# Lay tai khoan theo PK
class CustomerByID(APIView):
    def get(self, request, id):
        try:
            customer = get_object_or_404(Customer, pk=id)
            serializer = CustomerSerializer(customer)
            return Response({"customer": serializer.data})
        except Customer.DoesNotExist:
            return Response(
                {"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
            )


class UpdateCustomer(APIView):
    def put(self, request, id):
        try:
            customer = Customer.objects.get(pk=id)
            serializer = CustomerSerializer(customer, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Customer.DoesNotExist:
            return Response(
                {"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DeleteCustomer(APIView):
    def delete(self, request, id):
        try:
            customer = Customer.objects.get(pk=id)
            customer.delete()
            return Response({"message": "Delete customer successfully"})
        except Customer.DoesNotExist:
            return Respone(
                {"message": "Account not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RegisterDiemTapKetView(APIView):
    def post(self, request):
        serializer = DiemTapKetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Respone(serializer.data)


class DiemTapKetByID(APIView):
    def get(self, request):
        try:
            diemtapket = get_object_or_404(DiemTapKet, pk=id)
            serializer = DiemTapKetSerializer(diemtapket)
            return Response({"DiemTapKet": serializer.data})
        except DiemTapKet.DoesNotExist:
            return Response(
                {"message": "Diem Tap Ket not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DiemTapKetAll(APIView):
    def get(self, request):
        try:
            diemtapket = DiemTapKet.objects.all()
            serializers = DiemTapKetSerializer(diemtapket, many=True)
            return Response({"Diem Tap Ket": serializers.data})
        except DiemTapKet.DoesNotExist:
            return Response(
                {"message": "Diem Tap Ket not found"}, status=status.HTTP_404_NOT_FOUND
            )


class UpdateDiemTapKet(APIView):
    def put(self, request, id):
        try:
            diemtapket = DiemTapKet.objects.get(pk=id)
            serializer = DiemTapKetSerializer(diemtapket, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Update Diem Tap Ket successfully"})
            return Response({"message": "Not Update Diem Tap Ket"})

        except DiemTapKet.DoesNotExist:
            return Response(
                {"message": "Diem Tap Ket not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DeleteDiemTapKet(APIView):
    def delete(self, request, id):
        try:
            diemtapket = DiemTapKet.objects.get(pk=id)
            diemtapket.delete()
            return Response({"message": "Deleted Diem Tap Ket successfully"})
        except DiemTapKet.DoesNotExist:
            return Response(
                {"message": "Diem Tap Ket not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RegisterDiemGiaoDichView(APIView):
    def post(self, request):
        serializer = DiemGiaoDich(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Respone(serializer.data)


class DiemGiaoDichByID(APIView):
    def get(self, request):
        try:
            diemgiaodich = get_object_or_404(DiemTapKet, pk=id)
            serializer = DiemGiaoDichSerializer(diemgiaodich)
            return Response({"DiemGiaoDich": serializer.data})
        except DiemGiaoDich.DoesNotExist:
            return Response(
                {"message": "Diem Giao Dich not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class DiemGiaoDichAll(APIView):
    def get(self, request):
        try:
            diemgiaodich = DiemGiaoDich.objects.all()
            serializers = DiemGiaoDichSerializer(diemgiaodich, many=True)
            return Response({"Diem Giao Dich": serializers.data})
        except DiemGiaoDich.DoesNotExist:
            return Response(
                {"message": "Diem Giao Dich not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UpdateDiemGiaoDich(APIView):
    def put(self, request, id):
        try:
            diemgiaodich = DiemGiaoDich.objects.get(pk=id)
            serializer = DiemGiaoDichSerializer(diemgiaodich, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Update Diem Giao Dich successfully"})
            return Response({"message": "Not Update Diem Giao Dich"})

        except DiemGiaoDich.DoesNotExist:
            return Response(
                {"message": "Diem Giao Dich not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class DeleteDiemGiaoDich(APIView):
    def delete(self, request, id):
        try:
            diemgiaodich = DiemGiaoDich.objects.get(pk=id)
            diemgiaodich.delete()
            return Response({"message": "Deleted Diem Giao Dich successfully"})
        except DiemGiaoDich.DoesNotExist:
            return Response(
                {"message": "Diem Giao Dich not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class RegisterDonHang(APIView):
    def post(self, request):
        serializer = DonHangSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Respone(serializer.data)


class DonHangByID(APIView):
    def get(self, request):
        try:
            donhang = get_object_or_404(DiemTapKet, pk=id)
            serializer = DonHangSerializer(donhang)
            return Response({"DiemTapKet": serializer.data})
        except DonHang.DoesNotExist:
            return Response(
                {"message": "Don Hang not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DonHangAll(APIView):
    def get(self, request):
        try:
            donhang = DonHang.objects.all()
            serializers = DonHangSerializer(donhang, many=True)
            return Response({"Don Hang": serializers.data})
        except DonHang.DoesNotExist:
            return Response(
                {"message": "Don Hang not found"}, status=status.HTTP_404_NOT_FOUND
            )


class UpdateDonHang(APIView):
    def put(self, request, id):
        try:
            donhang = DonHang.objects.get(pk=id)
            serializer = DonHangSerializer(donhang, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Update Don Hang successfully"})
            return Response({"message": "Not Update Don Hang"})

        except DonHang.DoesNotExist:
            return Response(
                {"message": "Don Hang not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DeleteDonHang(APIView):
    def delete(self, request, id):
        try:
            donhang = DonHang.objects.get(pk=id)
            donhang.delete()
            return Response({"message": "Deleted Don Hang successfully"})
        except DonHang.DoesNotExist:
            return Response(
                {"message": "Don Hang not found"}, status=status.HTTP_404_NOT_FOUND
            )
