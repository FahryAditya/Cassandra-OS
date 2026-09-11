# Prompt Google Stitch — CassandraOS System & Hardware Layer (Screen 30-60)

> Melengkapi nomor yang sebelumnya terlewat, di antara `GOOGLE-STITCH-PROMPT.md` (Screen 0-20) dan `GOOGLE-STITCH-PROMPT-UTILITY.md` (Screen 61-80). Paste reminder konteks di bawah dulu jika sesi Stitch baru, lalu lanjutkan tiap layar satu per satu.

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

# Screen 30-39 — System

## 30. Battery & Power

```
Design the Battery & Power settings screen for CassandraOS.

Layout:
- Top: large circular battery gauge showing current percentage (e.g. 78%) with a charging bolt icon if plugged in, and estimated time remaining text below
- Power mode selector: three options as segmented control — Power Saver, Balanced, Performance — with the active mode highlighted
- Below: toggle list — "Battery saver at 20%", "Dim screen when idle", "Sleep after inactivity" (with a time dropdown)
- Bottom: a usage-by-app mini chart showing top 3 apps draining battery with small horizontal bars

Style: deep navy theme, circular gauge stroke in #26B170 (healthy) transitioning to #F5C400/#EF4444 at low levels, active power mode segment filled #4361EE, flat toggle switches, outline icons, muted labels #94A3B8.
```

---

## 31. Storage Manager

```
Design the Storage Manager screen for CassandraOS.

Layout:
- Top: a horizontal segmented storage bar showing used space by category (System, Apps, Documents, Media, Downloads, Other, Free) with total capacity label above (e.g. "512 GB SSD — 340 GB used")
- Below: a legend/list matching the bar segments, each row showing category name, color swatch, and size
- Each category row is expandable/clickable to drill into details, shown with a chevron icon

Style: deep navy theme, segmented bar with distinct flat colors per category (System #4361EE, Apps #4895EF, Documents #4CC9F0, Media #26B170, Downloads #F5C400, Other #94A3B8, Free #0A2472 outline), rounded bar ends, clean list rows below with hover highlight.
```

---

## 32. App Permissions

```
Design the App Permissions screen for CassandraOS.

Layout:
- Left sidebar: list of permission types with icons — Camera, Microphone, Location, Contacts, Files & Folders, Notifications, Background Activity — with count badge showing how many apps have each permission
- Right panel: for the selected permission type (e.g. Camera), a list of apps with a toggle switch each to grant/revoke access, plus a muted note of when it was last used

Style: deep navy two-column layout, active sidebar item highlighted #4361EE, toggle switches accent-colored when granted, muted "last used" timestamps #94A3B8, flat rounded design, outline icons for each permission type.
```

---

## 33. Privacy Center

```
Design the Privacy Center screen for CassandraOS, an overview dashboard of privacy-related settings.

Layout:
- Top: a privacy summary card with a shield icon and status text (e.g. "Your privacy is well protected") plus a score/checklist indicator
- Below: a grid of privacy category cards — App Permissions, Activity History, Ad Preferences, Data & Diagnostics sharing, Location Services — each card with icon, short description, and a status toggle or "Review" link

Style: deep navy theme, shield/status card with #26B170 accent for good status, category cards with #051650 surface and #0A2472 border, flat rounded cards, outline icons, clear grid layout with consistent card sizing.
```

---

## 34. Security Center

```
Design the Security Center screen for CassandraOS.

Layout:
- Top: overall security status banner (icon + "System is secure" text, green accent) or warning state if issues found
- Grid/list of security feature cards: Firewall (on/off toggle), Login & Authentication (Password/PIN/Biometric status), Encryption status, Antivirus/Threat scan (with "Last scan: 2 hours ago" and "Scan now" button), App Sandbox status
- Each card shows a status badge (Protected/Attention needed)

Style: deep navy theme, status banner #26B170 for secure / #F5C400 or #EF4444 for warnings, security feature cards #051650 surface, status badges as small pill labels, flat rounded design, outline shield/lock icons.
```

