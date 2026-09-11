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

### 30. Modul 30: `BatteryPower`
- **File**: [`src/components/BatteryPower/BatteryPower.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/BatteryPower/BatteryPower.tsx)
- **Fungsi**: Indikator baterai melingkar interaktif, pemilih mode daya (*Power Saver, Balanced, Performance*), sakelar otomatisasi hemat daya, dan mini-chart penggunaan baterai per aplikasi.

### 31. Modul 31: `StorageManager`
- **File**: [`src/components/StorageManager/StorageManager.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/StorageManager/StorageManager.tsx)
- **Fungsi**: Bar segmented visual kapasitas SSD (System, Apps, Documents, Media, Downloads, Other, Free), legenda rincian kategori yang dapat di-*expand*, serta pembersihan disk.

### 32. Modul 32: `AppPermissions`
- **File**: [`src/components/AppPermissions/AppPermissions.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AppPermissions/AppPermissions.tsx)
- **Fungsi**: Manajemen hak akses perangkat keras (Camera, Microphone, Location, Contacts, Files, Notifications, Background) dengan sakelar per aplikasi dan stempel waktu *last used*.

### 33. Modul 33: `PrivacyCenter`
- **File**: [`src/components/PrivacyCenter/PrivacyCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/PrivacyCenter/PrivacyCenter.tsx)
- **Fungsi**: Dasbor privasi sistem dengan perisai status & indikator skor privasi, sakelar telemetri anonim, riwayat aktivitas, dan layanan lokasi.

### 34. Modul 34: `SecurityCenter`
- **File**: [`src/components/SecurityCenter/SecurityCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SecurityCenter/SecurityCenter.tsx)
- **Fungsi**: Dasbor keamanan utama dengan banner status perisai, kontrol Firewall eBPF, enkripsi LUKS2, App Sandbox isolation, dan pemindai ancaman interaktif (*Scan Now*).

### 35. Modul 35: `UpdateCenter`
- **File**: [`src/components/UpdateCenter/UpdateCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/UpdateCenter/UpdateCenter.tsx)
- **Fungsi**: Pusat pembaruan sistem OS dan aplikasi tertunda, rincian *version diff* (`1.2 → 1.3`), ukuran unduhan, dan otomatisasi jadwal pembaruan.

### 36. Modul 36: `BackupRestore`
- **File**: [`src/components/BackupRestore/BackupRestore.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/BackupRestore/BackupRestore.tsx)
- **Fungsi**: Manajemen snapshot cadangan terenkripsi LUKS Vault, pembuatan cadangan manual (*Back Up Now*), otomatisasi jadwal snapshot (Daily/Weekly/Monthly), dan rincian berkas terpengaruh.

### 37. Modul 37: `SystemRecovery`
- **File**: [`src/components/SystemRecovery/SystemRecovery.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemRecovery/SystemRecovery.tsx)
- **Fungsi**: Lingkungan pemulihan sistem darurat (*Safe Mode*, *Factory Reset* beraksen merah peringatan, *Restore Snapshot*, dan *GRUB/EFI Boot Repair*).

### 38. Modul 38: `HardwareInfo`
- **File**: [`src/components/HardwareInfo/HardwareInfo.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/HardwareInfo/HardwareInfo.tsx)
- **Fungsi**: Dasbor spesifikasi teknis perangkat keras mencakup CPU AMD Ryzen, GPU NVIDIA RTX, RAM DDR5, Motherboard BIOS UEFI, NVMe Storage, dan output Display Wayland Cyber-GL dalam format font monospace.

### 39. Modul 39: `AboutCassandra`
- **File**: [`src/components/AboutCassandra/AboutCassandra.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AboutCassandra/AboutCassandra.tsx)
- **Fungsi**: Layar informasi identitas OS dengan logo cyclone berakses *cyber glow*, versi 3.4.0-LTS, jenis lisensi Apache 2.0, user terdaftar, uptime sistem, dan tautan pembaruan.

