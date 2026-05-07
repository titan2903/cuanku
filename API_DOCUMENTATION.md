# Dokumentasi API Cuanku

## Daftar Isi
1. [Autentikasi](#autentikasi)
2. [Profile Management](#profile-management)
3. [Analitik & Dashboard](#analytics)
4. [Pelacakan Kekayaan Bersih (Net Worth)](#net-worth-tracking)
5. [Manajemen Anggaran (Budget)](#budget-management)
6. [Pelacakan Pemasukan (Income)](#income-tracking)
7. [Pelacakan Pengeluaran (Expense)](#expense-tracking)
8. [Target Finansial (Goals)](#financial-goals)
9. [Laporan (Reports)](#reports)
10. [Metode Pembayaran (Payments)](#metode-pembayaran-payments)

---


Cuanku adalah aplikasi manajemen keuangan yang dirancang untuk membantu pengguna melacak kekayaan bersih (net worth), mengelola anggaran, serta memantau pemasukan dan pengeluaran. API ini mengikuti prinsip RESTful dan mengembalikan data dalam format JSON.

**Base URL:** `http://localhost:8000`

**Autentikasi:** 
Mekanisme autentikasi menggunakan Laravel Sanctum (Bearer Token). Untuk endpoint yang memerlukan autentikasi, sertakan header berikut:
`Authorization: Bearer {token_anda}`

---

## Autentikasi

### POST /login
**Deskripsi:** Melakukan otentikasi user dan mendapatkan session.
**Autentikasi:** Tidak Ada

#### Request Body
**Content-Type:** `application/json`
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Login successful |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Login successful."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

---

### POST /register
**Deskripsi:** Mendaftarkan akun user baru.
**Autentikasi:** Tidak Ada

#### Request Body
**Content-Type:** `application/json`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "password_confirmation": "password",
  "phone_number": "08123456789"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Registration successful |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Registration successful."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password confirmation does not match."]
  }
}
```

---

### POST /logout
**Deskripsi:** Mengakhiri session user dan menghapus token akses.
**Autentikasi:** Wajib

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Logout successful |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Logout successful."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

## Profile Management

### GET /profile
**Deskripsi:** Mendapatkan informasi profil user yang sedang login.
**Autentikasi:** Wajib

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Profile retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Profile retrieved successfully.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone_number": "08123456789"
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

## Analytics

### GET /dashboard
**Deskripsi:** Mendapatkan ringkasan data finansial untuk tampilan dashboard.
**Autentikasi:** Wajib

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Dashboard data retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Dashboard data retrieved successfully.",
  "data": {
    "sum": {
      "total_income": 15000000,
      "total_expense": 8000000,
      "balance": 7000000
    },
    "goals": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Beli Rumah",
        "percentage": 15.5,
        "nominal": 500000000,
        "monthly_saving": 5000000,
        "deadline": "2030-12-31"
      }
    ],
    "incomes": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "date": "2023-10-25",
        "nominal": 10000000,
        "notes": "Gaji Bulanan",
        "budget": {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "detail": "Gaji Utama",
          "type": "Pendapatan"
        }
      }
    ],
    "expenses": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "date": "2023-10-26",
        "nominal": 500000,
        "description": "Belanja Mingguan",
        "payment": {
          "id": "550e8400-e29b-41d4-a716-446655440004",
          "name": "BCA Mobile"
        }
      }
    ]
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

## Net Worth Tracking

### GET /net-worths
**Deskripsi:** Mendapatkan daftar semua rekaman Net Worth user.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| search | string | Query | Tidak | Pencarian berdasarkan detail |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Net Worth retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Net Worth retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "net_worth_goal": 100000000,
      "transaction_per_month": 5000000
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /net-worths
**Deskripsi:** Membuat rekaman Net Worth baru.
**Autentikasi:** Wajib

#### Request Body
**Content-Type:** `application/json`
```json
{
  "net_worth_goal": 100000000,
  "transaction_per_month": 5000000
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Net Worth created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Net Worth created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "net_worth_goal": ["The net worth goal field is required."]
  }
}
```

---

### GET /net-worths/{netWorth}
**Deskripsi:** Mendapatkan detail lengkap dari satu rekaman Net Worth.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Net Worth retrieved successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Net Worth retrieved successfully.",
  "data": {
    "id": "uuid",
    "net_worth_goal": 100000000,
    "transaction_per_month": 5000000
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

---

### PUT /net-worths/{netWorth}
**Deskripsi:** Memperbarui data rekaman Net Worth tertentu.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |

#### Request Body
```json
{
  "net_worth_goal": 150000000,
  "transaction_per_month": 6000000
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Net Worth updated successfully |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Net Worth updated successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "net_worth_goal": ["The net worth goal field is required."]
  }
}
```


---

### DELETE /net-worths/{netWorth}
**Deskripsi:** Menghapus rekaman Net Worth.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Net Worth deleted successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Net Worth deleted successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```


---

### GET /net-worths/{netWorth}/assets
**Deskripsi:** Mendapatkan daftar semua aset untuk Net Worth tertentu.
**Autentikasi:** Wajib

#### Parameter (Path / Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |
| search | string | Query | Tidak | Pencarian aset |
| type | string | Query | Tidak | Filter berdasarkan tipe aset |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Asset retrieved successfully |
| 401 | Unauthorized |
| 404 | Net Worth Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Asset retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "detail": "Rekening BCA",
      "goal": 10000000,
      "type": "Kas"
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

---

### POST /net-worths/{netWorth}/assets
**Deskripsi:** Membuat aset baru untuk Net Worth tertentu.
**Autentikasi:** Wajib

#### Parameters (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |

#### Request Body
**Content-Type:** `application/json`
```json
{
  "detail": "Rekening BCA",
  "goal": 10000000,
  "type": "Kas"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Asset created successfully |
| 401 | Unauthorized |
| 404 | Net Worth Not Found |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Asset created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "detail": ["The detail field is required."]
  }
}
```

---

### GET /net-worths/{netWorth}/liabilities
**Deskripsi:** Mendapatkan daftar semua kewajiban (liabilities) untuk Net Worth tertentu.
**Autentikasi:** Wajib

#### Parameter (Path / Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |
| search | string | Query | Tidak | Pencarian kewajiban |
| type | string | Query | Tidak | Filter berdasarkan tipe kewajiban |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Liability retrieved successfully |
| 401 | Unauthorized |
| 404 | Net Worth Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Liability retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "detail": "Pinjaman Bank",
      "goal": 50000000,
      "type": "Jangka Panjang"
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

---

### POST /net-worths/{netWorth}/liabilities
**Deskripsi:** Membuat kewajiban baru untuk Net Worth tertentu.
**Autentikasi:** Wajib

#### Parameters (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| netWorth | string (uuid) | Path | Ya | ID dari Net Worth |

#### Request Body
**Content-Type:** `application/json`
```json
{
  "detail": "Cicilan Mobil",
  "goal": 200000000,
  "type": "Jangka Panjang"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Liability created successfully |
| 401 | Unauthorized |
| 404 | Net Worth Not Found |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Liability created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model NetWorth."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "detail": ["The detail field is required."]
  }
}
```

---

## Budget Management

### GET /budgets
**Deskripsi:** Mendapatkan daftar semua anggaran (budgets) user.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| search | string | Query | Tidak | Pencarian anggaran |
| month | string | Query | Tidak | Filter bulan |
| year | string | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Budget retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Budget retrieved successfully.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "detail": "Belanja Bulanan",
      "nominal": 2000000,
      "month": "Oktober",
      "year": 2023,
      "type": "Kebutuhan"
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /budgets
**Deskripsi:** Membuat anggaran baru.
**Autentikasi:** Wajib

#### Request Body
**Content-Type:** `application/json`
```json
{
  "detail": "Belanja Bulanan",
  "nominal": 2000000,
  "month": "Oktober",
  "year": 2023,
  "type": "Kebutuhan"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Budget created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Budget created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "detail": ["The detail field is required."]
  }
}
```

---

### PUT /budgets/{budget}
**Deskripsi:** Memperbarui data anggaran tertentu.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| budget | string (uuid) | Path | Ya | ID dari Anggaran |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Budget updated successfully |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Budget updated successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Budget."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "detail": ["The detail field is required."]
  }
}
```


---

### DELETE /budgets/{budget}
**Deskripsi:** Menghapus anggaran.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| budget | string (uuid) | Path | Ya | ID dari Anggaran |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Budget deleted successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Budget deleted successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Budget."
}
```


---

## Income Tracking

### GET /incomes
**Deskripsi:** Mendapatkan daftar semua pemasukan user.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| search | string | Query | Tidak | Pencarian pemasukan |
| month | string | Query | Tidak | Filter bulan |
| year | string | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Income retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Income retrieved successfully.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "date": "2023-10-25",
      "nominal": 10000000,
      "notes": "Gaji Pokok",
      "month": "Oktober",
      "year": 2023,
      "budget": {
        "id": "550e8400-e29b-41d4-a716-446655440002",
        "detail": "Gaji Utama",
        "type": "Pendapatan"
      }
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /incomes
**Deskripsi:** Mencatat pemasukan baru.
**Autentikasi:** Wajib

#### Request Body
**Content-Type:** `application/json`
```json
{
  "budget_id": "uuid",
  "date": "2023-10-25",
  "nominal": 5000000,
  "notes": "Gaji Pokok",
  "month": "Oktober",
  "year": 2023
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Income created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Income created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "budget_id": ["The budget id field is required."]
  }
}
```

---

### PUT /incomes/{income}
**Deskripsi:** Memperbarui data pemasukan tertentu.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| income | string (uuid) | Path | Ya | ID dari Pemasukan |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Income updated successfully |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Income updated successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Income."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "nominal": ["The nominal field is required."]
  }
}
```


---

### DELETE /incomes/{income}
**Deskripsi:** Menghapus data pemasukan.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| income | string (uuid) | Path | Ya | ID dari Pemasukan |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Income deleted successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Income deleted successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Income."
}
```


---

## Expense Tracking

### GET /expenses
**Deskripsi:** Mendapatkan daftar semua pengeluaran user.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| search | string | Query | Tidak | Pencarian pengeluaran |
| month | string | Query | Tidak | Filter bulan |
| year | string | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Expense retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Expense retrieved successfully.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "date": "2023-10-25",
      "nominal": 20000,
      "description": "Beli Nasi Goreng",
      "notes": "Makan malam",
      "month": "Oktober",
      "year": 2023,
      "payment": {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "name": "BCA Mobile"
      }
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /expenses
**Deskripsi:** Mencatat pengeluaran baru.
**Autentikasi:** Wajib

#### Request Body
**Content-Type:** `application/json`
```json
{
  "budget_id": "uuid",
  "payment_id": "uuid",
  "date": "2023-10-25",
  "description": "Beli Nasi Goreng",
  "nominal": 20000,
  "type": "Pengeluaran",
  "notes": "Makan malam",
  "month": "Oktober",
  "year": 2023
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Expense created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Expense created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "description": ["The description field is required."]
  }
}
```

---

### PUT /expenses/{expense}
**Deskripsi:** Memperbarui data pengeluaran tertentu.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| expense | string (uuid) | Path | Ya | ID dari Pengeluaran |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Expense updated successfully |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Expense updated successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Expense."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "description": ["The description field is required."]
  }
}
```


---

### DELETE /expenses/{expense}
**Deskripsi:** Menghapus data pengeluaran.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| expense | string (uuid) | Path | Ya | ID dari Pengeluaran |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Expense deleted successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Expense deleted successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Expense."
}
```