---

## 35. Update Center

```
Design the Update Center screen for CassandraOS.

Layout:
- Top: current OS version info card (e.g. "CassandraOS 0.1.0 — Up to date" or "Update available") with a large "Check for updates" / "Install Update" button
- Below: a list of available/pending updates for apps, each row showing app icon, name, version change (e.g. "1.2 → 1.3"), size, and an Update button
- A toggle for "Automatic updates" at the bottom with a schedule option

Style: deep navy theme, status card highlighted #4361EE when update available or #26B170 when up to date, update button filled accent, list rows with #051650 surface, flat rounded design, outline icons, muted version/size text #94A3B8.
```

---

## 36. Backup & Restore

```
Design the Backup & Restore screen for CassandraOS.

Layout:
- Top: backup status card showing last backup date/time, backup destination (e.g. "External Drive" or "Cloud"), and a large "Back Up Now" button
- Below: a toggle for "Automatic backup" with frequency dropdown (Daily/Weekly/Monthly)
- A list of previous backup snapshots, each row showing date, size, and a "Restore" button
- A "What's included" expandable section listing backup categories (Documents, Settings, Apps data)

Style: deep navy theme, status card #051650 surface with #4CC9F0 accent icon, Back Up Now button filled #4361EE, snapshot list rows with Restore as outline button, flat rounded design, muted metadata text #94A3B8.
```

---

## 37. System Recovery

```
Design the System Recovery screen for CassandraOS.

Layout:
- Warning-style header explaining recovery options with a caution icon
- List of recovery action cards: "Restart normally", "Safe Mode", "Reset to factory settings" (marked with warning/destructive styling), "Restore from backup", "Boot repair" — each with icon, title, short description, and an action button
- Destructive options (like factory reset) visually differentiated with red/warning accent and a confirmation note

Style: deep navy theme, standard options in #051650 surface with #4CC9F0 accent, destructive option card outlined in #EF4444 with warning icon, flat rounded cards, clear visual hierarchy separating safe vs risky actions.
```

---

## 38. Hardware Information

```
Design the Hardware Information screen for CassandraOS.

Layout:
- List/grid of hardware component cards: CPU (name, cores, clock speed), GPU (name, VRAM), RAM (total, type, speed), Motherboard (model), Storage (drives list with capacity/type), Display (resolution, refresh rate) — each card with a relevant outline icon and key specs as label-value pairs

Style: deep navy theme, component cards #051650 surface with #0A2472 border, spec labels muted #94A3B8, spec values #F8FAFC, flat rounded cards, outline icons per component type, monospace font for technical values (clock speed, capacity numbers).
```

---

## 39. About CassandraOS

```
Design the About CassandraOS screen.

Layout:
- Center-top: CassandraOS logo/wordmark, version number (e.g. "0.1.0"), and build info (build number, build date) as centered text block
- Below: a simple info list — Edition, License type, Registered to, System uptime
- Bottom: small links row — "Check for updates", "View license", "Terms of service" — plus a subtle CassandraOS icon/mark watermark in the background

Style: deep navy theme, centered minimal layout, logo/wordmark in #F8FAFC with #4CC9F0 accent glow, info list muted labels #94A3B8, clean generous whitespace, flat minimal design befitting an "about" screen.
```

---

# Screen 40 — Diagnostics

## 40. Error / Crash Center

```
Design the Error / Crash Center screen for CassandraOS.

Layout:
- Top: summary banner showing count of recent errors/crashes (e.g. "3 issues in the last 7 days")
- List of error/crash log entries, each row showing an error-type icon, app/system name, short error description, timestamp, and severity tag (Critical/Warning/Info)
- Each entry expandable to show more detail (stack trace snippet in monospace, "Report issue" and "Dismiss" buttons)

Style: deep navy theme, severity tags color-coded (#EF4444 critical, #F5C400 warning, #4CC9F0 info), log rows #051650 surface with left accent border matching severity, monospace for technical details, flat rounded design, outline icons.
```

