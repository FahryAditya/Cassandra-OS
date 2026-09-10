# 🛸 CassandraOS v3.4.0-LTS — Cybernetic Web Operating System

CassandraOS adalah sistem operasi berbasis web modern dengan estetika **futuristik glassmorphic cybernetic**, dibangun menggunakan **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, dan **Material Symbols Outlined**.

Seluruh desain dari 20 modul UI/UX HTML telah dikonversi dan dipisahkan menjadi komponen modular bertipe TypeScript yang bersih, teruji, dan bebas dari error kompilasi.

---

## 📁 Stuktur Folder & Arsitektur Modul

Setiap komponen UI terorganisir rapi di dalam foldernya masing-masing untuk kemudahan pemeliharaan (*maintainability*):

```text
cassandraos/
├── src/
│   ├── components/
│   │   ├── AppLauncher/
│   │   │   └── AppLauncher.tsx              # Modul 01: Application Launcher & Grid
│   │   ├── SystemSearch/
│   │   │   └── SystemSearch.tsx             # Modul 02: Omni System Search Modal
│   │   ├── FileManager/
│   │   │   └── FileManager.tsx              # Modul 03: File Explorer & Storage Vault
│   │   ├── Settings/
│   │   │   └── Settings.tsx                 # Modul 04: System Configuration Settings
│   │   ├── ControlCenter/
│   │   │   └── ControlCenter.tsx            # Modul 05: Quick Toggles Control Center
│   │   ├── NotificationCenter/
│   │   │   └── NotificationCenter.tsx       # Modul 06: System & Security Notifications
│   │   ├── LockScreen/
│   │   │   └── LockScreen.tsx               # Modul 07: Security Lock Screen Overlay
│   │   ├── PowerMenu/
│   │   │   └── PowerMenu.tsx                # Modul 08: Power & Session Management
│   │   ├── Terminal/
│   │   │   └── Terminal.tsx                 # Modul 09: Interactive Command Line Terminal
│   │   ├── SystemMonitor/
│   │   │   └── SystemMonitor.tsx            # Modul 10: Resource & Telemetry Monitor
│   │   ├── TextEditor/
│   │   │   └── TextEditor.tsx               # Modul 11: Code & Text Editor Studio
│   │   ├── Calculator/
│   │   │   └── Calculator.tsx               # Modul 12: Scientific Calculator
│   │   ├── SoftwareCenter/
│   │   │   └── SoftwareCenter.tsx           # Modul 13: App Marketplace & Store
│   │   ├── UserProfile/
│   │   │   └── UserProfile.tsx              # Modul 14: Account & Security Profile
│   │   ├── Personalization/
│   │   │   └── Personalization.tsx          # Modul 15: Theme & Wallpaper Customizer
│   │   ├── ContextMenu/
│   │   │   └── ContextMenu.tsx              # Modul 16: Desktop Right-Click Context Menu
│   │   ├── SystemTray/
│   │   │   └── SystemTray.tsx               # Modul 17: Hardware & Connectivity Tray
│   │   ├── WorkspaceSwitcher/
│   │   │   └── WorkspaceSwitcher.tsx        # Modul 18: Spatial Mission Control Overview
│   │   ├── DiskEnclave/
│   │   │   └── DiskEnclave.tsx              # Modul 19: LUKS2 Cryptographic Vault Manager
│   │   ├── NetworkMesh/
│   │   │   └── NetworkMesh.tsx              # Modul 20: eBPF Packet Filter & VPN Shield
│   │   ├── Header/
│   │   │   └── Header.tsx                   # Top Status Bar & Navigation
│   │   └── Sidebar/
│   │       └── Sidebar.tsx                  # Workspace Dock & Active Utilities
│   ├── types/
│   │   └── os.ts                            # TypeScript Interfaces & WindowId Types
│   ├── App.tsx                              # Main Desktop Shell & Window Manager
│   ├── main.tsx                             # Application Entry Point
│   └── index.css                            # Core Design System Tokens & Font Imports
├── index.html                               # Material Symbols & Google Fonts CDN
└── package.json
```

---

## 🛠️ Daftar Modul & Fitur yang Telah Dibuat (1 - 20)

