# Prompt Google Stitch — CassandraOS Utility Layer (Screen 61-80)

> Lanjutan dari `GOOGLE-STITCH-PROMPT.md`. Sebelum mulai, paste dulu prompt **Master Context** dari file sebelumnya (atau prompt singkat di bawah ini) agar gaya visual tetap konsisten di sesi Stitch yang sama, baru lanjutkan ke tiap layar satu per satu.

---

## Reminder Konteks Singkat (paste sebelum lanjut, jika sesi Stitch baru)

```
Continuing the "CassandraOS" desktop OS UI/UX design system. Keep the exact same visual language as previous screens: deep navy dark theme, flat minimal design, outline icons, rounded 8-12px corners.

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
```

---

## 61. Quick Settings

```
Design the Quick Settings panel for CassandraOS, a small floating panel opened from the system tray (top-right anchored), similar to a Control Center but more compact and utility-focused.

Layout:
- Top row: 4-6 square toggle tiles with icon + label — Wi-Fi, Bluetooth, Airplane Mode, Do Not Disturb, Dark Mode, Hotspot — active tiles filled with accent color
- Middle: Volume slider row with speaker icon and percentage
- Middle: Brightness slider row with sun icon and percentage
- Bottom: a small "Open Settings" text link/button

Style: deep navy panel (#051650) on transparent backdrop, active tile background #4361EE, inactive tile #0A2472 outline, flat rounded tiles, outline icons, compact spacing.
```

---

## 62. Recent Applications

```
Design the Recent Applications view for CassandraOS, shown as a horizontal scrollable panel (could be an overlay triggered by a keyboard shortcut like Alt+Tab style switcher).

Layout:
- Centered horizontal row of 4-6 app preview cards, each showing a small window thumbnail/screenshot preview, app icon, and app name below
- The currently selected/focused card is scaled slightly larger with an accent border highlight
- Dimmed desktop background behind the panel

Style: deep navy dark theme, card surface #051650 with #0A2472 border, selected card highlighted with #4CC9F0 border and subtle glow, flat rounded cards, clean centered layout, app icon small badge in bottom-right corner of each thumbnail.
```

---

## 63. All Applications

```
Design the All Applications screen for CassandraOS (full list view, distinct from the App Launcher overlay — this is a dedicated full-window app browser).

Layout:
- Top: search bar and a view toggle (grid/list)
- Left sidebar: alphabet quick-jump list (A-Z) for scrolling to app names
- Main area: full grid of all installed apps, each with icon and name, organized alphabetically with small section header letters (A, B, C...)

Style: deep navy theme, flat grid layout, outline icons, muted section header letters #94A3B8, hover state on app tile with #0A2472 background highlight, rounded corners, clean systematic layout emphasizing scannability.
```

---

## 64. Application Categories

```
Design the Application Categories screen for CassandraOS, showing apps grouped and browsable by category.

Layout:
- Top: category tabs/pills row — System, Utilities, Productivity, Development, Graphics, Multimedia — active tab highlighted
- Below: grid of app cards belonging to the selected category, each card showing icon, name, and short one-line description
- Category tab shows a count badge (e.g. "Development (12)")

Style: deep navy theme, active category pill filled #4361EE, inactive pill outline #0A2472 with muted text, card grid with #051650 surface, flat rounded design, outline icons, consistent spacing.
```

---

## 65. App Search Results

```
Design the App Search Results screen for CassandraOS, a focused search results view specifically for applications (not global search).

Layout:
- Top: search input showing an active query (e.g. "term")
- Results list: rows of matching apps, each showing icon, app name with the matching substring highlighted in accent color, category tag, and a small "Open" button on the right
- A "No exact match, did you mean..." suggestion row style for near-matches

Style: deep navy theme, matched text substring highlighted in #4CC9F0, row hover state #0A2472 background, flat list design, outline icons, muted secondary text #94A3B8 for category tags.
```

---

## 66. File Search Results

