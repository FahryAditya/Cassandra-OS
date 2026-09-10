# 🛸 Catatan Proyek & Dokumentasi Modul CassandraOS v3.4.0-LTS

Dokumen ini berisi catatan lengkap seluruh komponen, modul UI/UX, arsitektur folder, serta instruksi build untuk **CassandraOS**.

---

## 📌 Ringkasan Proyek

CassandraOS adalah Web Operating System futuristik bergaya **glassmorphism cybernetic** yang dibangun dengan:
- **Framework**: React 19 + TypeScript (`strict: true`)
- **Bundler**: Vite v8.3.0
- **Styling**: Tailwind CSS v4 + Material Design Surface Color System
- **Animation**: Framer Motion
- **Iconography**: Google Material Symbols Outlined Font

---

## 📂 Struktur Folder Modul (`src/components/`)

Setiap modul dipisahkan ke dalam foldernya sendiri sesuai standar `src/components/<NamaKomponen>/<NamaKomponen>.tsx`:

```text
cassandraos/
├── docs/
│   └── CATATAN_PROJECT.md                   # File catatan dokumentasi proyek ini
├── src/
│   ├── components/
│   │   ├── AppLauncher/
│   │   │   └── AppLauncher.tsx              # Modul 01: Application Launcher
│   │   ├── SystemSearch/
│   │   │   └── SystemSearch.tsx             # Modul 02: Omni System Search Modal
│   │   ├── FileManager/
│   │   │   └── FileManager.tsx              # Modul 03: File Explorer & Storage Vault
│   │   ├── Settings/
│   │   │   └── Settings.tsx                 # Modul 04: System Settings
│   │   ├── ControlCenter/
│   │   │   └── ControlCenter.tsx            # Modul 05: Quick Toggles Control Center
│   │   ├── NotificationCenter/
│   │   │   └── NotificationCenter.tsx       # Modul 06: System & Security Notifications
│   │   ├── LockScreen/
│   │   │   └── LockScreen.tsx               # Modul 07: Security Lock Screen Overlay
│   │   ├── PowerMenu/
│   │   │   └── PowerMenu.tsx                # Modul 08: Power & Session Management
│   │   ├── Terminal/
│   │   │   └── Terminal.tsx                 # Modul 09: Command Line Terminal
│   │   ├── SystemMonitor/
│   │   │   └── SystemMonitor.tsx            # Modul 10: Resource & Telemetry Monitor
│   │   ├── TextEditor/
│   │   │   └── TextEditor.tsx               # Modul 11: Code & Text Editor Studio
│   │   ├── Calculator/
│   │   │   └── Calculator.tsx               # Modul 12: Scientific Calculator
│   │   ├── SoftwareCenter/
│   │   │   └── SoftwareCenter.tsx           # Modul 13: App Store & Marketplace
│   │   ├── UserProfile/
│   │   │   └── UserProfile.tsx              # Modul 14: User Account Profile
│   │   ├── Personalization/
│   │   │   └── Personalization.tsx          # Modul 15: Theme & Wallpaper Customizer
│   │   ├── ContextMenu/
│   │   │   └── ContextMenu.tsx              # Modul 16: Desktop Right-Click Context Menu
│   │   ├── SystemTray/
│   │   │   └── SystemTray.tsx               # Modul 17: Hardware & Battery Tray
│   │   ├── WorkspaceSwitcher/
│   │   │   └── WorkspaceSwitcher.tsx        # Modul 18: Spatial Mission Control Overview
│   │   ├── DiskEnclave/
│   │   │   └── DiskEnclave.tsx              # Modul 19: LUKS2 Cryptographic Vault Manager
│   │   ├── NetworkMesh/
│   │   │   └── NetworkMesh.tsx              # Modul 20: eBPF Packet Filter & VPN Shield
│   │   ├── Header/
│   │   │   └── Header.tsx                   # Status Bar Navigation
│   │   └── Sidebar/
│   │       └── Sidebar.tsx                  # Active Workspaces & Utilities
│   ├── types/
│   │   └── os.ts                            # Global Interfaces & WindowId Union Type
│   ├── App.tsx                              # Main Desktop Shell & Window Manager
│   └── index.css                            # CSS Design System Tokens
└── README.md
```

