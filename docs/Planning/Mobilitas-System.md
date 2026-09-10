fokus CassandraOS sekarang adalah mobilitas/interaksi desktop, 20 sistem yang wajib ada adalah:

1. Window Dragging — menggeser jendela dengan mouse/touch.


2. Window Resizing — mengubah ukuran jendela dari sisi dan sudut.


3. Close Window — menutup aplikasi.


4. Minimize Window — menyembunyikan jendela ke taskbar.


5. Maximize Window — membuat jendela memenuhi layar.


6. Restore Window — mengembalikan ukuran/posisi sebelumnya.


7. Window Focus — jendela yang diklik menjadi paling depan.


8. Z-Index Management — mengatur urutan jendela yang bertumpuk.


9. Window Snap — menempelkan jendela ke kiri/kanan/atas layar.


10. Snap Preview — menampilkan area sebelum jendela dilepas.


11. Window Switching — berpindah aplikasi dengan Alt + Tab.


12. Show Desktop — menyembunyikan semua jendela sekaligus.


13. Window Position Memory — mengingat posisi terakhir aplikasi.


14. Window Size Memory — mengingat ukuran terakhir aplikasi.


15. Double-Click Title Bar — maximize/restore dengan double click.


16. Window Context Menu — menu Move, Resize, Minimize, Maximize, Close, dll.


17. Always on Top — mempertahankan aplikasi di lapisan paling depan.


18. Window Boundary Protection — mencegah jendela hilang seluruhnya dari layar.


19. Smooth Window Animation — animasi saat membuka, menutup, minimize, dan restore.


20. Multi-Window Management — memungkinkan banyak aplikasi terbuka dan dikelola bersamaan.



Prioritas implementasi

P0 — Wajib banget
├── Dragging
├── Close
├── Minimize
├── Maximize
├── Restore
├── Focus
├── Z-Index
└── Resize

P1 — Desktop terasa matang
├── Snap
├── Snap Preview
├── Window Switching
├── Show Desktop
├── Position Memory
├── Size Memory
└── Double-Click Title Bar

P2 — Polish
├── Context Menu
├── Always on Top
├── Boundary Protection
├── Animation
└── Multi-Window Management

10 Sistem Mobilitas Tambahan CassandraOS

21. Window Tiling — menyusun beberapa jendela otomatis dalam pola grid.


22. Corner Snap — menarik jendela ke sudut layar untuk ukuran seperempat layar.


23. Edge Resistance — memberikan sedikit hambatan saat jendela mencapai batas layar agar lebih mudah dikontrol.


24. Window Magnetic Snap — jendela otomatis "menempel" ketika didekatkan dengan jendela lain.


25. Window Grouping — mengelompokkan beberapa aplikasi sehingga bisa dipindahkan atau dikelola bersama.


26. Virtual Desktop — membuat beberapa desktop terpisah, misalnya Desktop 1, Desktop 2, dan Desktop 3.


27. Workspace Switching — berpindah workspace menggunakan gesture atau shortcut keyboard.


28. Window Overview — menampilkan seluruh aplikasi yang sedang terbuka dalam satu tampilan.


29. Minimized Window Preview — menampilkan preview isi aplikasi ketika cursor diarahkan ke icon taskbar.


30. Window Recovery — mengembalikan posisi dan ukuran window jika aplikasi sebelumnya mengalami crash atau posisi window menjadi tidak valid.



Kalau digabung

CassandraOS sekarang punya 30 sistem mobilitas:

Window Movement
├── Dragging
├── Resize
├── Snap
├── Corner Snap
├── Magnetic Snap
├── Edge Resistance
└── Boundary Protection

Window State
├── Open
├── Close
├── Minimize
├── Maximize
├── Restore
├── Focus
├── Z-Index
└── Always on Top

Window Organization
├── Tiling
├── Grouping
├── Multi-Window
├── Window Overview
└── Virtual Desktop

Navigation
├── Alt + Tab
├── Show Desktop
├── Workspace Switching
└── Taskbar Preview

Persistence & Recovery
├── Position Memory
├── Size Memory
└── Window Recovery

Ini sudah mulai membentuk Window Management System CassandraOS, bukan sekadar kumpulan UI screen.