```
Design the File Search Results screen for CassandraOS, a focused search view for files and folders.

Layout:
- Top: search input with active query and a filter row (File type: All, Documents, Images, Videos, Others)
- Results list: rows showing file/folder icon, filename with matched substring highlighted, file path (muted text breadcrumb), file size, and modified date on the right
- Sort/filter options accessible via a dropdown top-right

Style: deep navy theme, matched text highlighted #4CC9F0, file/folder icons color-coded by type (folders #4361EE, documents #4895EF, images/media #26B170), flat list rows with hover highlight #0A2472, muted metadata text #94A3B8.
```

---

## 67. Global Search Results

```
Design the Global Search Results screen for CassandraOS — a unified results view combining apps, files, settings, and commands (expanded version of the System Search modal, shown as a fuller results page).

Layout:
- Top: large search input with active query
- Results organized into clearly labeled sections with a "See all" link per section: Apps (2-3 items in a row), Files (list with path), Settings (list with category icon), Commands (list with keyboard-style command tags)
- Each section has a distinct icon/color accent to differentiate content type

Style: deep navy theme, section headers in #F8FAFC with muted count text, distinct accent per section type (apps #4361EE, files #4895EF, settings #4CC9F0, commands #26B170 monospace tag), flat card sections, rounded corners, clear visual separation between sections.
```

---

## 68. Clipboard History

```
Design the Clipboard History panel for CassandraOS, showing previously copied items.

Layout:
- Header: "Clipboard History" title with a "Clear all" button
- Vertical list of clipboard entry cards, each showing a preview (text snippet, or small thumbnail if an image was copied), timestamp of when it was copied, and a small pin icon to keep an item pinned at top
- Pinned items shown in a separate "Pinned" section above the regular chronological list

Style: deep navy theme, entry card surface #051650 with #0A2472 border, pinned items marked with #4CC9F0 pin icon accent, flat rounded cards, muted timestamp text #94A3B8, text preview truncated with ellipsis, image thumbnails with rounded corners.
```

---

## 69. Screenshot Tool

```
Design the Screenshot Tool overlay for CassandraOS, shown as a small floating toolbar that appears when initiating a screenshot.

Layout:
- A compact horizontal floating toolbar with icon buttons: Full Screen, Window, Selected Area (currently active/highlighted), Capture button, and a small delay timer dropdown (0s/3s/5s/10s)
- Below/behind the toolbar, show a dimmed screen with a selection rectangle (dashed accent-colored border) representing an active area-selection in progress, with dimension label (e.g. "820 x 460") near the selection handle

Style: floating toolbar with #051650 surface, active mode button filled #4361EE, selection rectangle border #4CC9F0 dashed line on dimmed background, flat rounded toolbar, outline icons, small monospace dimension label.
```

---

## 70. Screen Recording

```
Design the Screen Recording control panel for CassandraOS.

Layout:
- Small floating control bar: recording mode selector (Full Screen / Window / Area), microphone toggle icon, system audio toggle icon, and a large "Start Recording" button (accent filled)
- A secondary state showing "Recording in progress": a red recording indicator dot, elapsed time counter (monospace, e.g. "00:02:14"), Pause and Stop buttons

Style: deep navy floating bar (#051650), recording indicator in #EF4444 with subtle pulse-style glow, Start button filled #4361EE, Stop button outline #EF4444, flat rounded control bar, outline icons, monospace timer text.
```

---

## 71. Color Picker

```
Design the Color Picker tool for CassandraOS, used to pick a color from anywhere on screen.

Layout:
- A small floating panel showing: a large magnified pixel-grid preview circle (showing zoomed-in pixels around the cursor with the center pixel highlighted), the picked color's large swatch preview, and the color value shown in multiple formats (HEX, RGB, HSL) as copyable text rows
- A small history row below showing 4-5 recently picked color swatches

Style: deep navy panel (#051650), magnifier preview with thin #4CC9F0 crosshair on center pixel, color value rows with monospace text and small copy icon, flat rounded panel, recent colors shown as small rounded swatch circles.
```

---

## 72. Emoji & Symbol Picker

