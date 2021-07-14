# Dokumentasi Warta API

Berikut ini adalah dokumentasi dari warta API. API ini dibuat dengan node.js dan database mySQL dengan library yang digunakan sebagai berikut:
1. Express
2. jsonwebtoken
3. mysql
4. express-bearer-token
5. cors
6. nodemailer


## User API
User api merupakan API yang berhubungan dengan user

### 1. register
API yang digubakan untuk user melakukan register

### HTTP Request 
```json
POST http://purwadhikafs3.com:8021/users/register
```

### Request Body
Data input berupa JSON dari request body  yang terdiri dari username, password, dan email

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| username      | required	| `username` dari user yang akan melakukan register |
| password      | required      | `password` dari user yang melakukan register. Selanjutnya password akan dienkripsi oleh Crypto  |
| email         | required      | `email` dari user yang akan melakukan register|

### Contoh:
```json
{
	"username": "upin",
	"password":"1234",
	"email":"upin@mail.com"
}
```

Selain itu, user yang registrasi juga akan mendapatkan `OTP`. OTP akan dikirimkan oleh node mailer ke email masing-masing user untuk melakukan verifikasi

### Result
### a. Jika berhasil registrasi
Respon status: `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| success       | true          |
| Message	| Register Success|

### Contoh:

```json
{
	"success": "true",
	"message":"Register Success"
}
```

### b. Jika tidak berhasil 
Respon status: `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

### 2. getUser
API yang digunakan untuk mendapatkan seluruh user yang ada. 

### HTTP Request 
```json
GET http://purwadhikafs3.com:8021/users/get-all
```

### Request Query
Menggunakan request query untuk mendapatkan user pada kondisi tertentu

| Req.Query     | Deskripsi     |
| ------------- |:-------------:|
| iduser        | Get berdasarkan iduser|
| username	| Get berdasarkan username|
| email		| Get berdasarkan email |
| idstatus	| Get berdasarkan status, idstatus 1 = verified, 2 = unverified

### Contoh

GET berdasarkan username `Ipin`
```json
GET http://purwadhikafs3.com:8021/users/get-all?username=ipin
```

GET berdasarkan username `Ipin` dan idstatus `1` (verified)
```json
GET http://purwadhikafs3.com:8021/users/get-all?username=ipin&idstatus=1
```

### Result
### a. Jika Berhasil Get User
Respon status: `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| iduser        | Menampilkan iduser di database |
| username	| Menampilkan username user dari database|
| email		| Menampilkan email user dari database|
| role		| Menampilkan role user dari database |

#### Contoh:
```json
{
	"iduser": "10",
	"username":"ipindurian",
	"email":"ipin@mail.com",
	"role":"user",
	"idstatus":"1"
}
```

#### b. Jika tidak berhasil 
Respon status: `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

### 2. login
Login baru dapat dilakukan setelah user melakukan verifikasi


#### HTTP Request 
```json
POST http://purwadhikafs3.com:8021/users/login
```

#### Request Body
Data input berupa request body yang terdiri dari email dan password

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| email         | required	| `email` dari user yang akan melakukan login dan sudah terverifikasi (idstatus = 1) |
| password	| required 	| `password` dari user yang akan melakukan login|

#### Contoh:
```json
{
	"email":"upin@mail.com",
	"password":"1234"
}
```

Selain itu, user akan dibuatkan token oleh createToken jsonwebtoken

### Result:
### a. Jika berhasil login
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| iduser        | Menampilkan iduser dari user yang login |
| username	| Menampilkan username dari  user yang login |
| email		| Menampilkan email dari user yang login |
| role 		| Menampilkan role dari user yang login |
| token 	| Menampilkan token yang dibuat	|

#### Contoh:

```json
{
	"iduser": "10",
	"username":"ipindurian",
	"email":"ipin@mail.com",
	"role":"user",
	"idstatus":"1",
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjUsInVzZXJuYW1lIjoiYWxseXNhcmgiLCJlbWFpbCI6ImFsbHlzYS5yYWhhZ3VzdGlhbmlAZ2"
}
```

### b. Jika tidak berhasil login
Respon status: `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

### 3. keepLogin
Keep login merupakan API untuk tetap login walaupun page front end di refresh

#### HTTP Request 
```json
POST http://purwadhikafs3.com:8021/users/keeplogin
```

#### Request User
Request user merupakan hasil decode token. Sehingga input berupa header token.

#### Contoh: 
``` json
headers: {
          "Authorization": "`Bearer ${token}`"
        }
