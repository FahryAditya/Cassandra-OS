# Prompt Google Stitch — CassandraOS UI/UX

> Cara pakai: buka stitch.withgoogle.com → pilih platform **Web** → pilih model **Gemini 3 Pro** (untuk hasil terbaik) → paste salah satu prompt di bawah satu per satu (Stitch bekerja optimal per-layar, bukan sekaligus semua). Mulai dari prompt "Master context", lalu lanjutkan ke tiap layar.

---

## 0. Master Context (paste ini dulu sebagai prompt pertama)

```
Context:
Design the desktop screen of "CassandraOS", a fictional desktop operating system UI/UX prototype (not a real OS — purely a frontend design concept). This is a web app prototype built with React, TypeScript, Tailwind CSS, and Framer Motion, styled to look and feel like a real desktop OS rather than a website.

User:
Power users and developers who want a fast, keyboard-friendly, minimal desktop operating system experience.

Design mood:
Clean, modern, minimal, deep navy dark theme with blue/cyan accents. Flat design, no excessive shadows or gradients, high contrast, clear visual hierarchy, low visual clutter, consistent 8-12px corner radius.

Color palette (use exactly):
- Background: #000720
- Surface: #051650
- Surface Secondary: #0A2472
- Primary accent: #4361EE
- Secondary accent: #4895EF
- Highlight: #4CC9F0
- Success: #26B170
- Warning: #F5C400
- Error: #EF4444
- Text: #F8FAFC
- Muted text: #94A3B8

Typography: clean modern sans-serif, medium weight for headings, regular for body. Use outline-style icons throughout (Lucide-style).

Screen type:
Desktop home screen (main OS screen)

Layout & hierarchy:
- Full-bleed wallpaper background (deep navy, subtle abstract gradient or geometric pattern in blue/cyan tones)
- Top-left: a vertical column of 4-5 desktop icons (Documents, Downloads, Terminal, Settings, Trash), each with icon + small label below
- Center: 1-2 floating application windows already open (e.g. a File Manager window and a Terminal window), each with a title bar (app icon, title, minimize/maximize/close buttons), showing sample content, with subtle drop shadow and rounded corners, slightly overlapping to show z-index stacking
- Bottom: a taskbar spanning full width, dark surface color, containing: App Launcher button (left), pinned + running app icons (center-left) with small active-indicator dots, and on the right a System Tray (wifi, bluetooth, volume, battery icons) plus a digital clock showing time and day

Expectations:
Generate a single high-fidelity desktop UI screen that feels like a real operating system desktop (similar spirit to Windows/GNOME/macOS but with its own deep-navy blue/cyan identity), not a generic web dashboard.
```

---

## 1. App Launcher (overlay)

```
Design the App Launcher overlay panel for CassandraOS, opened from the taskbar's launcher button, anchored to the bottom-left of the screen, floating above the desktop wallpaper with a semi-transparent dark navy backdrop blur behind it.

Layout:
- Top: a search input field with a search icon and placeholder "Search applications..."
- Below: a "Pinned" section showing 4-6 app icons in a row (Files, Terminal, Settings, Calculator, Text Editor, Software Center), each icon in a rounded square tile
- Below that: an "All apps" grid section with a category filter dropdown (System, Utilities, Productivity, Development, Graphics, Multimedia) top-right, and a grid of app icons with labels underneath, grouped by category with small section headers

Style: same deep navy (#000720/#051650) dark theme, blue/cyan accents (#4361EE, #4CC9F0), rounded corners, flat design, outline icons, minimal and keyboard-navigation friendly look.
```

---

## 2. System Search (CASS + SPACE)

```
Design the System Search modal for CassandraOS — a centered command-palette style modal that appears over a dimmed/blurred desktop background.

Layout:
- Large search input at the top with a search icon, placeholder "Type to search..."
- Below, results grouped into labeled sections: "Apps", "Files", "Settings", "Recent" — each section shows 2-3 result rows with a small icon, primary text, and secondary muted text (like file path or app category)
- Selected/highlighted result row uses the accent blue (#4361EE) as a subtle background highlight

Style: deep navy dark theme (#000720 background, #051650 surface), cyan highlight (#4CC9F0), flat minimal design, rounded corners, monospace touch for any command-like text, keyboard-first feel.
```

