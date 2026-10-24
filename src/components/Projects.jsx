import "./Projects.css";
import { useState } from "react";
import ImageModal from "./ImageModal";

// `accent` names the project's colour (theme.css: --c-<accent>). The card sets
// --card-accent from it, so title, border, chips and badges are all tinted by
// one value and the four main projects are distinguishable at a glance.
// The descriptions are the same prose; only the stack was split from a string
// into a list, so it can render as chips.
const featuredProjects = [
  {
    id: "nyx",
    accent: "nyx",
    emoji: "🕷️",
    name: "Nyx",
    what: "Professional MITM & Traffic Analysis Desktop App",
    version: "v1.0.0",
    description:
      "Electron + React + FastAPI + mitmproxy desktop application for professional MITM interception and traffic analysis. Features: transparent proxy with DHCP-first stealth + ARP fallback, QUIC/HTTP3 blocking (forces TCP/TLS fallback), Activity Monitor (live SNI + HTTP Host per target without CA), HAR 1.2 export, 340+ vulnerability scanner, fuzzer, collaborator OOB server, session handling, match/replace, and guaranteed clean shutdown (3-layer: API graceful + signal handlers + atexit). Competitive with Burp Suite for LAN interception — zero-config device onboarding, no CA required for metadata visibility. 606 backend tests, 0 ESLint errors, silent installer. Target: v2.0.0 with Router Mode, Scope Engine, Mobile Companion.",
    stack: [
      "Electron",
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "mitmproxy",
      "WinDivert",
      "Docker",
    ],
    images: [
      { src: "/img/nyx_dashboard.png", alt: "Nyx MITM dashboard" },
      { src: "/img/nyx-icon.png", alt: "Nyx logo" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/nyx" },
    ],
  },
  {
    id: "phantom",
    accent: "phantom",
    emoji: "👻",
    name: "Phantom",
    what: "Autonomous Red Team Framework",
    version: "v2.0.0",
    description:
      "Full-spectrum offensive security framework with three integrated modes: (1) C2 Operations Center — cross-platform beacons (Windows PE, Linux ELF, Android ARM64, macOS) with AES-256-GCM + mTLS + HMAC, 35+ commands (shell, screenshot, keylog, inject, SOCKS5, SMB pipe, browser/CDP pivot, cookies, GPS, camera, audio), reflective in-memory loading, NTDLL unhooking, sleep masking, Ekko obfuscation, indirect/direct syscalls; (2) 12 Interactive Pentest Modules — scan, OSINT, web, exploit, brute, payload, handler, analyzer, pivot, wifi, wordlist, report with state-aware suggestions; (3) Autonomous Kill-Chain Agent (WIP) — deterministic planner + anomaly engine runs full kill chain (recon → exploit → beacon deploy → persistence → lateral) without human input, sub-agents for parallel campaigns, social engineering chain (persona → phish → IP grab → network pivot). Includes React + TypeScript Electron GUI (18 views), 101 tests, Docker CI/CD. 68k LOC across Python/C++/ASM/TS. Target: v3.0.0 with BloodHound, Cloud Exploit, Supply Chain, Multi-Operator.",
    stack: [
      "Python",
      "C++",
      "ASM",
      "FastAPI",
      "aiohttp",
      "React",
      "TypeScript",
      "Electron",
      "Docker",
      "AES-256-GCM",
      "mitmproxy",
    ],
    images: [
      { src: "/img/phantomV2.png", alt: "Phantom banner" },
      { src: "/img/phantomC2.png", alt: "Phantom C2 console" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/phantom" },
    ],
  },
  {
    id: "aegis",
    accent: "aegis",
    emoji: "🛡️",
    name: "Aegis",
    what: "XDR / SIEM Ecosystem",
    version: "v4.0.0",
    description:
      "End-to-end detection and response platform, installed from a clone with one command: Java/Spring Boot ingestion gateway (syslog UDP + HTTP, 12 log parsers), Python/FastAPI correlation engine, React dashboard, plus two endpoint agents — a Java/JNA EDR sensor (process lineage, file-integrity monitoring, on-demand YARA, persistence snapshots, remote response) and a host telemetry agent (metrics, network flows, users, eBPF on Linux). Detection is deterministic end to end: 21 static rules, 14 community Sigma rules run through an in-house compiler, 5 correlation rules, 337 named attack-tool and LOLBin signatures, IP reputation and statistical anomaly detection, with every alert mapped to MITRE ATT&CK. Aegis Total adds static triage of uploaded samples: PE/ELF/Mach-O, Office and PDF, entropy, suspicious imports, YARA signatures, extracted IOCs and entry-point disassembly with the API calls resolved on the imports. SIEM side: OCSF-aligned event schema with deduplication and sequence-gap detection, search across 24 filterable fields, configurable retention and OCSF export. SOAR playbooks with dry-run preview, per-action risk/reversibility metadata and rollback for the reversible ones; response actions include process-tree kill, quarantine and persistence removal. Security engineering: mTLS enrollment on an internal PKI, RBAC, full audit log, rotating remember-me device trust with per-device revocation. 728 backend tests plus 134 JUnit tests on the Java sensor, end-to-end API smoke; the container stack runs in ~630 MB and the two host agents add ~430 MB, with AI off.",
    stack: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Caddy",
      "Sigma",
      "YARA",
    ],
    images: [
      {
        src: "/img/overview.png",
        alt: "Aegis dashboard — live per-endpoint CPU and RAM telemetry graph",
      },
      {
        src: "/img/dashboard-aegis.png",
        alt: "Aegis Log Sources — ingest sources and parser coverage",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/aegis-ecosystem",
      },
    ],
  },
  {
    id: "kraken",
    accent: "kraken",
    emoji: "🐙",
    name: "Kraken",
    what: "Honeypot Intelligence Platform",
    version: "v1.0.0",
    description:
      "Multi-protocol honeypot network (SSH, HTTP, FTP, Telnet) with real-time attack detection, GeoIP enrichment, interactive Docker sandboxes, JWT auth, Telegram alerts, and full Prometheus/Grafana/Alertmanager monitoring stack. Export intelligence reports in CSV, JSON, PDF. Containerized with 10 services, v1.0.0 released.",
    stack: [
      "Python",
      "FastAPI",
      "asyncssh",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Docker Compose",
      "Prometheus",
    ],
    images: [{ src: "/img/swagger_kraken.png", alt: "Kraken API documentation" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/kraken" },
    ],
  },
];

const classicProjects = [
  {
    id: "nodetrace",
    accent: "neutral",
    emoji: "🖲️",
    name: "NodeTrace",
    what: "Multi-agent monitoring platform",
    description:
      "Full-stack monitoring platform with real-time telemetry, analytics and multi-language agents (Python, C#, C++, Java). FastAPI backend with anomaly detection (Z-Score), JWT auth, and Chart.js dashboard.",
    stack: ["Python", "FastAPI", "C#", "C++", "Java", "Chart.js"],
    images: [{ src: "/img/dashboard.png", alt: "NodeTrace dashboard" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/nodetrace" },
    ],
  },
  {
    id: "osint-bot",
    accent: "neutral",
    emoji: "🤖",
    name: "OSINT Discord Bot",
    what: "Async recon bot",
    description:
      "Modular async Discord bot for OSINT and cybersecurity recon. 10 commands: IP/domain/phone/social/email lookup, port scanning, WHOIS, DNS, subdomain finder, HTTP header analysis. Fully containerized with Docker.",
    stack: ["Python", "discord.py", "Docker"],
    images: [{ src: "/img/all-commands.png", alt: "OSINT bot commands" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/osint-bot-py" },
    ],
  },
  {
    id: "vaultx",
    accent: "neutral",
    emoji: "🔐",
    name: "VaultX",
    what: "Secure full-stack note system",
    description:
      "Secure full-stack note management system with JWT authentication, bcrypt password hashing, and MongoDB persistence. Built with React + Vite frontend and Node.js/Express backend.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    images: [
      { src: "/img/login_view.png", alt: "VaultX login" },
      { src: "/img/note_view.png", alt: "VaultX notes" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/vaultx" },
    ],
  },
  {
    id: "ai-suite",
    accent: "neutral",
    emoji: "🛡️",
    name: "AI Security Suite",
    what: "ML-powered security toolkit",
    description:
      "Modular microservice-based cybersecurity toolkit powered by machine learning. Three FastAPI services: Password Strength AI (RandomForest), Log Anomaly Detector (IsolationForest + Autoencoder), and OSINT Analyzer. Unified dark-theme dashboard.",
    stack: ["Python", "FastAPI", "scikit-learn", "TensorFlow", "Docker"],
    images: [
      { src: "/img/suite.png", alt: "AI Suite dashboard" },
      { src: "/img/osint.png", alt: "OSINT module" },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/ai-Security-Suite",
      },
    ],
  },
  {
    id: "sql-dashboard",
    accent: "neutral",
    emoji: "📊",
    name: "SQL Security Dashboard",
    what: "Security log analysis",
    description:
      "Interactive dashboard for security log analysis with automated data enrichment and 8 dynamic visualizations. Full SQL pipeline: CSV ingestion, trigger-based enrichment, and FastAPI + Matplotlib frontend.",
    stack: ["Python", "FastAPI", "SQL", "Pandas", "Matplotlib"],
    images: [{ src: "/img/chart.png", alt: "SQL Security Dashboard" }],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/incident-response-sql",
      },
    ],
  },
  {
    id: "rpg",
    accent: "neutral",
    emoji: "🎮",
    name: "Text-Based RPG",
    what: "Playable in the browser via Pyodide",
    description:
      "Terminal RPG with world map (4 areas), turn-based combat, shop, inventory, NPCs, boss fights, and save/load. Playable in browser via Pyodide.",
    stack: ["Python"],
    images: [
      { src: "/img/menu.png", alt: "RPG menu" },
      { src: "/img/village.png", alt: "RPG village" },
    ],
    links: [
      { label: "Live demo", href: "https://terminal-rpg-live.netlify.app" },
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/adventure-game-py",
      },
    ],
  },
  {
    id: "password-manager",
    accent: "neutral",
    emoji: "🔑",
    name: "Console Password Manager",
    what: "C++ CLI with XOR storage",
    description:
      "Console-based password manager with add/list/search/generate/delete operations. XOR encryption for local storage and strong password generator (mt19937_64).",
    stack: ["C++"],
    images: [
      { src: "/img/add.png", alt: "Adding a password" },
      { src: "/img/list.png", alt: "Password list" },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/password-manager-cpp",
      },
    ],
  },
  {
    id: "api-library",
    accent: "neutral",
    emoji: "📚",
    name: "REST API Library",
    what: "Node.js CRUD API",
    description:
      "Simple CRUD REST API for managing a book library with Express. Full GET/POST/PUT/DELETE operations with in-memory storage.",
    stack: ["Node.js", "Express"],
    images: [
      { src: "/img/first.png", alt: "API GET response" },
      { src: "/img/afterPOST.png", alt: "API POST response" },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/api-library-node",
      },
    ],
  },
];