```

Pada keep login token akan dibuat ulang

### Result
### a. Jika berhasil keep login
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| iduser        | Menampilkan iduser dari user yang login |
| username	| Menampilkan username dari  user yang login |
| email		| Menampilkan email dari user yang login |
| role 		| Menampilkan role dari user yang login |
| token 	| Menampilkan token yang dibuat	|

#### Contoh:

```json
{
	"iduser": "10",
	"username":"ipindurian",
	"email":"ipin@mail.com",
	"role":"user",
	"idstatus":"1",
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjUsInVzZXJuYW1lIjoiYWxseXNhcmgiLCJlbWFpbCI6ImFsbHlzYS5yYWhhZ3VzdGlhbmlAZ2"
}
```

### b. Jika tidak berhasil keep login
Respon status: `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

### 4. verified
Verified merupakan proses verifikasi user yang register.

### HTTP Request
```json
PATCH http://purwadhikafs3.com:8021/users/verified
```

### Request User
Request user didapatkan dari token. Sehingga input berupa headers token.
User akan mendapatkan link ke email user yang di email menggunakan nodemailer.

### Contoh:
``` json
headers: {
          "Authorization": "`Bearer ${token}`"
        }
```

### Result:
### a. Jika berhasil verifikasi
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| success       | true          |
| messages	| Verification Success |

### Contoh:
``` json
{
	"success": true,
	"messages": "Verification Success"
}
```

### b. Jika gagal verifikasi
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

### 5. reVerified
Verifikasi ulang

### HTTP Request
```json
PATCH http://purwadhikafs3.com:8021/users/reverified
```

### Request Body
Data input berupa request body berupa email dan password

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| email         | required	| `email` dari user yang akan melakukan verifikasi ulang |
| password	| required 	| `password` dari user yang akan melakukan verifikasi ulang|

### Contoh

``` json
{
	"email": "ipin@mail.com",
	"password": "1234"
}
```

Nodemailer akan mengirimkan email verifikasi kembali ke email user.

### Result
### a. Jika berhasil verifikasi ulang
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| success       | true          |
| messages	| Verification Success, Check your email |

### Contoh:
``` json
{
	"success": true,
	"messages": "Verification Success, Check Your Email"
}
```

### b. Jika gagal verifikasi ulang
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
			"code": "ER_BAD_FIELD_ERROR",
    			"errno": 1054,
    			"sqlMessage": "Unknown column 'usernam' in 'where clause'",
    			"sqlState": "42S22",
    			"index": 0,
    			"sql": "Select * from user where usernam='hoho';"
		}
}
```

## News API
News API merupakan API yang berhubungan dengan news

### 1. addNews
API yang digunakan untuk menambahkan berita

### HTTP Request 
``` 
POST http://purwadhikafs3.com:8021/news/add
```

### Request Body 
Data ipnut berupa data JSON dari request body

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| judul	        | required	| `judul` dari berita yang akan diinput |
| deskripsi     | required      | `deskripsi` atau isi dari berita yang akan diinput |
| kategori      | required      | `kategori` dari berita yang akan diinput|
| images	| required	| link `images` dari berita yang akan diinput|
| author	| required	| `author` atau penulis dari berita yang akan diinput|

### Contoh: 

``` json
{
	"judul": "Rumah Sakit Kekurangan Oksigen",
	"deskripsi": "Lorem ipsum....",
	"kategori": "Kesehatan",
	"images": "https://...",
	"author":"Ipin"
}
```

### Result
### a. Jika berhasil add
| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| success       | Success Add News  |
| results	| Pesan dari server MySQL |

### Contoh:
``` json
{
	"success":"Success Add News",
	"results: {
    			"fieldCount": 0,
    			"affectedRows": 1,
    			"insertId": 25,
    			"serverStatus": 2,
    			"warningCount": 0,
    			"message": "",
    			"protocol41": true,
    			"changedRows": 0
  		}
}
```

### b. Jika gagal add
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
	"status": "Error My SQL",
	"message": {
    			"expose": true,
    			"statusCode": 400,
    			"status": 400,
    			"body": "{\r\n\t\"judul\": \"Rumah Sakit Kekurangan Oksigen\",\r\n\t\"deskripsi\": \"Lorem ipsum....\",\r\n\t\"kategori\": \"Kesehatan\",\r\n\t\"images\": \"https://...\",\r\n\t\"author\":\"Ipin\",\r\n}",
    			"type": "entity.parse.failed"
  		   }
}
```