---

## 3. File Manager (app window)

```
Design the File Manager application window for CassandraOS as a standalone floating window.

Layout:
- Title bar: file manager icon, title "File Manager", minimize/maximize/close buttons on the right
- Toolbar below title bar: back/forward navigation arrows, a search field, grid/list view toggle buttons, and a sort dropdown
- Left sidebar: list of default directories with icons — Desktop, Documents, Downloads, Pictures, Videos, Music
- Main content area: grid view of folders and files with icons, filenames below each icon, using the deep navy dark theme

Style: #000720/#051650/#0A2472 navy palette, #4361EE and #4CC9F0 accents, flat design, outline icons, rounded 8-12px corners, clear visual hierarchy between sidebar and content.
```

---

## 4. Settings

```
Design the Settings application window for CassandraOS as a full window with a two-column layout.

Layout:
- Left sidebar: search field at top, then a vertical list of setting categories with icons — System, Network, Bluetooth, Appearance, Personalization, Display, Sound, Notifications, Power, Storage, Apps, Accounts, Privacy, Security, Accessibility, Keyboard, Mouse & Touchpad, Date & Time, About — with the "Appearance" item highlighted as active
- Right panel: detail view for "Appearance" showing a Theme selector (Dark/Light toggle), Accent color picker (row of 4-5 color swatch circles), and a Wallpaper section with a "Change wallpaper" button and thumbnail preview

Style: deep navy theme (#000720/#051650), active sidebar item highlighted with #4361EE, cyan accent #4CC9F0, flat minimal design, outline icons, rounded corners, generous whitespace, clear hierarchy.
```

---

## 5. Control Center (quick panel)

```
Design the Control Center quick-settings panel for CassandraOS, a small floating panel anchored to the top-right of the screen, opened from the system tray.

Layout:
- Row of toggle tiles: Wi-Fi, Bluetooth, Airplane Mode, Dark/Light Mode, Do Not Disturb — each tile has an icon and label, active state highlighted with accent blue background
- Below: a Volume slider row with speaker icon and horizontal slider
- Below: a Brightness slider row with sun icon and horizontal slider

Style: compact card panel, #051650 surface on #000720 backdrop, #4361EE active accent, #4CC9F0 highlight, flat rounded tiles, outline icons, minimal padding, clean grid alignment.
```

---

## 6. Notification Center

```
Design the Notification Center panel for CassandraOS, sliding in from the right edge of the screen.

Layout:
- Header: "Notifications" title with a "Clear all" button on the right
- List of notification cards stacked vertically, each showing: a small colored status icon (info/success/warning/error), app name, notification title, short message, and timestamp
- Notifications grouped visually by app with subtle dividers

Style: dark navy surface (#051650) on #000720 backdrop, status colors: info/highlight #4CC9F0, success #26B170, warning #F5C400, error #EF4444, flat cards with thin border, rounded corners, muted text (#94A3B8) for secondary info.
```

---

## 7. Lock Screen

```
Design the Lock Screen for CassandraOS, a full-screen overlay shown before login.

Layout:
- Full-bleed blurred/dimmed wallpaper background (deep navy with subtle abstract pattern)
- Top-center to center: large digital clock (time) and day/date below it, light text color
- Below: user avatar circle, username text, a password/PIN input field, and an "Unlock" button
- Bottom-right corner: a small power icon button

Style: minimal, centered composition, deep navy dark theme, #F8FAFC text on dark background, #4CC9F0 accent for the unlock button or focus states, flat design, generous negative space, elegant and calm feel.
```

---

## 8. Power Menu

```
Design the Power Menu modal for CassandraOS, a small centered modal over a dimmed desktop background.

Layout:
- Vertical list of 5 action rows, each with an icon and label: Lock, Sleep, Restart, Shut Down, Sign Out
- A visual divider, then a "Cancel" text button at the bottom

Style: compact modal card, #051650 surface, #000720 backdrop dim, outline icons in #4CC9F0/#F8FAFC, hover/focus state using #4361EE subtle background, flat rounded design, centered and minimal.
```