### 40. Modul 40: `ErrorCrashCenter`
- **File**: [`src/components/ErrorCrashCenter/ErrorCrashCenter.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/ErrorCrashCenter/ErrorCrashCenter.tsx)
- **Fungsi**: Diagnostik error & crash sistem dengan tag tingkat keparahan (Critical, Warning, Info), tampilan *stack trace snippet* berformat monospace, serta tombol *Report Issue* dan *Dismiss*.

### 41. Modul 41: `WifiNetworks`
- **File**: [`src/components/WifiNetworks/WifiNetworks.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/WifiNetworks/WifiNetworks.tsx)
- **Fungsi**: Pengelola jaringan nirkabel Wi-Fi 6E (`wlan0`), status jaringan terhubung (IP address & Mbps), daftar jaringan sekitar dengan indikator gembok & sinyal, serta input kata sandi inline.

### 42. Modul 42: `EthernetSettings`
- **File**: [`src/components/EthernetSettings/EthernetSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/EthernetSettings/EthernetSettings.tsx)
- **Fungsi**: Pengaturan antarmuka kabel Ethernet (`eth0` / 10 GbE), toggle aktivasi interface, serta konfigurasi IP mode (DHCP Otomatis vs Pengaturan Manual IPv4, Subnet, Gateway, dan DNS).

### 43. Modul 43: `VpnSettings`
- **File**: [`src/components/VpnSettings/VpnSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/VpnSettings/VpnSettings.tsx)
- **Fungsi**: Manajer enkripsi tunnel VPN (WireGuard, OpenVPN, eBPF Mesh Shield) dengan status terhubung aktif, lokasi server, durasi koneksi, serta aksi penambahan profil VPN baru.

### 44. Modul 44: `NetworkDetails`
- **File**: [`src/components/NetworkDetails/NetworkDetails.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NetworkDetails/NetworkDetails.tsx)
- **Fungsi**: Tabel spesifikasi diagnostik koneksi teknis (IPv4, IPv6, Subnet Mask, Gateway, DNS Primary/Secondary, MAC Address, Speed, MTU) berformat font monospace dengan fitur *copy to clipboard*.

### 45. Modul 45: `BluetoothDevices`
- **File**: [`src/components/BluetoothDevices/BluetoothDevices.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/BluetoothDevices/BluetoothDevices.tsx)
- **Fungsi**: Pengelola perangkat Bluetooth 5.3 BLE, daftar *My Paired Devices* (Headphones, Mouse, Keyboard, Phone) dengan indikator status hijau & persentase baterai, serta pemindaian perangkat sekitar.

### 46. Modul 46: `PrintersScanners`
- **File**: [`src/components/PrintersScanners/PrintersScanners.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/PrintersScanners/PrintersScanners.tsx)
- **Fungsi**: Pengelola perangkat cetak & pemindai dokumen (CUPS daemon), pencarian perangkat nirkabel/USB (*Add Printer or Scanner*), indikator sisa tinta/toner, serta aksi cetak halaman uji (*Print Test Page*).

### 47. Modul 47: `CameraSettings`
- **File**: [`src/components/CameraSettings/CameraSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/CameraSettings/CameraSettings.tsx)
- **Fungsi**: Layar preview siaran kamera live (V4L2 Video Pipeline) dengan frame Cyber-GL, pemilih perangkat kamera, kontrol kecerahan & resolusi, mirror video toggle, serta daftar aplikasi berizin.

### 48. Modul 48: `MicrophoneSettings`
- **File**: [`src/components/MicrophoneSettings/MicrophoneSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/MicrophoneSettings/MicrophoneSettings.tsx)
- **Fungsi**: Pengaturan mikrofon & penguatan input (PipeWire), indikator *live input level meter* (animasi segmen hijau/kuning/merah), penekanan kebisingan AI (*noise suppression*), dan pengujian *loopback*.

### 49. Modul 49: `AudioDevices`
- **File**: [`src/components/AudioDevices/AudioDevices.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AudioDevices/AudioDevices.tsx)
- **Fungsi**: Pengatur rute & perangkat audio (PipeWire WirePlumber), seksi *Output* (Headphones, Speakers, HDMI) dengan slider volume master, dan seksi *Input* mikrofon/headset.

