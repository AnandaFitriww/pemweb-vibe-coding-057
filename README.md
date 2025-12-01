# 🌐 ConnectIn — Personal Connection Manager

<img width="1919" height="1045" alt="image" src="https://github.com/user-attachments/assets/9bb6eb06-100d-45bc-a69b-240fa186e3f9" />

**ConnectIn** adalah aplikasi web sederhana untuk mencatat, mengelola, dan mengingat relasi atau kenalan baru. Dibuat sebagai solusi agar kita tidak kehilangan jejak koneksi berharga di masa depan.

---

## 🧐 Latar Belakang Masalah (Problem Statement)
Di dunia perkuliahan dan profesional, kita sering bertemu banyak orang baru dalam waktu singkat (kepanitiaan, seminar, magang). Masalah yang sering terjadi:
1.  **Lupa Detail:** Sering lupa nama lengkap, asal, atau konteks di mana kita bertemu orang tersebut.
2.  **Kontak Tercecer:** Nomor WhatsApp tersimpan, tapi lupa LinkedIn atau Instagram-nya.
3.  **Tidak Terorganisir:** Kontak hanya menumpuk di HP tanpa kategori yang jelas (asal instansi/kota).

## 💡 Solusi (Solution Overview)
**ConnectIn** hadir sebagai *Personal CRM (Customer Relationship Management)* sederhana:
* **Pusat Data:** Menyimpan foto, nama, institusi, asal, dan seluruh akun sosmed (LinkedIn, IG, X, Email) dalam satu kartu profil.
* **Visual:** Menggunakan antarmuka visual (foto profil) agar lebih mudah mengingat wajah, bukan hanya nama.
* **Pencarian Cerdas:** Fitur *Search* dan *Filter* berdasarkan Institusi atau Asal kota untuk memudahkan pencarian kontak lama.

---

## 🛠️ Tech Stack

**Frontend:**
* ⚛️ **React.js + Vite** (Cepat & Modern)
* 🎨 **CSS Variables** (Glassmorphism UI + Dark/Light Mode)
* 🖼️ **Lucide React** (Ikon Modern)

**Backend:**
* 🟢 **Node.js + Express.js** (REST API)
* 🍃 **MongoDB + Mongoose** (Database NoSQL)
* 🔐 **JWT + Bcrypt** (Autentikasi Aman)
* 📤 **Multer** (Upload Foto via Base64)

---

## ✨ Fitur Utama

1.  **Autentikasi User:** Register & Login aman dengan enkripsi password.
2.  **Manajemen Kontak (CRUD):** Tambah, Lihat, Edit, dan Hapus data kenalan.
3.  **Smart Filter & Search:** Cari teman berdasarkan nama, atau filter berdasarkan asal/kampus.
4.  **Upload Foto:** Simpan foto profil kenalan agar lebih mudah diingat.
5.  **Multi-Sosmed:** Simpan link LinkedIn, Instagram, Twitter, Facebook, dan Email.
6.  **Dark Mode:** Tampilan yang nyaman di mata dengan animasi transisi halus.
7.  **Responsive Design:** Tampilan rapi di Laptop maupun HP.

---

## 🚀 Cara Menjalankan Project (Setup Instructions)

Ikuti langkah ini untuk menjalankan proyek di komputer lokal (Localhost).

### 1. Clone Repository
```
git clone [https://github.com/USERNAME_KAMU/connectin-app.git](https://github.com/USERNAME_KAMU/connectin-app.git)
cd connectin-app
```

### 2. Setup Backend (Server)
Masuk ke folder server:
```
cd server
npm install
```
Buat file ".env" di dalam folder server, isi dengan:
```
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/vibe_coding_app
JWT_SECRET=rahasia_negara_ini_bisa_diganti
```
Jalankan server:
```
npx nodemon index.js
```
atau
```
npm run dev
```

### 3. Setup Frontend (Client)
Buka terminal baru (split terminal), masuk ke folder client:
```
cd client
npm install
```
Jalankan client:
```
npm run dev
```

### 4. Buka di Browser
Buka link yang muncul di terminal (biasanya http://localhost:5173).

## 📂 Struktur Folder

```text
vibe-coding-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Header, Modal, ContactDetail
│   │   ├── pages/          # Login, Dashboard, Form, Settings
│   │   └── index.css       # Styling Global
│   └── ...
├── server/                 # Backend Express
│   ├── models/             # Schema Database (User, Contact)
│   ├── index.js            # Logic API & Server
│   └── ...
└── README.md               # Dokumentasi ini
```

## 📸Dokumentasi
1. Login Page: Masuk
  <img width="1919" height="1043" alt="image" src="https://github.com/user-attachments/assets/51ed63ad-1aca-4812-9f0e-b33f90d0ee7b" />
2. Login Page: Daftar
   <img width="1919" height="1043" alt="image" src="https://github.com/user-attachments/assets/4b1c86e1-0455-4b8e-87f1-a6ae4b6220db" />
3. Dashboard Awal
   <img width="1919" height="1041" alt="image" src="https://github.com/user-attachments/assets/2c24dd16-a203-4751-968a-59d4e7855739" />
4. Form Tambah Kenalan
   <img width="1918" height="1044" alt="image" src="https://github.com/user-attachments/assets/065c2f8e-2c91-40b9-946e-2b78efbd01f2" />
5. Dashboard Utama: Light
   <img width="1919" height="1046" alt="image" src="https://github.com/user-attachments/assets/fe3aa8cc-e29e-4aa6-a76c-91a9b63d8b6e" />
6. Dashboard Utama: Dark
   <img width="1919" height="1045" alt="image" src="https://github.com/user-attachments/assets/a6a70207-b5d0-4c88-81d8-c3b838bc776a" />
7. Card Kenalan
   <img width="1919" height="1040" alt="image" src="https://github.com/user-attachments/assets/d1dd7083-32aa-4a1d-b22c-c12786ec7314" />
8. User Setting: Profil (Tahap Pengembangan)
   <img width="1919" height="1041" alt="image" src="https://github.com/user-attachments/assets/589b1028-6315-45ef-9d4e-ec362356d752" />
9. User Setting: Keamanan (Tahap Pengembangan)
    <img width="1919" height="1045" alt="image" src="https://github.com/user-attachments/assets/5436cd19-8361-45f6-828f-0d64a11324c8" />


asadad
