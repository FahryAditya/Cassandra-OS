---
name: CassandraOS Interface
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c4c5d7'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8e8fa1'
  outline-variant: '#444655'
  surface-tint: '#bac3ff'
  primary: '#bac3ff'
  on-primary: '#00218d'
  primary-container: '#4361ee'
  on-primary-container: '#f4f2ff'
  inverse-primary: '#2e4edc'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#036ec6'
  on-secondary-container: '#eaf0ff'
  tertiary: '#5bd5fc'
  on-tertiary: '#003543'
  tertiary-container: '#007995'
  on-tertiary-container: '#e4f6ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee1ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#001159'
  on-primary-fixed-variant: '#0031c4'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004884'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#5bd5fc'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e61'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 15px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 2px
  space-xs: 4px
  space-sm: 8px
  space-md: 12px
  space-lg: 16px
  space-xl: 24px
  space-2xl: 32px
  taskbar-height: 48px
  titlebar-height: 36px
  panel-dock-width: 320px
  gutter: 12px
---

## Brand & Style

This design system targets power users, systems engineers, and technical creatives requiring high-density workspace ergonomics, total visual clarity, and precise command interactions. The aesthetic blends high-performance minimalism with tactical desktop utility—structured, deep-toned, and rigorously ordered. 

The aesthetic leverages deep spatial depths, hyper-focused luminescent accents (electric cobalt and laser cyan), fine micro-borders, and tactile glass backdrops. Every structural element prioritizes density without visual clutter, reducing visual fatigue during marathon terminal sessions while rendering complex multidimensional data instantly legible.

## Colors

The palette is engineered around an abyss-level navy foundation with crystalline accents:
- **Canvas / Root Background (`#000720`)**: Anchor void canvas for the root workspace and underlying desktop wallpaper space.
- **Surface Elevation 1 (`#051650`)**: Base layer for desktop windows, taskbars, and passive application panels.
- **Surface Elevation 2 (`#0A2472`)**: Card containers, active window title bars, floating command palettes, and transient menus.
- **Primary Accent (`#4361EE`)**: Solid actions, primary buttons, active window halos, and focused indicators.
- **Secondary Accent (`#4895EF`)**: Selected states, interactive hovers, secondary controls, and system tray highlights.
- **Highlight Accent (`#4CC9F0`)**: Carets, terminal cursor blocks, focus rings, process indicators, and active badges.
- **Feedback Semantics**:
  - Success: `#26B170` (online services, clean builds, active daemons)
  - Warning: `#F5C400` (resource spikes, degraded clusters, pending tasks)
  - Error: `#EF4444` (process termination, kernel errors, syntax traps)
- **Content Hierarchy**:
  - Text Primary: `#F8FAFC` (high-contrast clarity for window titles, inputs, and code)
  - Text Muted: `#94A3B8` (metadata, line numbers, passive window chrome)

## Typography

Typography balances systematic readability with strict technical rigor. `Inter` handles all OS chrome, window controls, menus, dialogues, and system labels to guarantee high legibility at micro sizes. `JetBrains Mono` governs terminal buffers, telemetry readouts, status timestamps, keyboard shortcuts, and code-heavy developer tooling.

Baseline rules:
- Code and labels use tabular figures (`tnum`) by default for consistent alignment across monitoring widgets and process lists.
- Interface text relies on tight tracking (`-0.01em` to `-0.02em`) across headlines to retain a cohesive, engineered desktop appearance.

## Layout & Spacing

This design system uses a flexible, window-tiled or floating workspace grid anchored by a 4px base rhythm. Content density is calibrated for 1440p and 4K displays:
- **Taskbar / Dock**: Fixed 48px height across the screen bottom or floating pill style with 8px margin from bottom edge.
- **Window Chrome**: Fixed 36px titlebar height providing adequate draggable surface area while saving vertical screen real estate.
- **Padding & Gutters**: Component internals default to 8px or 12px; application layouts adhere to 12px margins between docked windows and workspace edges.
- **Panels & Overlays**: Quick Settings and Notification centers anchor to the screen edges at 320px fixed width. The Command Palette floats dynamically at top-center (width: 640px, top offset: 18vh).

