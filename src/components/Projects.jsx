import "./Projects.css";
import { useState } from "react";
import ImageModal from "./ImageModal";

const featuredProjects = [
  {
    title: "🕷️ Nyx — Professional MITM & Traffic Analysis Desktop App v1.0.0",
    description:
      "Electron + React + FastAPI + mitmproxy desktop application for professional MITM interception and traffic analysis. Features: transparent proxy with DHCP-first stealth + ARP fallback, QUIC/HTTP3 blocking (forces TCP/TLS fallback), Activity Monitor (live SNI + HTTP Host per target without CA), HAR 1.2 export, 340+ vulnerability scanner, fuzzer, collaborator OOB server, session handling, match/replace, and guaranteed clean shutdown (3-layer: API graceful + signal handlers + atexit). Competitive with Burp Suite for LAN interception — zero-config device onboarding, no CA required for metadata visibility. 606 backend tests, 0 ESLint errors, silent installer. Target: v2.0.0 with Router Mode, Scope Engine, Mobile Companion.",
    technologies: "Electron, React, TypeScript, FastAPI, Python, mitmproxy, WinDivert, Docker",
    images: [
      { src: "/img/nyx_dashboard.png", alt: "Nyx MITM dashboard" },
      { src: "/img/nyx-icon.png", alt: "Nyx logo" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/nyx" },
    ],
  },
  {
    title: "👻 Phantom — Autonomous Red Team Framework v2.0.0",
    description:
      "Full-spectrum offensive security framework with three integrated modes: (1) C2 Operations Center — cross-platform beacons (Windows PE, Linux ELF, Android ARM64, macOS) with AES-256-GCM + mTLS + HMAC, 35+ commands (shell, screenshot, keylog, inject, SOCKS5, SMB pipe, browser/CDP pivot, cookies, GPS, camera, audio), reflective in-memory loading, NTDLL unhooking, sleep masking, Ekko obfuscation, indirect/direct syscalls; (2) 12 Interactive Pentest Modules — scan, OSINT, web, exploit, brute, payload, handler, analyzer, pivot, wifi, wordlist, report with state-aware suggestions; (3) Autonomous Kill-Chain Agent (WIP) — deterministic planner + anomaly engine runs full kill chain (recon → exploit → beacon deploy → persistence → lateral) without human input, sub-agents for parallel campaigns, social engineering chain (persona → phish → IP grab → network pivot). Includes React + TypeScript Electron GUI (18 views), 101 tests, Docker CI/CD. 68k LOC across Python/C++/ASM/TS. Target: v3.0.0 with BloodHound, Cloud Exploit, Supply Chain, Multi-Operator.",
    technologies: "Python, C++, ASM, FastAPI, aiohttp, React, TypeScript, Electron, Docker, AES-256-GCM, mitmproxy",
    images: [
      { src: "/img/phantomV2.png", alt: "Phantom banner" },
      { src: "/img/phantomC2.png", alt: "Phantom C2" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/phantom" },
    ],
  },
  {
    title: "🛡️ Aegis — XDR/SIEM Ecosystem",
    description:
      "Production-grade XDR/SIEM platform with 5 microservices: Java/Spring Boot ingestion gateway (syslog UDP + HTTP), Python/FastAPI correlation engine with 200+ threat signatures, cross-platform Java/JNA endpoint agent, host telemetry agent, and React dashboard with 12 views. Features SOAR playbook engine, AI-powered analysis (Ollama), anomaly detection, VaultX encrypted notes, and full monitoring stack.",
    technologies: "Java + Spring Boot, Python + FastAPI, React, PostgreSQL, Redis, Docker, Caddy",
    images: [
      { src: "/img/graph.png", alt: "Aegis graph" },
      { src: "/img/mitre.png", alt: "Aegis Mitre ATT&CK section" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/aegis-ecosystem" },
    ],
  },
  {
    title: "🐙 Kraken — Honeypot Intelligence Platform",
    description:
      "Multi-protocol honeypot network (SSH, HTTP, FTP, Telnet) with real-time attack detection, GeoIP enrichment, interactive Docker sandboxes, JWT auth, Telegram alerts, and full Prometheus/Grafana/Alertmanager monitoring stack. Export intelligence reports in CSV, JSON, PDF. Containerized with 10 services, v1.0.0 released.",
    technologies: "Python, FastAPI, asyncssh, PostgreSQL, Redis, Nginx, Docker Compose, Prometheus",
    images: [{ src: "/img/swagger_kraken.png", alt: "API documentation" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/kraken" },
    ],
  },
];

const classicProjects = [
  {
    title: "🖲️ NodeTrace",
    description:
      "Full-stack monitoring platform with real-time telemetry, analytics and multi-language agents (Python, C#, C++, Java). FastAPI backend with anomaly detection (Z-Score), JWT auth, and Chart.js dashboard.",
    technologies: "Python, FastAPI, C#, C++, Java, Chart.js",
    images: [{ src: "/img/dashboard.png", alt: "NodeTrace dashboard" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/nodetrace" },
    ],
  },
  {
    title: "🤖 OSINT Discord Bot",
    description:
      "Modular async Discord bot for OSINT and cybersecurity recon. 10 commands: IP/domain/phone/social/email lookup, port scanning, WHOIS, DNS, subdomain finder, HTTP header analysis. Fully containerized with Docker.",
    technologies: "Python, discord.py, Docker",
    images: [{ src: "/img/all-commands.png", alt: "OSINT bot commands" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/osint-bot-py" },
    ],
  },
  {
    title: "🔐 VaultX",
    description:
      "Secure full-stack note management system with JWT authentication, bcrypt password hashing, and MongoDB persistence. Built with React + Vite frontend and Node.js/Express backend.",
    technologies: "React, Node.js, Express, MongoDB, JWT",
    images: [
      { src: "/img/login_view.png", alt: "VaultX login" },
      { src: "/img/note_view.png", alt: "VaultX notes" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/vaultx" },
    ],
  },
  {
    title: "🛡️ AI Security Suite",
    description:
      "Modular microservice-based cybersecurity toolkit powered by machine learning. Three FastAPI services: Password Strength AI (RandomForest), Log Anomaly Detector (IsolationForest + Autoencoder), and OSINT Analyzer. Unified dark-theme dashboard.",
    technologies: "Python, FastAPI, scikit-learn, TensorFlow, Docker",
    images: [
      { src: "/img/suite.png", alt: "AI Suite dashboard" },
      { src: "/img/osint.png", alt: "OSINT module" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/ai-Security-Suite" },
    ],
  },
  {
    title: "📊 SQL Security Dashboard",
    description:
      "Interactive dashboard for security log analysis with automated data enrichment and 8 dynamic visualizations. Full SQL pipeline: CSV ingestion, trigger-based enrichment, and FastAPI + Matplotlib frontend.",
    technologies: "Python, FastAPI, SQL, Pandas, Matplotlib",
    images: [{ src: "/img/chart.png", alt: "SQL Security Dashboard" }],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/incident-response-sql" },
    ],
  },
  {
    title: "🎮 Text-Based RPG",
    description:
      "Terminal RPG with world map (4 areas), turn-based combat, shop, inventory, NPCs, boss fights, and save/load. Playable in browser via Pyodide.",
    technologies: "Python",
    images: [
      { src: "/img/menu.png", alt: "RPG menu" },
      { src: "/img/village.png", alt: "RPG village" },
    ],
    links: [
      { label: "Live Demo", href: "https://terminal-rpg-live.netlify.app" },
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/adventure-game-py" },
    ],
  },
  {
    title: "🔑 Console Password Manager (C++)",
    description:
      "Console-based password manager with add/list/search/generate/delete operations. XOR encryption for local storage and strong password generator (mt19937_64).",
    technologies: "C++",
    images: [
      { src: "/img/add.png", alt: "Adding a password" },
      { src: "/img/list.png", alt: "Password list" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/password-manager-cpp" },
    ],
  },
  {
    title: "📚 REST API Library (Node.js)",
    description:
      "Simple CRUD REST API for managing a book library with Express. Full GET/POST/PUT/DELETE operations with in-memory storage.",
    technologies: "Node.js, Express",
    images: [
      { src: "/img/first.png", alt: "API GET response" },
      { src: "/img/afterPOST.png", alt: "API POST response" },
    ],
    links: [
      { label: "View code on GitHub →", href: "https://github.com/Terminalkid09/api-library-node" },
    ],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("featured");
  const [modalImage, setModalImage] = useState(null);

  const renderProjectCard = (project) => (
    <div className="project-card" key={project.title}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>
        <strong>Stack:</strong> {project.technologies}
      </p>

      {project.images && project.images.length > 0 && (
        <div className="project-images">
          {project.images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="zoomable"
              onClick={() => setModalImage(image.src)}
            />
          ))}
        </div>
      )}

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
  );

  return (
    <section className="section" id="projects">
      <div className="section-inner">
        <h2 className="section-title">Projects</h2>

        <div className="projects-tabs">
          <button
            className={`tab-button ${activeTab === "featured" ? "active" : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            Main Projects
          </button>
          <button
            className={`tab-button ${activeTab === "classic" ? "active" : ""}`}
            onClick={() => setActiveTab("classic")}
          >
            Earlier Work
          </button>
        </div>

        <div className="project-panel-wrapper">
          <div className={`project-panel ${activeTab === "featured" ? "active" : ""}`}>
            <p className="section-note">Production-grade security systems — C2, SIEM, Honeypot.</p>
            <div className="projects-grid">
              {featuredProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>

          <div className={`project-panel ${activeTab === "classic" ? "active" : ""}`}>
            <p className="section-note">Earlier projects demonstrating growth across different domains.</p>
            <div className="projects-grid">
              {classicProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>
        </div>
      </div>

      {modalImage && (
        <ImageModal src={modalImage} alt="project image" onClose={() => setModalImage(null)} />
      )}
    </section>
  );
}
