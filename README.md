# 🚀 SteadyRise
### *One Platform. All Productivity. Without Limits.*

> **IFest WDC 2026** · Informatics Festival #14 · Universitas Atma Jaya Yogyakarta  
> Theme: *Empowering Students Through Innovative Productivity Tools*

---

## 👥 Tim

| | |
|---|---|
| **Nama Tim** | Treece |
| **Dengan Backend** | Tidak (Frontend Only) |
| **Hosting** | Vercel |

---

## 🌐 Link

| | |
|---|---|
| 🔗 **Live Demo** | *https://steadyrise.vercel.app/* |
| 📁 **Repository** | *https://github.com/aliyyarahma20/Treece_IFEST14_WDC.git* |

---

## 📖 Tentang SteadyRise

**SteadyRise** adalah platform produktivitas all-in-one yang dirancang khusus untuk mahasiswa Indonesia. Nama ini lahir dari dua filosofi sederhana namun kuat:

- **Steady** — Konsisten dan stabil dalam menjalani aktivitas harian
- **Rise** — Terus tumbuh dan berkembang mencapai potensi penuh

Dengan pendekatan desain yang bersih dan intuitif, SteadyRise membantu mahasiswa mengelola tugas, memantau target belajar, dan mendapatkan insight produktivitas bulanan — semuanya dalam satu tempat.

---

## ✨ Fitur Utama

### 1. 📊 Dashboard Produktivitas
Pusat kendali produktivitas harian yang menampilkan informasi real-time dalam satu halaman.
- Stat cards: tugas selesai, prioritas tinggi, streak, jam belajar
- Weekly activity bar chart dengan highlight hari ini
- Mini calendar dengan penanda hari produktif
- Recent tasks dengan toggle selesai langsung dari dashboard
- Target progress dengan progress bar
- **Monthly Wrapped** — rekap bulanan bergaya kartu interaktif yang muncul di 3 hari pertama setiap bulan

### 2. ✅ Task Manager
Manajemen tugas lengkap dengan integrasi Google Calendar.
- Tambah, edit, dan hapus tugas
- Prioritas (Tinggi / Sedang / Rendah) dan kategori (Tugas / Kuliah / Proyek / Pribadi)
- Deadline dengan sinkronisasi otomatis ke **Google Calendar**
- Filter berdasarkan status: Semua / Aktif / Selesai / Belum
- Pencarian tugas real-time
- **Smart Reminder** — sistem pengingat dengan pertanyaan verifikasi untuk memastikan progres pengerjaan

### 3. 🎯 Target & Pomodoro
Kombinasi penetapan target belajar dengan sesi fokus terintegrasi.
- Set target produktivitas: Jam Belajar, Tugas Selesai, Hari Produktif
- Lacak progress dengan progress bar visual
- Status pencapaian: On Track / Hampir Tercapai / Perlu Dikejar / Tercapai
- **Pomodoro Timer** bawaan dengan mode Fokus (25 menit), Istirahat Singkat, dan Istirahat Panjang
- Motivational quotes berubah setiap sesi
- Countdown visual dengan SVG circular timer

### 4. 📈 Monthly Recap
Rekap komprehensif produktivitas bulanan.
- Hero section dengan statistik utama dan persentase peningkatan vs bulan lalu
- Bar chart tugas selesai per minggu
- Perbandingan visual bulan ini vs bulan lalu
- Kalender hari produktif dalam sebulan
- Insight: hari & waktu paling produktif

### 5. 📝 Study Notes (Catatan Belajar)
Sistem pencatatan terstruktur dengan tampilan masonry grid.
- Tambah, edit, dan hapus catatan
- Masonry grid layout yang adaptif
- Tag filter horizontal (scrollable) + custom tag buatan sendiri
- Color coding untuk setiap catatan (3 pilihan warna)
- Pencarian real-time berdasarkan judul dan isi
- Modal detail dengan blur background effect
- Tag tersimpan permanen via localStorage

---

## 🎨 Keunggulan Sistem

| Fitur | Keterangan |
|---|---|
| 🌈 **6 Tema Tampilan** | Morning Mist, Lavender Sky, Rose Petal, Midnight, Blush Dusk, Slate |
| 🌐 **Bilingual** | Bahasa Indonesia & English dengan auto-detect browser language |
| 🔤 **Font Customization** | 6 pilihan font: Outfit, Poppins, Space Grotesk, Lora, Caveat, Nunito |
| 📏 **Text Size Slider** | Ukuran teks 12–20px dengan slider kontinu |
| 📱 **Responsive** | Mendukung desktop, tablet, dan mobile |
| 💾 **Persistent Data** | Semua data tersimpan di localStorage — tidak hilang saat refresh |

---

## 🛠️ Tech Stack

| | |
|---|---|
| **Framework** | React 18 + Vite |
| **Icons** | Lucide React |
| **State Management** | React Context API + useState |
| **Persisten** | localStorage (custom `useLocalStorage` hook) |
| **Styling** | CSS Custom Properties (CSS Variables) |
| **Auth & Calendar** | Google OAuth 2.0 + Google Calendar API (client-side) |
| **Deployment** | Vercel |

---

## 📁 Struktur Fitur

```
src/
├── pages/
│   ├── Dashboard.jsx       # Beranda + Monthly Wrapped
│   ├── TodoPage.jsx        # Task Manager + Smart Reminder
│   ├── TargetPage.jsx      # Target + Pomodoro Timer
│   ├── RecapPage.jsx       # Monthly Recap
│   ├── NotesPage.jsx       # Study Notes
│   └── SettingsPage.jsx    # Pengaturan tampilan
├── components/
│   ├── ui/                 # Komponen reusable (Button, Modal, Card, dll)
│   └── layout/             # Sidebar & Topbar
├── context/
│   ├── ThemeContext.jsx     # Manajemen 6 tema
│   ├── LanguageContext.jsx  # Sistem bilingual EN/ID
│   └── ToastContext.jsx     # Notifikasi toast
└── utils/
    ├── calendarApi.js       # Google Calendar integration
    ├── helpers.js           # Utility functions
    └── translations.js      # String EN/ID
```

---


<div align="center">

**SteadyRise** · Treece · IFest WDC 2026  
*One Platform. All Productivity. Without Limits.*

</div>