---

# Screen 41-49 — Connectivity & Hardware

## 41. Wi-Fi Networks

```
Design the Wi-Fi Networks screen for CassandraOS.

Layout:
- Top: Wi-Fi toggle switch with "Wi-Fi" label, and currently connected network shown as a highlighted card (network name, signal strength icon, "Connected" status, and a settings gear icon)
- Below: "Available networks" list, each row showing signal strength bars icon, network name, lock icon if password-protected, and tapping opens a password input inline or as a small modal
- A "Connect to hidden network" option at the bottom

Style: deep navy theme, connected network card highlighted with #4361EE border/background, signal strength shown as bar icons in #4CC9F0, locked network rows with small lock icon #94A3B8, flat list design, rounded corners.
```

---

## 42. Ethernet

```
Design the Ethernet settings screen for CassandraOS.

Layout:
- Top: connection status card — connected/disconnected icon, "Ethernet" label, connection speed (e.g. "1 Gbps"), and IP address shown
- Below: a toggle for "Enable Ethernet"
- Configuration section: IP configuration mode (Automatic DHCP / Manual) as segmented control, with manual fields (IP address, Subnet mask, Gateway, DNS) shown when Manual is selected

Style: deep navy theme, status card with #26B170 accent when connected / #94A3B8 when disconnected, segmented control active state #4361EE, manual config fields in #051650 fill with monospace text, flat rounded design, outline ethernet/cable icon.
```

---

## 43. VPN

```
Design the VPN settings screen for CassandraOS.

Layout:
- Top: current VPN connection status card (Connected/Disconnected) with a large toggle/connect button, connection duration if active, and server location shown
- Below: list of saved VPN configurations/profiles, each row showing profile name, protocol tag (e.g. WireGuard/OpenVPN), and a connect button
- An "Add VPN connection" button at the bottom, outline style

Style: deep navy theme, connected status card with #26B170 glow accent, active connect button filled #4361EE, profile list rows #051650 surface, protocol tag as small pill badge, flat rounded design, outline shield/lock icon for VPN branding.
```

---

## 44. Network Details

```
Design the Network Details screen for CassandraOS, showing technical connection information.

Layout:
- A clean label-value list/table: IP Address (IPv4 and IPv6), Subnet mask, Default gateway, DNS servers (primary/secondary), MAC address, Connection type, Connection status, Speed — each as a row with muted label left and monospace value right, with small copy icon per row

Style: deep navy theme, table rows with subtle dividers, labels muted #94A3B8, values in #F8FAFC monospace font, copy icon in #4CC9F0 on hover, flat clean technical/diagnostic layout, rounded card container.
```

---

## 45. Bluetooth Devices

```
Design the Bluetooth Devices screen for CassandraOS.

Layout:
- Top: Bluetooth toggle switch with "Bluetooth" label
- "My devices" section: list of paired devices, each row showing device-type icon (headphones, mouse, keyboard, phone), device name, connection status (Connected/Not connected), and a settings chevron
- "Available devices" section below: list of nearby unpaired devices with a "Pair" button per row, and a scanning/loading indicator icon

Style: deep navy theme, connected devices marked with #26B170 status dot, device-type icons outline style in #4CC9F0, Pair button as small filled #4361EE button, flat list rows, rounded corners, muted section headers #94A3B8.
```

---

## 46. Printers & Scanners

```
Design the Printers & Scanners screen for CassandraOS.

Layout:
- List of added printers/scanners, each card showing device icon, device name, status (Ready/Offline/Low ink), and quick actions (Print test page, Manage queue)
- An "Add printer or scanner" button at the top, outline style, that opens a device discovery state showing a scanning spinner and list of found devices nearby

Style: deep navy theme, device cards #051650 surface with status badge color-coded (#26B170 ready, #94A3B8 offline, #F5C400 low ink warning), flat rounded cards, outline printer/scanner icons, Add button prominent with #4361EE outline or fill.
```

