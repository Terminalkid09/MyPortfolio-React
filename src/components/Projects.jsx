import "./Projects.css";
import { useState } from "react";
import ImageModal from "./ImageModal";

export default function Projects() {
  const [modalImage, setModalImage] = useState(null);

  return (
    <section className="section" id="projects">
      <div className="section-inner">
        <h2 className="section-title">Projects</h2>

        <div className="projects-grid">

          {/* Password Manager */}
          <div className="project-card">
            <h3>🔑 Console Password Manager in C++</h3>
            <p>Console password manager with add, list, search and generate functions.</p>
            <p><strong>Language:</strong> C++</p>

            <div className="project-images">
              <img
                src="/img/add.png"
                alt="Adding a password"
                className="zoomable"
                onClick={() => setModalImage("/img/add.png")}
              />
              <img
                src="/img/list.png"
                alt="Password list"
                className="zoomable"
                onClick={() => setModalImage("/img/list.png")}
              />
            </div>

            <a
              href="https://github.com/Terminalkid09/password-manager-cpp"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

          {/* Node.js API */}
          <div className="project-card">
            <h3>📚 REST API Library with Node.js</h3>
            <p>CRUD REST API to manage books (GET, POST, PUT, DELETE).</p>
            <p><strong>Technologies:</strong> Node.js, Express</p>

            <div className="project-images">
              <img
                src="/img/first.png"
                alt="API GET response"
                className="zoomable"
                onClick={() => setModalImage("/img/first.png")}
              />
              <img
                src="/img/afterPOST.png"
                alt="API POST response"
                className="zoomable"
                onClick={() => setModalImage("/img/afterPOST.png")}
              />
            </div>

            <a
              href="https://github.com/Terminalkid09/api-library-node"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

          {/* Python RPG */}
          <div className="project-card">
            <h3>🎮 Text-based Adventure Game in Python</h3>
            <p>Terminal RPG with world map, enemies, bosses, shop, inventory and combat.</p>
            <p><strong>Language:</strong> Python</p>

            <div className="project-images">
              <img
                src="/img/menu.png"
                alt="RPG menu"
                className="zoomable"
                onClick={() => setModalImage("/img/menu.png")}
              />
              <img
                src="/img/village.png"
                alt="RPG village"
                className="zoomable"
                onClick={() => setModalImage("/img/village.png")}
              />
              <img
                src="/img/fight.png"
                alt="RPG combat"
                className="zoomable"
                onClick={() => setModalImage("/img/fight.png")}
              />
            </div>

            <a
              href="https://terminal-rpg-live.netlify.app"
              target="_blank"
              className="project-link"
            >
              🎮 Live Demo
            </a>

            <br />

            <a
              href="https://github.com/Terminalkid09/adventure-game-py"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

          {/* OSINT Bot */}
          <div className="project-card">
            <h3>🤖 OSINT Discord Bot in Python</h3>
            <p>Modular Discord bot for OSINT and cybersecurity recon tasks.</p>
            <p><strong>Language:</strong> Python</p>

            <div className="project-images">
              <img
                src="/img/all-commands.png"
                alt="OSINT bot commands"
                className="zoomable"
                onClick={() => setModalImage("/img/all-commands.png")}
              />
            </div>

            <a
              href="https://github.com/Terminalkid09/osint-bot-py"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

          {/* AI Security Suite */}
          <div className="project-card">
            <h3>🛡️ AI Security Suite</h3>
            <p>Multi-service cybersecurity toolkit powered by machine learning.</p>
            <p><strong>Technologies:</strong> Python, FastAPI, ML</p>

            <div className="project-images">
              <img
                src="/img/suite.png"
                alt="AI Suite dashboard"
                className="zoomable"
                onClick={() => setModalImage("/img/suite.png")}
              />
              <img
                src="/img/osint.png"
                alt="OSINT module"
                className="zoomable"
                onClick={() => setModalImage("/img/osint.png")}
              />
            </div>

            <a
              href="https://github.com/Terminalkid09/ai-Security-Suite"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

          {/* VaultX */}
          <div className="project-card">
            <h3>🔐 VaultX</h3>
            <p>Secure, modern and full-stack note management system.</p>
            <p><strong>Technologies:</strong> React, Node.js, Express, MongoDB</p>

            <div className="project-images">
              <img
                src="/img/login_view.png"
                alt="VaultX login"
                className="zoomable"
                onClick={() => setModalImage("/img/login_view.png")}
              />
              <img
                src="/img/note_view.png"
                alt="VaultX notes"
                className="zoomable"
                onClick={() => setModalImage("/img/note_view.png")}
              />
            </div>

            <a
              href="https://github.com/Terminalkid09/vaultx"
              target="_blank"
              className="project-link"
            >
              View code on GitHub →
            </a>
          </div>

        </div>

        <p className="more-coming">More projects coming soon...</p>
      </div>

      {/* MODAL */}
      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="project image"
          onClose={() => setModalImage(null)}
        />
      )}
    </section>
  );
}