---

## 9. Terminal (app window)

```
Design the Terminal application window for CassandraOS.

Layout:
- Title bar: terminal icon, title "Cassandra Terminal", minimize/maximize/close buttons
- Body: dark terminal content area with monospace font, showing a prompt style "cass@cassandra:~$" in cyan, followed by a few example command lines and their output (e.g. "cass system" showing OS info), with a blinking cursor at the current prompt line

Style: near-black terminal background (#000720), cyan (#4CC9F0) prompt text, light gray/white output text, monospace font, minimal window chrome matching the rest of the OS, rounded window corners.
```

---

## 10. System Monitor

```
Design the System Monitor application window for CassandraOS.

Layout:
- Top section: four horizontal progress bars with labels and percentages — CPU, Memory, Storage, Network (network shows download/upload speed instead of a bar)
- Below: a process list table with columns Process name, CPU%, Memory, and an "End process" action button per row, with alternating subtle row shading

Style: deep navy theme (#000720/#051650), progress bars colored by severity (green #26B170 low, amber #F5C400 medium, red #EF4444 high), flat rounded bars, clean table layout, outline icons, muted text (#94A3B8) for secondary data.
```

---

## 11. Text Editor (app window)

```
Design the Text Editor application window for CassandraOS.

Layout:
- Title bar: text editor icon, title showing filename "untitled.txt", minimize/maximize/close buttons
- Below title bar: a thin toolbar with New file, Open file, Save, Save as icons on the left, and Search/Replace icons on the right, plus tabs row showing 2-3 open file tabs
- Main body: a code/text editing area with visible line numbers on the left gutter, sample text content with subtle syntax highlighting (keywords in blue/cyan, strings in a soft green), monospace font
- Bottom status bar: cursor line/column position, file encoding, language mode

Style: deep navy theme (#000720 editor background, #051650 chrome), #4CC9F0 for line numbers/active line highlight, muted text #94A3B8 for status bar, monospace font for code, flat minimal window chrome, rounded corners.
```

---

## 12. Calculator (app window)

```
Design the Calculator application window for CassandraOS, a compact vertical window.

Layout:
- Title bar: calculator icon, title "Calculator", minimize/maximize/close buttons, with a small mode toggle (Basic / Scientific) below or beside the title
- Display area: large right-aligned result text at top, smaller muted text above it showing the current expression/history
- Button grid: number pad 0-9, decimal point, operators (+, −, ×, ÷, %), equals button (accent colored, larger), clear button — arranged in a clean 4-column grid
- If Scientific mode indicated: an extra row/column of scientific function buttons (sin, cos, tan, log, √, ^) above the basic grid

Style: deep navy theme (#000720/#051650), number buttons in #0A2472 surface, operator buttons in muted outline style, equals button filled with #4361EE accent and #F8FAFC text, flat rounded square buttons, clear tactile-looking press states.
```

---

## 13. Software Center

```
Design the Software Center application window for CassandraOS.

Layout:
- Left sidebar: category list with icons — Development, Productivity, Education, Graphics, Multimedia, Internet, Games, Utilities — plus an "Installed" section at the bottom
- Top: a search bar for applications
- Main content: a grid of application cards, each showing app icon, app name, short description, a category tag, and an Install button (or "Update"/"Installed" state for some cards)
- One featured/highlighted app card at the top spanning wider width, showcasing a banner-style promoted app

Style: deep navy theme (#000720/#051650), card surface #0A2472 with subtle border, Install button filled #4361EE, Update button outline #4CC9F0, flat rounded cards, outline icons, clear grid alignment, muted text #94A3B8 for descriptions.
```

---

## 14. User Profile

```
Design the User Profile settings screen for CassandraOS (shown within the Settings window or as its own panel).

Layout:
- Top: large circular avatar with an edit/camera icon overlay, next to it the display name (large text) and username/account type badge (Administrator/Standard User/Guest) below
- Form section below: fields for Username, Display name, Account type (dropdown), with a "Change password" button and a "Change PIN" button
- A section for Account preferences with a few toggle switches (e.g. auto-login, require password on wake)

Style: deep navy theme (#000720/#051650), avatar ring in #4CC9F0 accent, account type badge using #4361EE background with light text, flat form fields with #0A2472 fill, toggle switches with accent color when active, rounded corners, clear label hierarchy (label muted #94A3B8, value #F8FAFC).
```