### 50. Modul 50: `NotificationsSettings`
- **File**: [`src/components/NotificationsSettings/NotificationsSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/NotificationsSettings/NotificationsSettings.tsx)
- **Fungsi**: Pusat aturan notifikasi sistem, master toggle notifikasi global, serta pengatur opsi per aplikasi (Show on lock screen, Show badge, Sound alert, Priority level).

### 51. Modul 51: `DoNotDisturb`
- **File**: [`src/components/DoNotDisturb/DoNotDisturb.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/DoNotDisturb/DoNotDisturb.tsx)
- **Fungsi**: Mode fokus & Do Not Disturb, jadwal otomatisasi aktif berdasarkan jam & hari, serta pengaturan pengecualian panggilan favorit & alert keamanan darurat.

### 52. Modul 52: `AccessibilitySettings`
- **File**: [`src/components/AccessibilitySettings/AccessibilitySettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AccessibilitySettings/AccessibilitySettings.tsx)
- **Fungsi**: Fitur aksesibilitas & teknologi pembantu (Vision, Hearing, Interaction), pembesar layar (*Magnifier*), pengubah skala ukuran teks dengan *live preview*, High Contrast, dan bantuan keyboard (*Sticky/Slow keys*).

### 53. Modul 53: `LanguageRegion`
- **File**: [`src/components/LanguageRegion/LanguageRegion.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/LanguageRegion/LanguageRegion.tsx)
- **Fungsi**: Pengatur bahasa tampilan sistem (Bahasa Indonesia, English, Japanese), lokal wilayah, serta preview format tanggal, format waktu 12h/24h, format angka, dan format mata uang.

### 54. Modul 54: `DateTimeSettings`
- **File**: [`src/components/DateTimeSettings/DateTimeSettings.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/DateTimeSettings/DateTimeSettings.tsx)
- **Fungsi**: Jam digital real-time dengan status NTP server sync, toggle sinkronisasi otomatis, manual date-time picker, selector zona waktu global (UTC, WIB, EST, PST, CET), dan format jam 12h/24h.

### 55. Modul 55: `DefaultApps`
- **File**: [`src/components/DefaultApps/DefaultApps.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/DefaultApps/DefaultApps.tsx)
- **Fungsi**: Pengatur aplikasi bawaan (*Default Applications*) untuk kategori Web Browser, Text Editor, Terminal, Music Player, Video Player, Photo Viewer, PDF Viewer, dan Archive Manager.

### 56. Modul 56: `StartupApps`
- **File**: [`src/components/StartupApps/StartupApps.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/StartupApps/StartupApps.tsx)
- **Fungsi**: Pengelola aplikasi yang berjalan otomatis saat booting sistem (*Startup Applications*), toggle status on/off, indikator dampak boot (*Boot Impact* High/Medium/Low), serta opsi tambah aplikasi startup kustom.

### 57. Modul 57: `AppStorage`
- **File**: [`src/components/AppStorage/AppStorage.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AppStorage/AppStorage.tsx)
- **Fungsi**: Pengelola penggunaan ruang penyimpanan aplikasi (*App Storage*), visualisasi stacked progress bar breakdown (Binary, User Data, Cache), penyaringan & pengurutan, serta tombol *Clear Cache* individual & massal.

### 58. Modul 58: `AppDetails`
- **File**: [`src/components/AppDetails/AppDetails.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/AppDetails/AppDetails.tsx)
- **Fungsi**: Layar rincian spesifikasi & keamanan aplikasi (*Application Details*), informasi arsitektur/binari, validasi tanda tangan kriptografi, kontrol izin sistem (Network, Filesystem, Camera, Background, GPU), dan tombol Force Stop / Uninstall.

### 59. Modul 59: `SystemDiagnostics`
- **File**: [`src/components/SystemDiagnostics/SystemDiagnostics.tsx`](file:///c:/Users/ACER/Desktop/cassandraos/src/components/SystemDiagnostics/SystemDiagnostics.tsx)
- **Fungsi**: Pusat diagnostik & uji beban perangkat keras sistem (*System Diagnostics*), tombol pemindaian stress test interaktif dengan indikator progress bar, serta checklist status kesehatan CPU, RAM, NVMe Storage, Network Latency, Baterai, dan Sensor.

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