---

## 47. Camera

```
Design the Camera settings/preview screen for CassandraOS.

Layout:
- Large live preview area (placeholder camera feed) taking up most of the screen, with a rounded frame
- Below preview: camera device selector dropdown (if multiple cameras), and quick controls (brightness, resolution dropdown, mirror toggle)
- A permissions note showing which apps currently have camera access

Style: deep navy theme, preview frame with #0A2472 border and rounded corners, control row below in #051650 surface, flat rounded design, outline icons for settings, muted permission list text #94A3B8.
```

---

## 48. Microphone

```
Design the Microphone settings screen for CassandraOS.

Layout:
- Top: microphone device selector dropdown, and a live input level meter (horizontal bar that would animate with sound, shown as a partially filled bar with segmented level indicators)
- Below: input volume slider, "Test microphone" button, noise suppression toggle
- A permissions list showing which apps have microphone access, similar style to Camera screen

Style: deep navy theme, level meter segments color-coded (green low-mid #26B170, amber high #F5C400, red peak #EF4444), volume slider with #4361EE fill, flat rounded design, outline mic icon, muted permission list #94A3B8.
```

---

## 49. Audio Devices

```
Design the Audio Devices screen for CassandraOS.

Layout:
- "Output" section: currently selected speaker/headphone device shown as a highlighted card with device icon, name, and volume slider; below it a list of other available output devices
- "Input" section below: similar treatment for microphone/input devices
- Each device row has a signal-type icon (speaker, headphones, Bluetooth headset) and a radio-button style selection indicator

Style: deep navy theme, selected device card highlighted #4361EE border, volume sliders with #4CC9F0 fill, device list rows #051650 surface, flat rounded design, outline icons per device type, clear Output/Input section separation with muted headers #94A3B8.
```

---

# Screen 50-59 — Notifications, Accessibility & Apps Management

## 50. Notifications Settings

```
Design the Notifications Settings screen for CassandraOS.

Layout:
- Top: master toggle "Allow notifications"
- Below: a list of apps, each row showing app icon, app name, and a toggle switch to allow/deny notifications, plus a chevron to expand per-app options (Show on lock screen, Show badge, Sound, Priority level)

Style: deep navy theme, master toggle prominent at top, app list rows #051650 surface with hover highlight, toggle switches accent-colored when on, flat rounded design, outline icons, expandable row style with subtle chevron indicator.
```

---

## 51. Do Not Disturb

```
Design the Do Not Disturb settings screen for CassandraOS.

Layout:
- Top: large toggle for "Do Not Disturb" with current status text (On/Off) and a moon icon
- Schedule section: toggle for "Scheduled" with time range pickers (Start time, End time) and day-of-week selector (M T W T F S S pills)
- Exceptions section: list of allowed exceptions (Calls from favorites, Repeated calls, Specific apps) each with a toggle

Style: deep navy theme, main toggle large and prominent with #4361EE accent when active, moon icon in #4CC9F0, day pills active state filled #4361EE, flat rounded design, section dividers, muted secondary text #94A3B8.
```

---

## 52. Accessibility

```
Design the Accessibility settings screen for CassandraOS.

Layout:
- Sidebar or tab categories: Vision, Hearing, Interaction — with the "Vision" category active
- Right/main panel for Vision: Magnifier toggle with zoom level slider, Text size slider (small to large preview text shown live), High contrast mode toggle, Reduce motion toggle
- Additional row: Keyboard assistance toggle (Sticky keys, Slow keys) as a sub-list

Style: deep navy theme, active category highlighted #4361EE, sliders with #4CC9F0 fill and live preview text scaling, toggles accent-colored when active, flat rounded design, outline icons, clear grouping with section headers.
```

---

## 53. Language & Region

