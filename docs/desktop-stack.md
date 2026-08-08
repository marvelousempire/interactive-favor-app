# Desktop & Client Stack — Electron · Capacitor · Unity

**Status:** Architecture decision, 2026-08-07 research session.  
**Product:** Interactive Favor App (P-more) + ReadyPlay fusion surface.

---

## Decision in one line

**Electron is the desktop foundation. Capacitor is the mobile twin. Unity is the embedded interactive layer. WordPress + WooCommerce is the backend engine and product catalog.**

---

## What Electron is

Electron is a **desktop application framework**. It bundles:

| Piece | Role |
|-------|------|
| **Chromium** | Renders the UI (HTML, CSS, JavaScript) — the front-end experience |
| **Node.js** | Backend runtime inside the app — file system, networking, native APIs |
| **Electron shell** | Native window management, menus, notifications, OS integration |

You open a Mac (or Windows/Linux) app. It looks and behaves like a native desktop application. The UI is web technology running inside Chromium, not a browser tab the user manages.

**Famous examples:** VS Code, Slack, Figma desktop, Discord, Notion, Spotify desktop.

A bare Electron app is a `main` process that opens a window and loads `index.html`. From there you build anything — React, Vue, plain HTML, or an embedded Unity view.

### Weight

Each Electron app ships its own Chromium + Node. Typical footprint starts at a few hundred megabytes (VS Code often 200–400 MB). Acceptable for a rich desktop product with Unity embedded; not the lightest possible shell.

### What you get that a pure web app cannot

- Native desktop window and menus
- Local file system access
- System notifications and tray
- Hardware / device integration paths
- Ability to embed Unity (or other native views) inside the window
- Offline-capable local runtime

Without Electron (or an equivalent shell like Tauri), you stay in the browser and lose those native affordances.

---

## Capacitor (mobile twin)

Capacitor wraps the **same web codebase** for iOS and Android. Parallel track with Electron:

- Shared UI and business logic (HTML/CSS/JS or React)
- Electron = desktop packaging
- Capacitor = mobile packaging + native plugins (camera, biometrics, haptics, etc.)

You do not maintain two separate product UIs. You maintain one web surface and two packaging layers.

---

## Unity layer

Unity is a **full game engine** (real-time 3D, physics, animation, particles, AI, multiplayer, VR/AR).

In Favor it is **not** the outer app shell. It is the **embedded interactive layer** for:

- 3D reputation / favor network map ("Dune-style" spatial graph)
- Gamified exploration of connections and P-more credits
- Future spatial visualizations

**Layer order**

```text
Electron (desktop) or Capacitor (mobile)
        │
        ├── Web UI shell (React / HTML / CSS)
        │
        └── Unity view (embedded) — 3D map / game surface
```

Unity can also target iPhone/iPad and desktop natively; embedding inside Electron keeps one desktop product while still using Unity’s 3D power.

**Capability ceiling (for awareness, not current product scope):** Unity can build full games (fighters, racers, RPGs, etc.). Favor uses a subset: interactive spatial network + light gamification.

**Device / biometric reach:** Unity plugins and Capacitor plugins can reach camera, ARKit, Core ML, Face ID / Touch ID, and similar device features. Native code or Capacitor alone can also reach them; Unity is useful when those signals need to live inside a 3D scene or game loop.

---

## WordPress + WooCommerce as backend engine

WordPress (with WooCommerce + Pods) is the **engineering backend and product catalog**, not the primary client UI.

| Role | Owner |
|------|--------|
| Product catalog (instruments, credits, SKUs) | WooCommerce |
| Structured content / custom types | Pods |
| REST API orchestration | WordPress |
| Desktop client | Electron |
| Mobile client | Capacitor |
| Interactive 3D | Unity (embedded) |

Pages or templates can host framed Electron-oriented views if needed, but the **operator-facing desktop experience starts as an Electron app**, not a browser session on WordPress.

---

## Chromium details (front-end)

- Chromium renders structure (HTML), presentation (CSS), and client behavior (JS).
- Window Controls Overlay and related APIs support unified title-bar / chrome coloring similar to modern Safari-style immersion.
- Progressive Web App patterns still apply for web-only surfaces; Electron is the packaged desktop path.

Node.js is **not** what draws the pixels. Node runs the main process and native-side logic; Chromium draws what the user sees.

---

## Related docs

- [Instruments Library](./instruments-library.md)
- [Moment Matrix](./moment-matrix.md)
- [Agent Platform](./agent-platform.md)
- [Tech Spec](./tech-spec.md)