---

## 15. Personalization

```
Design the Personalization settings panel for CassandraOS (within Settings, similar two-column layout as the Settings screen but focused on this category).

Layout:
- Wallpaper section: a grid of wallpaper thumbnail options (4-6 thumbnails) with the currently selected one highlighted with an accent border, plus an "Upload custom" tile
- Theme section: Dark/Light mode toggle switch
- Accent color section: a row of 5-6 selectable color swatch circles (blue, cyan, purple, green, etc.), current selection marked with a checkmark or ring
- Additional toggles list: System font (dropdown), Taskbar settings (position: bottom/top/left), Desktop icon size (small/medium/large slider or segmented control), Animation settings (on/off toggle)

Style: deep navy theme (#000720/#051650), selected states highlighted with #4361EE ring/border, #4CC9F0 checkmarks, flat rounded thumbnails and swatches, clear section headers, generous spacing between sections.
```

---

## 16. Context Menu (desktop right-click)

```
Design a right-click Context Menu overlay for CassandraOS, shown on the desktop over the wallpaper at a specific cursor position.

Layout:
- A small vertical floating menu with a subtle border and shadow, containing rows with icon + label: New Folder, New File, Refresh, Display Settings, Personalization, Terminal Here, Sort By (with a submenu arrow), View (with a submenu arrow), with a thin divider separating "New Folder/New File/Refresh" from the settings-related items

Style: compact floating menu, #051650 surface on transparent/dimmed desktop backdrop, hover row highlighted with #0A2472 background, outline icons in #94A3B8 (muted) turning #F8FAFC on hover, flat rounded corners (6-8px), tight vertical padding per row, small readable text (13-14px equivalent).
```

---

## 17. System Tray (detail popover)

```
Design the System Tray indicator row as seen in the bottom-right of the CassandraOS taskbar, along with its expanded state.

Layout:
- Compact row: Wi-Fi icon, Bluetooth icon, Volume/speaker icon, Battery icon (with percentage), Notification bell icon (with small unread dot), digital clock showing time and date — all in a horizontal row with small consistent spacing
- Show one indicator (e.g. Wi-Fi) in an "active/hover" state with a subtle highlighted background to indicate it's clickable and opens Control Center

Style: deep navy taskbar background (#051650), icons in muted #94A3B8 default state turning #4CC9F0 on hover/active, clock text in #F8FAFC, flat minimal icon row, small badge/dot for notifications in #EF4444 or #4361EE, consistent 16-20px icon sizing.
```

---

## Checklist Semua Layar (17 total, sesuai spesifikasi lengkap)

- [ ] 0. Master Context (Desktop)
- [ ] 1. App Launcher
- [ ] 2. System Search
- [ ] 3. File Manager
- [ ] 4. Settings
- [ ] 5. Control Center
- [ ] 6. Notification Center
- [ ] 7. Lock Screen
- [ ] 8. Power Menu
- [ ] 9. Terminal
- [ ] 10. System Monitor
- [ ] 11. Text Editor
- [ ] 12. Calculator
- [ ] 13. Software Center
- [ ] 14. User Profile
- [ ] 15. Personalization
- [ ] 16. Context Menu
- [ ] 17. System Tray

## Tips Tambahan

- Generate **Master Context (Desktop)** dulu sebagai fondasi gaya visual — Stitch akan konsisten menerapkan gaya yang sama ke layar berikutnya dalam sesi yang sama.
- Setelah tiap layar digenerate, gunakan fitur **Edit/Iterate** Stitch untuk revisi kecil (contoh: "buat sudut window lebih kecil" atau "perbesar jarak antar ikon") daripada menulis ulang prompt dari nol.
- Setelah semua layar jadi, gunakan tombol **Paste to Figma** atau **Export code** di Stitch untuk lanjut ke tahap desain/development.