```
Design the Language & Region settings screen for CassandraOS.

Layout:
- Top: "Display language" dropdown selector showing current language (e.g. "Bahasa Indonesia") with a flag/icon
- Below: "Region" dropdown, then format preview cards: Date format (e.g. "11/09/2026"), Time format (12h/24h toggle), Number format, Currency format — each showing a live preview example next to the setting

Style: deep navy theme, dropdown selectors with #051650 fill and chevron icon, preview examples shown in muted monospace-ish text #94A3B8, flat rounded design, outline globe/language icon, clean form-like layout.
```

---

## 54. Date & Time

```
Design the Date & Time settings screen for CassandraOS.

Layout:
- Top: large current time and date display (live-looking clock)
- Toggle: "Set time automatically" (using network time)
- Below (shown when automatic is off, or as secondary options): manual date picker and time picker fields
- Time zone selector dropdown with current zone shown (e.g. "GMT+8 Balikpapan")
- Format toggle: 12-hour / 24-hour segmented control

Style: deep navy theme, large clock display in #F8FAFC with #4CC9F0 accent for seconds/colon, toggle switches accent-colored, dropdown and picker fields #051650 fill, flat rounded design, outline clock/calendar icons.
```

---

## 55. Default Applications

```
Design the Default Applications settings screen for CassandraOS.

Layout:
- List of file-type/link categories, each row showing category icon and label (Web browser, Email client, Music player, Video player, Photo viewer, Text editor, PDF viewer, Archive tool) with the currently set default app name and icon on the right, plus a chevron to change it
- Tapping a row would show a dropdown/modal list of available apps for that category (can show one row in this "open" state as an example with a small dropdown list visible)

Style: deep navy theme, list rows #051650 surface, default app shown with small app icon + name in #F8FAFC, chevron in #94A3B8, dropdown/modal example styled consistently with rounded corners and #0A2472 hover state, outline category icons.
```

---

## 56. Startup Applications

```
Design the Startup Applications settings screen for CassandraOS.

Layout:
- List of apps that can run at startup, each row showing app icon, app name, a toggle switch to enable/disable, and a muted note of impact on boot time (e.g. "High impact", "Low impact") as a small colored tag
- A summary text at top: "5 apps set to run at startup"

Style: deep navy theme, impact tags color-coded (#EF4444 high, #F5C400 medium, #26B170 low impact), toggle switches accent-colored when enabled, list rows #051650 surface, flat rounded design, outline icons, muted summary text #94A3B8.
```

---

## 57. App Storage

```
Design the App Storage screen for CassandraOS, showing storage usage per application.

Layout:
- Top: sort dropdown (By size, By name, By last used) and total apps storage summary text
- List of apps sorted by size, each row showing app icon, app name, total size (app + data breakdown as small stacked bar or two numbers), and a chevron to expand details (App size vs Data/Cache size, with a "Clear cache" button)

Style: deep navy theme, size text in #F8FAFC with muted "app/data" breakdown label #94A3B8, small horizontal stacked mini-bar per row (app portion #4361EE, cache portion #F5C400), flat list rows, rounded corners, outline icons.
```

---

## 58. Application Details

```
Design the Application Details screen for CassandraOS, a detail page for a single selected app.

Layout:
- Top: app icon (large), app name, version number, and category tag
- Info list: Size, Installed date, Last updated, Developer/Publisher
- Permissions section: list of granted permissions with icons (Camera, Microphone, Files, Notifications) each with a toggle
- Bottom action row: "Uninstall" button (destructive/outline red), "Open" button (filled accent)

Style: deep navy theme, large app icon in rounded square frame, info list muted labels #94A3B8 with #F8FAFC values, permission toggles accent-colored, Uninstall button outline #EF4444, Open button filled #4361EE, flat rounded design.
```

---

## 59. System Diagnostics