---

## 📋 Catatan Detail Modul 1 Sampai 20

### 1. Modul 01: `AppLauncher`
- **File**: [`src/components/AppLauncher/AppLauncher.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AppLauncher/AppLauncher.tsx)
- **Fungsi**: Peluncur aplikasi melayang dengan grid *pinned apps* (Files, Terminal, Settings, Calculator, Text Editor, Software Store), kategori sistem, dan input pencarian cepat.

### 2. Modul 02: `SystemSearch`
- **File**: [`src/components/SystemSearch/SystemSearch.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemSearch/SystemSearch.tsx)
- **Fungsi**: Modal pencarian omni global (*Ctrl+Space*) untuk mencari aplikasi, dokumen, dan pengaturan sistem secara real-time.

### 3. Modul 03: `FileManager`
- **File**: [`src/components/FileManager/FileManager.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/FileManager/FileManager.tsx)
- **Fungsi**: Eksplorer berkas dengan sidebar lokasi (*Root, Projects, Documents, Storage Vault*), breadcrumb path, serta mode tampilan grid/tabel.

### 4. Modul 04: `Settings`
- **File**: [`src/components/Settings/Settings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Settings/Settings.tsx)
- **Fungsi**: Panel preferensi dan pengaturan sistem lengkap mencakup Jaringan, Tampilan, Keamanan, Kernel, dan Pembaharuan.

### 5. Modul 05: `ControlCenter`
- **File**: [`src/components/ControlCenter/ControlCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/ControlCenter/ControlCenter.tsx)
- **Fungsi**: Panel kontrol cepat (*Quick Toggles*) untuk Wi-Fi, Bluetooth, Dark Mode, Night Light, Performance Boost, serta slider kecerahan dan volume.

### 6. Modul 06: `NotificationCenter`
- **File**: [`src/components/NotificationCenter/NotificationCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NotificationCenter/NotificationCenter.tsx)
- **Fungsi**: Pusat notifikasi dengan daftar alert sistem, keamanan, dan pembaruan, lengkap dengan opsi *Mark as Read* dan *Clear All*.

### 7. Modul 07: `LockScreen`
- **File**: [`src/components/LockScreen/LockScreen.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/LockScreen/LockScreen.tsx)
- **Fungsi**: Layar pengunci full-screen bergaya cybernetic dengan input PIN/Password interaktif, jam digital besar, dan animasi unlock.

### 8. Modul 08: `PowerMenu`
- **File**: [`src/components/PowerMenu/PowerMenu.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/PowerMenu/PowerMenu.tsx)
- **Fungsi**: Dialog pengelola daya untuk *Shutdown*, *Restart*, *Lock*, dan *Sleep* dengan modal konfirmasi dan proteksi sesi.

### 9. Modul 09: `Terminal`
- **File**: [`src/components/Terminal/Terminal.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Terminal/Terminal.tsx)
- **Fungsi**: Console emulasi terminal interaktif yang mendukung perintah `help`, `status`, `neofetch`, `top`, `clear`, dan `whoami`.

### 10. Modul 10: `SystemMonitor`
- **File**: [`src/components/SystemMonitor/SystemMonitor.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemMonitor/SystemMonitor.tsx)
- **Fungsi**: Monitoring telemetri real-time untuk CPU Load, penggunaan RAM, Disk I/O, Network Throughput, dan daftar proses aktif.