const TABS = [
  {
    id: "featured",
    label: "Main Projects",
    note: "Production-grade security systems — C2, SIEM, honeypot, MITM.",
    projects: featuredProjects,
  },
  {
    id: "classic",
    label: "Earlier Work",
    note: "Earlier projects demonstrating growth across different domains.",
    projects: classicProjects,
  },
];

function ProjectCard({ project, onOpenImage }) {
  return (
    <article
      className={`project-card accent-${project.accent}`}
      aria-labelledby={`project-${project.id}`}
    >
      <header className="project-head">
        <h3 id={`project-${project.id}`}>
          <span aria-hidden="true">{project.emoji}</span> {project.name}
          <span className="project-what"> — {project.what}</span>
        </h3>
        {project.version && (
          <span className="badge badge-accent">{project.version}</span>
        )}
      </header>

      <p className="project-description">{project.description}</p>

      <p className="project-stack-label">Stack</p>
      <ul className="project-stack">
        {project.stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>

      {project.images?.length > 0 && (
        <div className="project-images">
          {project.images.map((image) => (
            <button
              key={image.src}
              type="button"
              className="thumb"
              onClick={() => onOpenImage(image)}
              aria-label={`Enlarge image: ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="project-links">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("featured");
  const [modalImage, setModalImage] = useState(null);

  return (
    <section className="section" id="projects">
      <div className="section-inner">
        <h2 className="section-title">Projects</h2>
        <p className="section-note">
          Four systems I build and maintain, then the work that led to them.
        </p>

        <div className="projects-tabs" role="tablist" aria-label="Project groups">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="project-panel-wrapper">
          {TABS.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                /* `inert` keeps the collapsed panel out of the tab order: it is
                 * only max-height:0, so its links stayed focusable and a
                 * keyboard user could land on links nobody can see. */
                inert={!selected}
                className={`project-panel ${selected ? "active" : ""}`}
              >
                <p className="section-note">{tab.note}</p>
                <div className="projects-grid">
                  {tab.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpenImage={setModalImage}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={() => setModalImage(null)}
        />
      )}
    </section>
  );
}