```
Design the System Diagnostics screen for CassandraOS.

Layout:
- Top: "Run Diagnostics" large button, and overall health status summary (e.g. "All systems normal" with a checkmark icon, or list of flagged issues)
- Below: a checklist/grid of diagnostic categories being checked — CPU, RAM, Storage, Network, Battery, Hardware Sensors — each shown as a card with icon, category name, and a status indicator (checkmark/warning/error icon) once scan completes
- A progress bar or scanning animation state option shown for one category mid-check

Style: deep navy theme, Run Diagnostics button filled #4361EE prominent, status icons color-coded (#26B170 pass, #F5C400 warning, #EF4444 fail), diagnostic cards #051650 surface, flat rounded design, outline icons per category, scanning state with subtle progress indicator in #4CC9F0.
```

---

# Screen 60 — Reporting

## 60. System Report

```
Design the System Report screen for CassandraOS, a comprehensive summary/export view of overall system condition.

Layout:
- Top: report header showing generation date/time and a "Export as PDF" / "Share report" button
- Sectioned summary cards stacked vertically: System Overview (OS version, uptime), Hardware Summary (CPU/RAM/Storage quick stats), Performance Summary (avg CPU/RAM usage), Security Summary (status badges), Recent Issues (count with link to Error/Crash Center)
- Each section has a small expand/collapse chevron

Style: deep navy theme, report-style clean sectioned layout with clear headers, section cards #051650 surface with #0A2472 border, status badges color-coded consistent with other screens, Export button filled #4361EE, flat rounded design, outline icons per section, generous readable spacing befitting a report document.
```

---

## Checklist Screen 30-60

- [ ] 30. Battery & Power
- [ ] 31. Storage Manager
- [ ] 32. App Permissions
- [ ] 33. Privacy Center
- [ ] 34. Security Center
- [ ] 35. Update Center
- [ ] 36. Backup & Restore
- [ ] 37. System Recovery
- [ ] 38. Hardware Information
- [ ] 39. About CassandraOS
- [ ] 40. Error / Crash Center
- [ ] 41. Wi-Fi Networks
- [ ] 42. Ethernet
- [ ] 43. VPN
- [ ] 44. Network Details
- [ ] 45. Bluetooth Devices
- [ ] 46. Printers & Scanners
- [ ] 47. Camera
- [ ] 48. Microphone
- [ ] 49. Audio Devices
- [ ] 50. Notifications Settings
- [ ] 51. Do Not Disturb
- [ ] 52. Accessibility
- [ ] 53. Language & Region
- [ ] 54. Date & Time
- [ ] 55. Default Applications
- [ ] 56. Startup Applications
- [ ] 57. App Storage
- [ ] 58. Application Details
- [ ] 59. System Diagnostics
- [ ] 60. System Report

---

## Urutan Besar Keseluruhan (referensi)

```
00      → Master Context (Desktop)
01–20   → Core UI                          (file: GOOGLE-STITCH-PROMPT.md)
30–60   → System, Hardware & Connectivity  (file: GOOGLE-STITCH-PROMPT-UTILITY-30-60.md, ini)
61–80   → Utility Layer                    (file: GOOGLE-STITCH-PROMPT-UTILITY.md)
81      → Desktop Utama (penutup, belum dibuat)
```

> Catatan: nomor 21-29 belum pernah didefinisikan fungsinya secara eksplisit di percakapan sebelumnya — beri tahu saya jika kamu ingin melengkapi rentang itu juga, atau jika nomor 61 pada daftar utility sebelumnya perlu digeser jadi 81 agar tidak bentrok dengan Screen 61 "Quick Settings" di file kedua.

## Tips

- Kerjakan per blok besar (30-39 System → 40 Diagnostics → 41-49 Connectivity/Hardware → 50-59 Notifications/Accessibility/Apps → 60 Report) agar gaya antar layar sejenis konsisten.
- Layar dengan live data (Battery, Storage, Resource graphs, level meter Microphone) sebaiknya diberi contoh angka realistis di prompt (sudah disertakan) supaya Stitch tidak menghasilkan placeholder kosong.
- Setelah 30-60 selesai, lanjut ke 61-80 (`GOOGLE-STITCH-PROMPT-UTILITY.md`) lalu tutup dengan Desktop Utama.
