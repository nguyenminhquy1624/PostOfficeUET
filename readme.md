# 1. Backend

- Cai dat django, postgresql
- Tao databases va tai khoan `admin` va mat khau la `1`
- Database dung beekeeper studio de mo va ket noi
- Cai dat `pip install PyJWT==v1.7.1 `
- Cai dat `pip install django-cors-headers`
- Dang ky model:
```
python3 manage.py makemigrations
python3 manage.py migrate
```
- Chay server: ```python3 manage.py runserver```
- API localhost:
    - POST:  "api/register/" : Duong dan dang ky user khi nguoi dung gui day du cac thong tin, mat khau se duoc ma khoa truoc khi luu. Tra ve thong tin cua account.
    - POST: "api/login/" : Nguoi dung gui username, password sau do se login, jwt se duoc luu tai cookie co thoi han la 60 phut. Tra ve jwt.
    - GET: "api/user/" : Tra ve thong tin cua nguoi dung.
    - POST: "api/logout/" : Xoa cookie tra ve message successfully.
    
# 2. Frontend