| No | Nama Modul | Path Komponen | Deskripsi Fitur Utama |
|---|---|---|---|
| **01** | **AppLauncher** | [`AppLauncher.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AppLauncher/AppLauncher.tsx) | Panel peluncur aplikasi melayang dengan kategori sistem, *pinned apps*, dan pencarian cepat. |
| **02** | **SystemSearch** | [`SystemSearch.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemSearch/SystemSearch.tsx) | Dialog pencarian global omni (*Ctrl+Space*) untuk mencari berkas, perintah, dan pengaturan. |
| **03** | **FileManager** | [`FileManager.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/FileManager/FileManager.tsx) | Eksplorer berkas interaktif dengan navigasi folder, *grid/list view*, dan *breadcrumb*. |
| **04** | **Settings** | [`Settings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Settings/Settings.tsx) | Pusat konfigurasi sistem (Jaringan, Tampilan, Keamanan, Kernel, dan Pembaharuan). |
| **05** | **ControlCenter** | [`ControlCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/ControlCenter/ControlCenter.tsx) | Panel sakelar cepat (*Wi-Fi, Bluetooth, Dark Mode, Performance*) & slider kecerahan. |
| **06** | **NotificationCenter** | [`NotificationCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NotificationCenter/NotificationCenter.tsx) | Pusat notifikasi sistem dengan riwayat alert, filter kategori, dan tombol *Clear All*. |
| **07** | **LockScreen** | [`LockScreen.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/LockScreen/LockScreen.tsx) | Layar pengunci full-screen dengan proteksi PIN/Password interaktif dan animasi unlock. |
| **08** | **PowerMenu** | [`PowerMenu.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/PowerMenu/PowerMenu.tsx) | Menu opsi daya (*Shutdown, Reboot, Lock, Sleep*) dengan modal konfirmasi keselamatan. |
| **09** | **Terminal** | [`Terminal.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Terminal/Terminal.tsx) | Emulasi terminal perintah interaktif mendukung perintah `help`, `status`, `neofetch`, `clear`, `top`. |
| **10** | **SystemMonitor** | [`SystemMonitor.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemMonitor/SystemMonitor.tsx) | Grafik telemetri real-time untuk CPU, RAM, Network I/O, dan tabel manajemen proses. |
| **11** | **TextEditor** | [`TextEditor.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/TextEditor/TextEditor.tsx) | IDE Studio ringkas dengan tab berkas, penomoran baris, dan status sintaksis kode. |
| **12** | **Calculator** | [`Calculator.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Calculator/Calculator.tsx) | Kalkulator mode Standar & Saintifik dengan kalkulasi matematika interaktif & tombol RAD/DEG. |
| **13** | **SoftwareCenter** | [`SoftwareCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SoftwareCenter/SoftwareCenter.tsx) | Toko aplikasi interaktif dengan pencarian, filter kategori, dan tombol *Install / Open*. |
| **14** | **UserProfile** | [`UserProfile.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/UserProfile/UserProfile.tsx) | Panel informasi pengguna, kunci keamanan FIDO2/Passkey, dan token sesi aktif. |
| **15** | **Personalization** | [`Personalization.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Personalization/Personalization.tsx) | Pemilih tema warna (*Cyber Neon, Deep Space, Sunset Glass, Matrix Synth*) & wallpaper desktop. |
| **16** | **ContextMenu** | [`ContextMenu.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/ContextMenu/ContextMenu.tsx) | Menu klik-kanan (*Right Click*) desktop dengan submenu bertingkat (*Sort By, View Modes, Grid Snap*). |
| **17** | **SystemTray** | [`SystemTray.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemTray/SystemTray.tsx) | Popover indikator tray perangkat keras, slider volume master & mic, serta status baterai peripheral. |
| **18** | **WorkspaceSwitcher** | [`WorkspaceSwitcher.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/WorkspaceSwitcher/WorkspaceSwitcher.tsx) | Modul *Mission Control* untuk beralih antar ruang kerja (*Virtual Spaces*) & tata letak jendela. |
| **19** | **DiskEnclave** | [`DiskEnclave.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/DiskEnclave/DiskEnclave.tsx) | Manajer partisipasi penyimpanan terenkripsi LUKS2, verifikasi TPM 2.0, dan status SMART. |
| **20** | **NetworkMesh** | [`NetworkMesh.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NetworkMesh/NetworkMesh.tsx) | Dasbor keamanan jaringan *Zero-Trust*, grafik *throughput MB/s*, dan log filter paket eBPF. |

---

## ⚡ Teknologi & Dependensi

- **Core**: React 19 (`react`, `react-dom`) + TypeScript (`strict: true`)
- **Build Tool**: Vite (`vite v8.3.0`)
- **Styling**: Tailwind CSS v4 + Custom Color Tokens (Glassmorphism & Cybernetic Dark Surface)
- **Animation**: Framer Motion (`framer-motion`)
- **Iconography**: Google Material Symbols Outlined font
- **Typography**: Inter (Body & Headings) + JetBrains Mono (Code & Telemetry)

---

## 🚀 Cara Menjalankan & Membangun Proyek

### 1. Jalankan Server Pengkodingan Lokal (Development)
```bash
npm run dev
```

### 2. Jalankan Pemeriksaan Tipe & Production Build
```bash
npm run build
```
*Output build akan disimpan di folder `dist/`.*

---

## 🎨 Solusi Desain & Rendering Ikon

Seluruh ikon menggunakan font Google **Material Symbols Outlined**.
- Diimpor melalui `<link>` CDN pada [`index.html`](file:///c:/Users/ACER/Desktop/cassandraos/index.html).
- Dikonfigurasi dalam [`src/index.css`](file:///c:/Users/ACER/Desktop/cassandraos/src/index.css) menggunakan `.material-symbols-outlined { font-family: 'Material Symbols Outlined' !important; }` untuk memastikan render ikon yang konsisten di semua lingkungan deployment (seperti Vercel / Netlify).
