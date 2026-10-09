# TikCleanPro - Pengunduh Video TikTok Tanpa Watermark

Aplikasi web fullstack modern berbasis **TypeScript** dan **Express** untuk mengunduh video TikTok berkualitas tinggi tanpa watermark secara cepat, disertai pratinjau instan dan audio extractor.

---

## ✨ Fitur Utama

- **Tanpa Watermark**: Mengambil sumber CDN resolusi penuh bebas watermark.
- **Audio Extractor**: Opsi mengunduh format MP3/audio asli video.
- **Built-in Video Player**: Tonton langsung preview video sebelum mengunduh.
- **Proxy Stream Downloader**: Mengatasi masalah blokir CORS langsung dari browser saat proses download file `.mp4`.
- **UI Bersih & Responsif**: Dibangun dengan TailwindCSS, ramah perangkat mobile dan desktop.
- **Validasi Ketat**: Validasi masukan menggunakan skema Zod.

---

## 🛠️ Tech Stack

- **Runtime & Bahasa**: Node.js & TypeScript
- **Backend Framework**: Express.js
- **HTTP Client**: Axios
- **Schema Validation**: Zod
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, TailwindCSS (CDN)

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Clone Repositori
```bash
git clone https://github.com/username/tiktok-clean-downloader.git
cd tiktok-clean-downloader
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan
Salin berkas konfigurasi default:
```bash
cp .env.example .env
```

### 4. Jalankan Aplikasi

**Mode Pengembangan:**
```bash
npm run dev
```

**Mode Produksi:**
```bash
npm run build
npm start
```

Buka peramban Anda di `http://localhost:3000`.

---

## 📁 Struktur Direktori

```text
├── public/
│   ├── index.html       # Antarmuka web utama
│   └── app.js           # Client-side controller
├── src/
│   ├── services/
│   │   └── tiktokService.ts # Layanan ekstraksi metadata TikTok
│   └── server.ts        # Express API & Server Entry
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).