## Elevation & Depth

Visual hierarchy uses luminous depth, tinted low-contrast outlines, and frosted backdrop blur filters:
- **Desktop Root**: Deep `#000720` canvas.
- **Inactive Window / Dock**: Background `#051650` with 80% opacity, `backdrop-filter: blur(16px)`, and a 1px border of `rgba(76, 201, 240, 0.12)`.
- **Active Window**: Elevated using `#0A2472` with 92% opacity, `backdrop-filter: blur(24px)`, a 1px border of `rgba(76, 201, 240, 0.45)`, and a subtle ambient drop shadow: `0 16px 40px -8px rgba(0, 7, 32, 0.8), 0 0 1px 1px rgba(67, 97, 238, 0.2)`.
- **Modals & Command Palette**: Highest elevation (`z-index: 9999`) using `#0A2472` (98% opacity), framed by a cyan border `rgba(76, 201, 240, 0.6)` and an ambient glow of `0 0 32px rgba(67, 97, 238, 0.35)`.

## Shapes

The design maintains an exact 8px to 12px corner radius across all interactive architecture:
- Windows, dialogue boxes, launcher popovers, and quick settings use 12px (`rounded-lg`).
- Internal UI elements (cards, code blocks, panel sections, list items) use 8px (`rounded-md`).
- Buttons, micro tags, tooltips, and inputs use 6px or 8px (`rounded-md`).
- Circular geometry is strictly reserved for user avatars and window control buttons (Close, Minimize, Maximize).

## Components

### Window Chrome
- **Titlebar**: 36px height, flex alignment. Left-aligned traffic lights: Close (`#EF4444`), Minimize (`#F5C400`), Maximize (`#26B170`), each 11px diameter with 8px spacing. Inactive windows render these at 40% opacity.
- **Title**: Center-aligned or left-adjacent to controls, rendered in `body-sm` font in `#94A3B8`.
- **Borders**: 1px inner stroke using `rgba(76, 201, 240, 0.15)` for inactive, `#4895EF` (30% opacity) for active.

### Taskbar / Dock
- Floating capsule or pinned strip housing pinned app icons, virtual workspace switchers (1, 2, 3, 4), and system tray.
- Active application indicator: 3px horizontal bar or dot centered beneath the icon tinted in `#4CC9F0`.

### Command Palette (Spotlight / Runner)
- Floating modal (640px wide), centered at 18vh from top.
- Full-width input with clean placeholder in `#94A3B8`, leading search icon (`LucideSearch`), and keyboard shortcut hints (`Esc`, `Enter`, `Tab`) rendered in `label-sm` chip formats.
- Result lists feature distinct category breaks ("Applications", "Commands", "Terminal Sessions") with selected items highlighted in `rgba(67, 97, 238, 0.35)`.

### Buttons
- **Primary**: Background `#4361EE`, text `#F8FAFC`, hover state `#4895EF`. Active click down-scale (0.98).
- **Ghost / Neutral**: Background transparent, border 1px `rgba(148, 163, 184, 0.2)`, text `#F8FAFC`, hover state `#0A2472`.
- **System Destructive**: Background `rgba(239, 68, 68, 0.15)`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.4)`.

### Input Fields & Controls
- Background `#051650`, 1px solid `rgba(76, 201, 240, 0.2)`, radius 8px, text `#F8FAFC`.
- Focus state triggers an outline ring of `#4CC9F0` with `box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.25)`.
- Checkboxes and Radios use `#4361EE` fill with crisp vector checkmarks and rings in `#F8FAFC`.

### Cards & App Panels
- Background `#051650`, inset border `1px solid rgba(76, 201, 240, 0.08)`.
- Internal dividers use 1px solid `rgba(148, 163, 184, 0.1)`.
- Padding defaulted to 12px or 16px according to container width.