```
Design the Emoji & Symbol Picker panel for CassandraOS.

Layout:
- Top: search input for emoji/symbols
- Category tab icons row (Smileys, Animals, Food, Activities, Objects, Symbols, Flags) — active tab highlighted
- Main grid: emoji/symbol icons in a dense grid layout
- Bottom: a "Recently used" row showing 6-8 recently used emoji

Style: deep navy theme, active category tab highlighted with #4361EE underline or background, emoji grid on #000720 background with hover tile highlight #0A2472, flat rounded panel, compact grid spacing, muted section label "Recently Used" #94A3B8.
```

---

## 73. On-Screen Keyboard

```
Design the On-Screen Keyboard for CassandraOS, a virtual keyboard overlay docked at the bottom of the screen.

Layout:
- Full QWERTY keyboard layout with all standard keys (letters, numbers row, space bar, enter, shift, backspace, etc.)
- A top row showing function keys or emoji/settings shortcut icons
- Keys shown as individual flat rounded rectangle buttons with letters/symbols centered, special keys (Shift, Enter, Space, Backspace) slightly wider and in a distinct muted color

Style: deep navy keyboard background (#051650), individual keys in #0A2472 with #F8FAFC text, special/modifier keys in a slightly different shade with #4CC9F0 accent icon, flat rounded key caps with subtle key-press shadow, docked full-width at bottom of screen.
```

---

## 74. Notification History

```
Design the Notification History screen for CassandraOS, showing previously dismissed/cleared notifications (distinct from the live Notification Center).

Layout:
- Header: "Notification History" title with a date range filter dropdown (Today, Yesterday, This week)
- Notifications grouped by date with date section headers (e.g. "Today", "Yesterday")
- Each entry shows app icon, title, message preview, and timestamp, displayed in a more compact/muted style than active notifications (indicating they're already read/dismissed)

Style: deep navy theme, muted/dimmed card styling (#051650 surface, lower opacity text) compared to active notifications, date section headers in #94A3B8, flat list rows, subtle dividers, small app icon per row.
```

---

## 75. Running Applications

```
Design the Running Applications screen for CassandraOS, listing all currently active/open applications system-wide (distinct from taskbar — this is a dedicated management view).

Layout:
- List of running app rows, each showing app icon, app name, number of open windows, CPU/memory mini-stat, and action buttons (Switch to, Close all windows)
- A summary bar at top showing total running apps count and total resource usage

Style: deep navy theme, row hover highlight #0A2472, mini resource stats shown as small colored text/bar (green low, amber medium, red high usage), flat list design, outline icons, action buttons as small outline/ghost buttons with #4CC9F0 accent.
```

---

## 76. Background Processes

```
Design the Background Processes screen for CassandraOS, showing system and app processes running without a visible window.

Layout:
- Table/list layout: columns for Process name, Type (System/App/Service), CPU%, Memory, Status (Running/Idle/Suspended)
- Filter tabs at top: All, System, Apps, Services
- A search field to filter by process name
- Each row has a small status dot indicator and an optional "End process" action on hover

Style: deep navy theme, table header in muted #94A3B8, status dots color-coded (green running, gray idle, amber suspended), flat table rows with subtle alternating background, monospace for CPU/memory numeric values, outline icons for process type.
```

---

## 77. Resource Usage Details

```
Design the Resource Usage Details screen for CassandraOS, an expanded/detailed version of System Monitor with graphs.

Layout:
- Four stat cards in a row: CPU, RAM, GPU, Disk — each with a live-style line/area graph showing usage over the last few minutes, current percentage large text, and a small trend indicator
- Below: a Network section showing separate upload/download area graphs with current speed
- Tabs or toggle to switch time range (1 min, 5 min, 1 hour)

Style: deep navy theme, graph lines/areas in accent colors (CPU #4361EE, RAM #4895EF, GPU #4CC9F0, Disk #26B170), graph background #051650 with subtle grid lines, large percentage numbers in #F8FAFC, flat card design with rounded corners, monospace for numeric values.
```

---

## 78. Disk Cleanup

