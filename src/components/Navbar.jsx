import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#hero" className="logo">Terminalkid09.dev</a>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#hero" className="nav-item" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" className="nav-item" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" className="nav-item" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