### 2. getNews
API untuk mendapatkan berita

### HTTP Request
``` 
GET http://purwadhikafs3.com:8021/news/get-news
```

### Request Query
Menggunakan request query untuk mendapatkan news pada kondisi tertentu

| Req.Query     | Deskripsi     |
| ------------- |:-------------:|
| judul         | Get berdasarkan `judul` |
| deskripsi	| Get berdasarkan `deskripsi`|
| kategori	| Get berdasarkan `kategori` |
| author	| Get berdasarkan `author` |


### Contoh

GET berdasarkan kategori `Kesehatan`
```json
GET http://purwadhikafs3.com:8021/users/get-all?kategori=Kesehatan
```

GET berdasarkan kategori `Kesehatan` dan author `Ipin` 
```json
GET http://purwadhikafs3.com:8021/users/get-all?kategori=Kesehatan&author=Ipin
```

### Results
### a. Jika berhasil get
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| date		| Menampilkan tanggal dibuatnya news|
| judul         | Menampilkan judul news |
| deskripsi	| Menampilkan deskripsi news|
| kategori	| Menampilkan kategori news |
| images	| Menampilkan link image news |
| author	| Menampilkan author dari news |
| view		| Menampilkan view dari news |
| comment	| Menampilkan comment dari news |

#### Isi komentar
| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| idkomentar	| Menampilkan idkomentar|
| idnews        | Menampilkan idnews |
| komentar	| Menampilkan isi komentar|
| iduser	| Menampilkan iduser yang memberikan komentar |

### Contoh:
```json
{
    "idnews": 15,
    "date": "2021-06-27T23:29:01.000Z",
    "judul": "279 Juta Data Penduduk Indonesia Bocor, Tim Periksa Data Akan Gugat Tiga Lembaga",
    "deskripsi": "Tim Periksa Data akan melaporkan tiga lembaga terkait dugaan kebocoran 279 juta data penduduk Indonesia....",
    "kategori": "Teknologi",
    "images": "https://cdn1-production-images-kly.akamaized.net/swkbl9d4OeNiGNs5imqKlaf4OJc=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3485540/original/092478200_1623925252-periksa_datass.jpg",
    "author": "Arief Rahman Hakim",
    "view": 3,
    "comment": [
      {
        "idkomentar": 1,
        "idnews": 15,
        "komentar": "Tindakan yang bagus",
        "iduser": 5
      }
    ]
  }
```

### b. Jika gagal get
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
  "status": "Error My SQL",
  "messages": {
    "code": "ER_BAD_FIELD_ERROR",
    "errno": 1054,
    "sqlMessage": "Unknown column 'utho' in 'where clause'",
    "sqlState": "42S22",
    "index": 0,
    "sql": "Select * from news where utho='Ipin';"
  }
}
```

### 3. updateNews
API untuk mengupdate news

### HTTP Request
``` json
PATCH http://purwadhikafs3.com:8021/news/update
```

### Request Body

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| idnews        | required	| `idnews` dari berita yang akan di-update |
| judul		| required	| `judul` berita yang ingin diupdate |
| deskripsi     | required      | `deskripsi` atau isi dari berita yang ingin diupdate |
| kategori      | required      | `kategori` dari berita yang ingin diupdate|
| images	| required	| Link `images` yang ingin diupdate |

### Contoh:
``` json
{
 "idnews": 1,
 "judul":"Macet menuju lebaran di ruas tol Cikampek",
 "deskripsi":"Lorem ipsum...",
 "kategori":"Transportasi",
 "images":"http://..."
}
```

### Results
### a. Jika update berhasil
| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Success update news✅  |
| results	| Pesan error dari server|

### Contoh:
``` json
{
  "status": "Success Update News ✅",
  "results": "Update news set judul = 'Macet menuju lebaran di ruas tol Cikampek', deskripsi = 'Lorem ipsum...',\n            kategori = 'Transportasi', images = 'http://...' where idnews=24;"
}
```

### b. Jika update gagal
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
  "status": "Error My SQL",
  "messages": {
    "code": "ER_BAD_FIELD_ERROR",
    "errno": 1054,
    "sqlMessage": "Unknown column 'utho' in 'where clause'",
    "sqlState": "42S22",
    "index": 0,
    "sql": "Select * from news where utho='Ipin';"
  }
}
```