---

## Financial Goals

### GET /goals
**Deskripsi:** Mendapatkan daftar target finansial (goals).
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| search | string | Query | Tidak | Pencarian goal |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Goal retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Goal retrieved successfully.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Beli Rumah",
      "percentage": 15.5,
      "nominal": 500000000,
      "monthly_saving": 5000000,
      "deadline": "2030-12-31"
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /goals
**Deskripsi:** Membuat target finansial baru.
**Autentikasi:** Wajib

#### Request Body
**Content-Type:** `application/json`
```json
{
  "name": "Beli Rumah",
  "nominal": 500000000,
  "monthly_saving": 5000000,
  "deadline": "2030-12-31",
  "beginning_balance": 10000000
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Goal created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Goal created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

---

### PUT /goals/{goal}
**Deskripsi:** Memperbarui data target finansial (goal) tertentu.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| goal | string (uuid) | Path | Ya | ID dari Goal |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Goal updated successfully |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Goal updated successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Goal."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```


---

### DELETE /goals/{goal}
**Deskripsi:** Menghapus data target finansial.
**Autentikasi:** Wajib

#### Parameter (Path)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| goal | string (uuid) | Path | Ya | ID dari Goal |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Goal deleted successfully |
| 401 | Unauthorized |
| 404 | Not Found |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Goal deleted successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (404 Not Found):**
```json
{
  "status": "error",
  "message": "No query results for model Goal."
}
```


