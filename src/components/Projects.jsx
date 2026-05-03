import "./Projects.css";
import { useState } from "react";
import ImageModal from "./ImageModal";

const featuredProjects = [
  {
    title: "🤖 OSINT Discord Bot in Python",
    description:
      "Modular Discord bot for OSINT and cybersecurity recon tasks, built to automate data collection, domain intelligence and situational awareness workflows.",
    technologies: "Python, Discord.py",
    images: [
      {
        src: "/img/all-commands.png",
        alt: "OSINT bot commands",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/osint-bot-py",
      },
    ],
  },
  {
    title: "👻 Phantom",
    description:
      "Phantom is a Python-based offensive security CLI framework that orchestrates reconnaissance, OSINT, web testing, brute force, exploitation, and reporting into a single interactive session. It keeps the operator in control with previewable, editable command workflows, target/scope management, and exportable session reports.",
    technologies: "Python, rich, nmap, scapy, reportlab",
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/phantom",
      },
    ],
  },
  {
    title: "🖲️ NodeTrace",
    description:
      "Full-stack monitoring platform with real-time telemetry, analytics and multi-language agents. NodeTrace combines Python FastAPI backend services with agent tooling in Python, C#, C++ and Java for complete visibility and event tracking.",
    technologies: "Python, FastAPI, multi-language agents",
    images: [
      {
        src: "/img/dashboard.png",
        alt: "NodeTrace dashboard",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/nodetrace",
      },
    ],
  },
  {
    title: "🔐 VaultX",
    description:
      "Secure full-stack note management system with modern UI, authentication, encrypted storage patterns and a React + Node.js + MongoDB architecture for real-world productivity workflows.",
    technologies: "React, Node.js, Express, MongoDB",
    images: [
      {
        src: "/img/login_view.png",
        alt: "VaultX login",
      },
      {
        src: "/img/note_view.png",
        alt: "VaultX notes",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/vaultx",
      },
    ],
  },
  {
    title: "📊 SQL Security Dashboard",
    description:
      "Interactive dashboard for security log analysis with automated data enrichment and multiple visualizations. The tool helps surface incidents, trends and anomalies from SQL-driven datasets for incident response workflows.",
    technologies: "Python, SQL, Pandas, Matplotlib, Jinja2",
    images: [
      {
        src: "/img/chart.png",
        alt: "SQL Security Dashboard",
      },
    ],
    links: [
      {
        label: "🖥️ Live Demo",
        href: "https://sql-dashboard-m2gh.onrender.com",
      },
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/incident-response-sql",
      },
    ],
  },
];

const classicProjects = [
  {
    title: "🔑 Console Password Manager in C++",
    description: "Console password manager with add, list, search and generate functions.",
    technologies: "C++",
    images: [
      {
        src: "/img/add.png",
        alt: "Adding a password",
      },
      {
        src: "/img/list.png",
        alt: "Password list",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/password-manager-cpp",
      },
    ],
  },
  {
    title: "📚 REST API Library with Node.js",
    description: "CRUD REST API to manage books (GET, POST, PUT, DELETE).",
    technologies: "Node.js, Express",
    images: [
      {
        src: "/img/first.png",
        alt: "API GET response",
      },
      {
        src: "/img/afterPOST.png",
        alt: "API POST response",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/api-library-node",
      },
    ],
  },
  {
    title: "🎮 Text-based Adventure Game in Python",
    description: "Terminal RPG with world map, enemies, bosses, shop, inventory and combat.",
    technologies: "Python",
    images: [
      {
        src: "/img/menu.png",
        alt: "RPG menu",
      },
      {
        src: "/img/village.png",
        alt: "RPG village",
      },
      {
        src: "/img/fight.png",
        alt: "RPG combat",
      },
    ],
    links: [
      {
        label: "🎮 Live Demo",
        href: "https://terminal-rpg-live.netlify.app",
      },
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/adventure-game-py",
      },
    ],
  },
  {
    title: "🛡️ AI Security Suite",
    description: "Multi-service cybersecurity toolkit powered by machine learning.",
    technologies: "Python, FastAPI, ML",
    images: [
      {
        src: "/img/suite.png",
        alt: "AI Suite dashboard",
      },
      {
        src: "/img/osint.png",
        alt: "OSINT module",
      },
    ],
    links: [
      {
        label: "View code on GitHub →",
        href: "https://github.com/Terminalkid09/ai-Security-Suite",
      },
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
        <strong>Technologies:</strong> {project.technologies}
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
            Big / Important Projects
          </button>
          <button
            className={`tab-button ${activeTab === "classic" ? "active" : ""}`}
            onClick={() => setActiveTab("classic")}
          >
            Older / Basic Projects
          </button>
        </div>

        <div className="project-panel-wrapper">
          <div className={`project-panel ${activeTab === "featured" ? "active" : ""}`}>
            <p className="section-note">Featured projects built for larger security workflows, OSINT tooling and monitoring.</p>
            <div className="projects-grid">
              {featuredProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>

          <div className={`project-panel ${activeTab === "classic" ? "active" : ""}`}>
            <p className="section-note">Earlier and smaller projects with simpler implementations.</p>
            <div className="projects-grid">
              {classicProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>
        </div>

        <p className="more-coming">More projects coming soon...</p>
      </div>

      {modalImage && (
        <ImageModal src={modalImage} alt="project image" onClose={() => setModalImage(null)} />
      )}
    </section>
  );
}