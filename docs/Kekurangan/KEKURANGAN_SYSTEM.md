# ⚠️ Catatan Kekurangan Utama & Area Penyempurnaan CassandraOS

Dokumen ini berisi inventarisasi lengkap mengenai **kekurangan utama, keterbatasan fungsionalitas, dan area yang belum terhubung ke State Global** pada proyek CassandraOS.

---

## 📌 Ringkasan Status Sistem

| Kategori | Jumlah Modul | Status |
|---|---|---|
| **Berfungsi Penuh** | 5 System | Window Management System (WMS), Calculator, Terminal, LockScreen, PowerMenu |
| **Semi-Functional (Mock State)** | 9 System | Personalization, WorkspaceSwitcher, SystemSearch, FileManager, TextEditor, ControlCenter, SystemTray, ContextMenu, NotificationCenter |
| **Simulasi / Visual Only** | 4 System | DiskEnclave, NetworkMesh, SoftwareCenter, UserProfile |

---

## 🔍 Detail Kekurangan Utama Per-Modul

### 1. Integrasi Tema & Wallpaper (`Personalization`)
- **Kekurangan**: Pemilihan tema warna dan wallpaper pada modal *Personalization* baru mengubah state lokal di dalam modal tersebut.
- **Dampak**: Wallpaper utama desktop dan variabel warna Tailwind belum ter-update secara global ketika pengguna mengganti pilihan.
- **Solusi Yang Dibutuhkan**: Buat `ThemeContext` atau hubungkan ke `document.body.style` / wallpaper container di `App.tsx`.

---

### 2. Isolasi Ruang Kerja Virtual (`WorkspaceSwitcher`)
- **Kekurangan**: Beralih antara Workspace `01` hingga `05` hanya mengubah indikator aktif di Sidebar dan Header, tetapi **semua jendela yang terbuka masih muncul secara bersamaan di layar**.
- **Dampak**: Fitur multi-workspace belum memisahkan jendela yang termasuk dalam Workspace 01 vs Workspace 02.
- **Solusi Yang Dibutuhkan**: Tambahkan properti `workspaceId: string` pada `WindowState` agar jendela hanya dirender jika `workspaceId === activeWorkspaceId`.

---

### 3. File System CRUD & Penyimpanan Permanen (`FileManager` & `TextEditor`)
- **Kekurangan**:
  - `FileManager`: Navigasi folder dan list berkas bersifat statis (*mock array*). Belum dapat membuat folder baru, menghapus berkas, atau mengganti nama.
  - `TextEditor`: Pengetikan teks bekerja di memori, tetapi tombol **Save (Ctrl+S)** belum menyimpan konten ke `LocalStorage` atau berkas nyata.
- **Dampak**: Perubahan teks dan berkas hilang saat browser di-refresh.
- **Solusi Yang Dibutuhkan**: Implementasikan `FileSystemContext` berbasis `LocalStorage` / `IndexedDB` untuk menyimpan hirarki berkas dan konten teks.

---

### 4. Sinkronisasi State Terpusat (`ControlCenter` & `SystemTray`)
- **Kekurangan**: Slider volume, slider mic, dan toggle Wi-Fi/Bluetooth pada `ControlCenter` dan `SystemTray` memiliki state terpisah (*decoupled*).
- **Dampak**: Mengubah volume pada `SystemTray` tidak memperbarui nilai volume pada `ControlCenter`.
- **Solusi Yang Dibutuhkan**: Satukan state perangkat keras & quick toggles ke dalam `SystemSettingsContext`.

---

### 5. Navigasi Aksi Pencarian (`SystemSearch`)
- **Kekurangan**: Input pencarian menyaring daftar hasil, tetapi **mengklik salah satu hasil pencarian belum membuka aplikasi terkait**.
- **Dampak**: Pencarian global belum dapat digunakan sebagai peluncur cepat instan.
- **Solusi Yang Dibutuhkan**: Hubungkan handler `onClick` pada setiap item hasil pencarian ke fungsi `openWindow(id)`.

---

### 6. Aksi Klik Kanan Desktop (`ContextMenu`)
- **Kekurangan**: Klik kanan membuka menu melayang dengan posisi `(x, y)` yang benar, tetapi opsi seperti *Sort By Name (A-Z)* atau *Snap to Grid* belum mengubah susunan ikon di desktop.
- **Dampak**: Context menu terasa seperti hiasan UI daripada pengatur ikon desktop.
- **Solusi Yang Dibutuhkan**: Simpan susunan ikon desktop dalam state `desktopIcons` dan izinkan `ContextMenu` melakukan pengurutan array (*sorting*).

---

### 7. Penghentian Proses (`SystemMonitor`)
- **Kekurangan**: Grafik CPU dan RAM beranimasi secara real-time, tetapi tombol **Kill Process** pada tabel proses aktif belum menghapus/menutup jendela aplikasi terkait.
- **Dampak**: Pengguna tidak dapat menghentikan aplikasi bermasalah dari monitor.
- **Solusi Yang Dibutuhkan**: Panggil `closeWindow(process.windowId)` saat tombol Kill diklik.

---

### 8. Sistem Notifikasi Dinamis (`NotificationCenter`)
- **Kekurangan**: Daftar notifikasi bersifat statis. Belum ada mekanisme *Event Emitter* yang memunculkan notifikasi pop-up saat aplikasi baru dibuka, sesi dikunci, atau error terjadi.
- **Dampak**: Notifikasi tidak mencerminkan kejadian nyata di sistem.
- **Solusi Yang Dibutuhkan**: Buat `NotificationContext` dengan metode `addNotification({ title, message, type })`.

---

### 9. Simulasi Perangkat Keras & Jaringan (`DiskEnclave`, `NetworkMesh`, `SoftwareCenter`, `UserProfile`)
- **Kekurangan**:
  - `DiskEnclave`: Detail LUKS2 & TPM 2.0 bersifat visual *read-only*.
  - `NetworkMesh`: Grafik throughput & log paket eBPF bersifat data simulasi.
  - `SoftwareCenter`: Tombol *Install* hanya mengubah teks tombol tanpa logika manajemen paket riil.
  - `UserProfile`: Form profil belum menyimpan perubahan data akun.

---

## 🗺️ Rencana Perbaikan (Roadmap Aksi Next Step)

1. **Prioritas 1 (Quick Wins & Impak Tinggi)**:
   - Integrasikan `Personalization` ke background desktop utama.
   - Hubungkan `SystemSearch` agar dapat membuka aplikasi secara langsung.
   - Hubungkan `WorkspaceSwitcher` dengan isolasi jendela per-workspace.

2. **Prioritas 2 (Data Persistence)**:
   - Buat penyimpanan berkas `LocalStorage` untuk `FileManager` dan `TextEditor`.
   - Hubungkan `SystemTray` dan `ControlCenter` ke state perangkat keras terpusat.

3. **Prioritas 3 (System Logic & Events)**:
   - Implementasikan `NotificationContext` untuk alert dinamis.
   - Hubungkan `SystemMonitor` *Kill Process* ke Window Manager.