### 4. Delete News
API untuk menghapus berita

### HTTP Request
``` json
PATCH http://purwadhikafs3.com:8021/news/delete/:id
```

### Request Params

| Req.params    |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| idnews        | required	| `idnews` dari berita yang akan di-delete |

### Contoh
``` json
PATCH http://purwadhikafs3.com:8021/news/delete/24
```

### Result
### a. Jika delete berhasil
Respon status `200` "Delete news success✅"

### b. Jika delete tidak berhasil
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
  "status": "Error My SQL",
  "messages": {
    "code": "ER_BAD_FIELD_ERROR",
    "errno": 1054,
    "sqlMessage": "Unknown column 'utho' in 'where clause'",
    "sqlState": "42S22",
    "index": 0,
    "sql": "Select * from news where utho='Ipin';"
  }
}
```

### 5.updateView
API untuk mengupdate view

### HTTP Request
``` json
PATCH http://purwadhikafs3.com:8021/news/update-view/24
```

### Request Body
Input berupa request body yang terdiri dari idnews dan view


| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| idnews        | required	| `idnews` dari berita yang akan di-update view nya |
| view 		| required	| `view` berita saat sudah di-update |

### Contoh:
```json
{
  "idnews":24,
  "view":20
}
```
### Result
### a. Jika berhasil update view
Respon status `200` "Update view success✅"

### b. Jika tidak berhasil update view
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
  "status": "Error My SQL",
  "messages": {
    "code": "ER_BAD_FIELD_ERROR",
    "errno": 1054,
    "sqlMessage": "Unknown column 'utho' in 'where clause'",
    "sqlState": "42S22",
    "index": 0,
    "sql": "Select * from news where utho='Ipin';"
  }
}
```

### 6. addKomentar
API untuk menambahkan komentar

### HTTP Request
``` json
PATCH http://purwadhikafs3.com:8021/news/add-komentar
```

### Request Body
Input berupa request body yang terdiei dari idnews, komentar dan iduser

| Req.body      |               | Deskripsi    |
| ------------- |:-------------:| -------------|
| idnews        | required	| `idnews` dari berita yang akan ditambahkan komentarnya |
| komentar	| required	| isi dari `komentar` berita |
| iduser	| requires	| `iduser` yang memberikan komentar |

### Contoh:
``` json
{
  "idnews":24,
  "komentar":"lorem ipsum...",
  "iduser":2
}
```

### Result
### a. Jika menambahkan komentar berhasil
Respon status `200`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Success Add Komentar ✅  |
| Message	| Pesan berhasil dari server |

### Contoh:
``` json
{
  "status": "Success Add Komentar ✅",
  "results": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 6,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
}
```

### b. Jika menambahkan komentar tidak berhasil
Respon status `500`

| Parameter     | Deskripsi     |
| ------------- |:-------------:|
| status        | Error My SQL  |
| Message	| Pesan error dari server|

### Contoh:
```json
{
  "status": "Error My SQL",
  "messages": {
    "code": "ER_BAD_FIELD_ERROR",
    "errno": 1054,
    "sqlMessage": "Unknown column 'utho' in 'where clause'",
    "sqlState": "42S22",
    "index": 0,
    "sql": "Select * from news where utho='Ipin';"
  }
}
```

### 7. getKomentar
API untuk mendapatkan komentar

### HTTP Request
``` json
PATCH http://purwadhikafs3.com:8021/news/get-komentar
```

### Request Query

 Req.Query      | Deskripsi     |
| ------------- |:-------------:|
| idkomentar    | Get berdasarkan `idkomentar` |
| idnews	| Get berdasarkan `idnews`|
| username	| Get berdasarkan `username` |


### Contoh

GET berdasarkan username `Ipin`
```json
GET http://purwadhikafs3.com:8021/users/get-all?username=Ipin
```

GET berdasarkan idnews `2` dan username `Ipin` 
```json
GET http://purwadhikafs3.com:8021/users/get-all?idnews=2&username=Ipin
```