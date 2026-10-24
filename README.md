# terminalkid09 — Personal Portfolio

Live: https://terminalkid09-portfolio-react.netlify.app

My developer portfolio: a single-page React application that shows the four
security systems I build, the work that led to them, and the stack they are
written with.

## Overview

One page, five sections — **Home, About, Skills, Projects, Contact** — with a
fixed bar that links to each of them (Skills included: it was rendered but had
no link, so it could only be reached by scrolling).

The look is the one my projects share: a dark violet page with a **live node
network** behind the content, and **one accent colour per main project**, so
Nyx, Phantom, Aegis and Kraken are distinguishable before the title is read:

| Project | Accent |
|---|---|
| Nyx | violet `#b57bff` |
| Phantom | green `#4ade80` |
| Aegis | cyan `#4cc9f0` |
| Kraken | teal `#2ee6c5` |

## Technologies

- **React 19** on **Vite 7** (`babel-plugin-react-compiler` enabled)
- **Plain CSS**, no framework: one token file (`src/styles/theme.css`) declares
  every colour, glow and radius, and the components only ever read from it
- **EmailJS** for the contact form
- **react-router-dom** for the shell (one route today)
- **ESLint** (flat config) and **Netlify** for deployment

## Sections

**Home** — hero with the identity, the stack badges and the three entry points
(projects, GitHub, contact).

**About** — background and the full-stack span of the projects. It names no
current focus on purpose: a portfolio is a snapshot, not a status page, and the
Nyx/Phantom sentence went stale every time either project moved.

**Skills** — a MEASURED language distribution (source lines across my
repositories, tracked files only, vendored dependencies and build output
excluded: Python 70.5%, TypeScript 14.7%, C++ 10.0%, then the rest), followed by
the categories: languages, backend, security, infrastructure, frontend/desktop,
AI/ML. The same numbers are in my GitHub profile README, so the two cannot
disagree.

**Projects** — two tabs: **Main Projects** (Nyx, Phantom, Aegis, Kraken) and
**Earlier Work**, which now lists every project the site has screenshots for:

- 🖲️ **NodeTrace** — multi-agent monitoring platform (Python, C#, C++, Java)
- 🤖 **OSINT Discord Bot** — async OSINT recon bot
- 🔐 **VaultX** — full-stack note system (React + Node.js + MongoDB)
- 🛡️ **AI Security Suite** — ML security toolkit (3 microservices)
- 📊 **SQL Security Dashboard** — security log analysis, 8 visualizations
- 🎮 **Text-Based RPG** — Python, playable in the browser via Pyodide
- 🔑 **Console Password Manager** — C++
- 📚 **REST API Library** — Node.js + Express

Every card carries the version badge, the stack as chips and its screenshots;
clicking a screenshot opens it full size (Escape closes it).

**Contact** — EmailJS form, with the labels bound to their fields, the button
disabled while the message is in flight, and the outcome announced through
`aria-live`.

## Start with the batch file

The project includes a Windows batch script that starts the development server
with one click: double-click `start_portfolio.bat` in the project root and it
installs the missing dependencies (if any) and launches Vite.

Or, manually:

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # output in dist/
```

## Accessibility and performance notes

- Screenshots are real buttons, so a keyboard can open and close them
- `role="dialog"` + `aria-modal` + Escape on the enlarged image
- A skip link, visible focus rings, and `prefers-reduced-motion` honoured by
  both the reveal animation and the network canvas (one static frame on
  request, and the canvas pauses when the tab is hidden)
- The canvas scales by `devicePixelRatio`, capped at 2
- Project screenshots are lazy-loaded
- Prose is capped at ~66 characters a line (`--measure`), and nothing smaller
  than 13.6px is set on the page

## The background, and how it is kept readable

The canvas draws drifting nodes and the links between them. What made the
earlier binary-rain version hard to read was not the animation but the shapes:
solid high-contrast glyphs behind a paragraph, measured at a 1.09:1 contrast
ratio behind the headline. A node network can be a texture instead, but only if
something bounds it, so three things work as a pair with the canvas:

- **the veil** (`.network-veil`) is two rails, not a vignette. It is light over
the outer 120px of the viewport and fully dark by 220px, so on a wide screen
the mesh reads as a lit edge on each side of the page. A radial vignette was
tried first and is the wrong tool: what it holds dark is a region of the
_viewport_, and the reading column travels through the viewport as you scroll,
so it either lit a paragraph near an edge (3.24:1 on a 768px viewport) or was
dark enough to hide the mesh completely (0.04% of the screen visible);
- **the panels**: every piece of text sits on one (`--surface`), a dark fill a
shade above `--bg` rather than the 3% white tint it used to be, and they carry
their own readability instead of borrowing it from the background;
- **narrow screens**: under 980px the content column is inset by 80px at most,
so there is no strip beside it a paragraph cannot reach, and the veil closes
flat instead. The mesh is still drawn and still moving there — it measures as a
deep violet field with the network at about a tenth of its value — but it is a
depth cue, not a pattern.

Readability is checked by measurement, not by eye: five frames per text block
so a node drifting past is included, the same blocks re-measured pressed against
the top and the bottom of the viewport (where any edge-lit veil would put mesh
behind them), and the worst pixel behind each block instead of the average. All
of it lands at 4.5:1 or better, and `axe-core` reports no colour-contrast
violation. The other half of the check is that the effect exists at all: with
the content hidden, the network covers ~0.35% of a 1440px viewport (0.04%
before this work), and ~2% of the rail columns.

## Deployment

Netlify, from the `dist/` build. All assets are local (no CDN, no external
font), and the layout is responsive from 320px up.

## Purpose

This page is my technical identity: backend engineering, a security mindset and
clean, deliberate design. It is meant to show not only what I can write, but how
I structure and ship real software.