```
Design the Disk Cleanup utility screen for CassandraOS.

Layout:
- Top: a horizontal storage bar visualization showing color-coded segments (System, Apps, Cache, Temporary files, Trash, Free space) with a legend below
- Middle: a checklist of cleanable categories, each row showing category name, size to be freed (e.g. "Cache — 2.4 GB"), a checkbox, and an info icon
- Bottom: total size to be freed (large accent text) and a "Clean Up" button (accent filled, prominent)

Style: deep navy theme, storage bar segments in distinct colors (System #4361EE, Apps #4895EF, Cache #F5C400, Temp #EF4444, Trash #94A3B8, Free #0A2472), checklist rows with #051650 surface, Clean Up button filled #4361EE prominent at bottom, flat rounded design.
```

---

## 79. Trash / Recycle Bin

```
Design the Trash / Recycle Bin screen for CassandraOS.

Layout:
- Top toolbar: "Empty Trash" button (destructive/warning style) and a search field
- Main area: grid or list of deleted files/folders, each showing icon, name (slightly muted/grayed to indicate deleted state), original location path, and date deleted
- Each item has hover actions: "Restore" and "Delete permanently" buttons
- Empty state message if trash is empty: trash icon illustration with "Trash is empty" text

Style: deep navy theme, deleted item icons slightly desaturated/muted, Empty Trash button in #EF4444 outline or filled, Restore action button in #4CC9F0, Delete permanently in #EF4444, flat list/grid design, muted path text #94A3B8.
```

---

## 80. File Operation Queue

```
Design the File Operation Queue panel for CassandraOS, showing in-progress file operations.

Layout:
- List of operation cards, each showing: operation type icon (copy/move/delete/download), source/destination file or folder name, a progress bar with percentage, transfer speed and time remaining (e.g. "12 MB/s — 30s left"), and a cancel/pause button
- Completed operations shown collapsed at the bottom with a checkmark and "Done" label
- A summary header showing "3 operations in progress"

Style: deep navy theme, progress bars filled with #4361EE (in progress) or #26B170 (completed), operation type icons outline style, flat card list, monospace for speed/time text, muted secondary text #94A3B8 for file paths, cancel button as small ghost/outline #EF4444 icon button.
```

---

## Checklist Screen 61-80 (Utility Layer)

- [ ] 61. Quick Settings
- [ ] 62. Recent Applications
- [ ] 63. All Applications
- [ ] 64. Application Categories
- [ ] 65. App Search Results
- [ ] 66. File Search Results
- [ ] 67. Global Search Results
- [ ] 68. Clipboard History
- [ ] 69. Screenshot Tool
- [ ] 70. Screen Recording
- [ ] 71. Color Picker
- [ ] 72. Emoji & Symbol Picker
- [ ] 73. On-Screen Keyboard
- [ ] 74. Notification History
- [ ] 75. Running Applications
- [ ] 76. Background Processes
- [ ] 77. Resource Usage Details
- [ ] 78. Disk Cleanup
- [ ] 79. Trash / Recycle Bin
- [ ] 80. File Operation Queue

---

## Struktur Utility Layer (referensi)

```
CassandraOS Utilities
│
├── Search
│   ├── App Search Results
│   ├── File Search Results
│   └── Global Search Results
│
├── Application
│   ├── Recent Applications
│   ├── All Applications
│   ├── Application Categories
│   └── Running Applications
│
├── Screen Tools
│   ├── Screenshot Tool
│   ├── Screen Recording
│   └── Color Picker
│
├── Input
│   ├── Clipboard History
│   ├── Emoji & Symbol Picker
│   └── On-Screen Keyboard
│
├── System Monitoring
│   ├── Background Processes
│   └── Resource Usage Details
│
└── File Utilities
    ├── Disk Cleanup
    ├── Trash / Recycle Bin
    └── File Operation Queue
```

## Tips

- Kerjakan per kelompok (Search → Application → Screen Tools → Input → System Monitoring → File Utilities) supaya konsistensi antar layar sejenis lebih terjaga.
- Untuk layar overlay/panel kecil (Quick Settings, Color Picker, Clipboard History, Emoji Picker), minta Stitch generate dengan konteks "shown floating over a dimmed desktop background" agar proporsinya tidak dipaksakan full-screen.
- Setelah screen 61-80 selesai, lanjutkan ke **Desktop Utama (screen 61 versi final / penutup)** sebagai layar terakhir yang merangkum seluruh sistem — beri tahu saya jika ingin saya buatkan promptnya juga.