### 11. Modul 11: `TextEditor`
- **File**: [`src/components/TextEditor/TextEditor.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/TextEditor/TextEditor.tsx)
- **Fungsi**: Studio editor teks & kode dengan dukungan tab berkas, penomoran baris, status karakter/baris, dan shortcut simpan.

### 12. Modul 12: `Calculator`
- **File**: [`src/components/Calculator/Calculator.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Calculator/Calculator.tsx)
- **Fungsi**: Kalkulator saintifik & standar dengan fungsi trigonometri (`sin`, `cos`, `tan`, `sqrt`), toggle `RAD`/`DEG`, dan kalkulasi matematika.

### 13. Modul 13: `SoftwareCenter`
- **File**: [`src/components/SoftwareCenter/SoftwareCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SoftwareCenter/SoftwareCenter.tsx)
- **Fungsi**: Toko aplikasi dengan filter kategori (Utilitas, Developer, Produktivitas), pencarian paket, rating, dan status instalasi.

### 14. Modul 14: `UserProfile`
- **File**: [`src/components/UserProfile/UserProfile.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/UserProfile/UserProfile.tsx)
- **Fungsi**: Profil pengguna sistem, token sesi aktif, lencana hak akses root, dan kunci keamanan FIDO2 / Passkey.

### 15. Modul 15: `Personalization`
- **File**: [`src/components/Personalization/Personalization.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/Personalization/Personalization.tsx)
- **Fungsi**: Kustomisasi tema warna (*Cyber Neon, Deep Space, Sunset Glass, Matrix Synth*), ukuran font, intensitas blur, dan pemilih wallpaper.

### 16. Modul 16: `ContextMenu`
- **File**: [`src/components/ContextMenu/ContextMenu.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/ContextMenu/ContextMenu.tsx)
- **Fungsi**: Menu klik-kanan (*Right Click*) desktop dengan koordinat posisi `(x, y)`, submenu bertingkat (*Sort By, View Modes*), dan tindakan cepat (*New Folder, Open Terminal Here*).

### 17. Modul 17: `SystemTray`
- **File**: [`src/components/SystemTray/SystemTray.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemTray/SystemTray.tsx)
- **Fungsi**: Popover tray status perangkat keras, bento toggle (Wi-Fi, Bluetooth, Battery Saver, VPN Shield), slider volume master & mic, serta status baterai peripheral (Laptop, Mouse, Headphones).

### 18. Modul 18: `WorkspaceSwitcher`
- **File**: [`src/components/WorkspaceSwitcher/WorkspaceSwitcher.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/WorkspaceSwitcher/WorkspaceSwitcher.tsx)
- **Fungsi**: Spatial Mission Control untuk beralih antar ruang kerja virtual (*Dev, Telemetry & Ops, Storage Nodes, Kernel Conf*), pencarian jendela aktif, dan toggle tata letak *Tiling / Cascade*.

### 19. Modul 19: `DiskEnclave`
- **File**: [`src/components/DiskEnclave/DiskEnclave.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/DiskEnclave/DiskEnclave.tsx)
- **Fungsi**: Manajer partisipasi penyimpanan terenkripsi LUKS2 AES-256-XTS, verifikasi attestation TPM 2.0 PCR[7], SMART health diagnostics, dan rekeying vault.

### 20. Modul 20: `NetworkMesh`
- **File**: [`src/components/NetworkMesh/NetworkMesh.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NetworkMesh/NetworkMesh.tsx)
- **Fungsi**: Dasbor pelindung jaringan *Zero-Trust*, grafik throughput real-time (MB/s IN/OUT with sparklines), konvergensi mesh eBGP, log eBPF packet filter, dan sakelar interface (`wlan0`, `eth0`, `wg0`).

---

## 💻 Instruksi Menjalankan & Membangun Proyek

```bash
# 1. Install Dependensi (jika baru di-clone)
npm install

# 2. Jalankan Server Dev Local
npm run dev

# 3. Pengujian Tipe TypeScript & Build Dist
npm run build
```

---

*Catatan ini dibuat dan diperbarui secara otomatis pada repositori CassandraOS.*