---

## Reports

### GET /report-trackings
**Deskripsi:** Mendapatkan laporan tracking bulanan.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| month | string | Query | Tidak | Filter bulan |
| year | integer | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Tracking report retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Tracking report retrieved successfully.",
  "data": {
    "reports": {
      "total_income": 15000000,
      "total_expense": 8000000,
      "saving": 7000000
    },
    "incomeTrackers": [
      { "category": "Gaji", "amount": 10000000 },
      { "category": "Bonus", "amount": 5000000 }
    ],
    "expenseTrackers": [
      { "category": "Makan", "amount": 2000000 },
      { "category": "Transport", "amount": 1000000 }
    ]
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### GET /report-trackings/download
**Deskripsi:** Mengunduh laporan tracking bulanan dalam format PDF.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| month | string | Query | Tidak | Filter bulan |
| year | integer | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | File PDF berhasil diunduh |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Report tracking downloaded successfully.",
  "data": {
    "url": "/path/to/file.pdf"
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```


---

### GET /annual-reports
**Deskripsi:** Mendapatkan laporan finansial tahunan.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| year | integer | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Annual report retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Annual report retrieved successfully.",
  "data": {
    "annuals": {
      "january": { "income": 10000000, "expense": 5000000 },
      "february": { "income": 12000000, "expense": 6000000 },
      "march": { "income": 11000000, "expense": 5500000 }
    }
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### GET /annual-reports/download
**Deskripsi:** Mengunduh laporan tahunan dalam format PDF.
**Autentikasi:** Wajib

#### Parameters (Query)
| Nama | Tipe | Lokasi | Wajib | Deskripsi |
|---|---|---|---|---|
| year | integer | Query | Tidak | Filter tahun |

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | File PDF berhasil diunduh |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Report annual downloaded successfully.",
  "data": {
    "url": "/path/to/file.pdf"
  }
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```


---

## Metode Pembayaran (Payments)

### GET /payments
**Deskripsi:** Mendapatkan daftar metode pembayaran yang tersedia.
**Autentikasi:** Wajib

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 200 | Payment method retrieved successfully |
| 401 | Unauthorized |

**Contoh Respon (200 OK):**
```json
{
  "status": "success",
  "message": "Payment method retrieved successfully.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "name": "BCA Mobile",
      "type": "Bank Transfer",
      "account_number": "1234567890",
      "account_owner": "John Doe"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440005",
      "name": "Cash",
      "type": "Tunai"
    }
  ]
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

---

### POST /payments
**Deskripsi:** Menambahkan metode pembayaran baru.
**Autentikasi:** Wajib

#### Request Body
```json
{
  "name": "BCA Mobile",
  "type": "Bank Transfer",
  "account_number": "1234567890",
  "account_owner": "John Doe"
}
```

#### Respon
| Kode Status | Deskripsi |
|---|---|
| 201 | Payment method created successfully |
| 401 | Unauthorized |
| 422 | Validation Error |

**Contoh Respon (201 Created):**
```json
{
  "status": "success",
  "message": "Payment method created successfully."
}
```

**Contoh Respon (401 Unauthorized):**
```json
{
  "status": "error",
  "message": "Unauthenticated."
}
```

**Contoh Respon (422 Validation Error):**
```json
{
  "status": "error",
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```


---
