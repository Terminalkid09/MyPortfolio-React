import "./Navbar.css";
import { useState } from "react";

// Skills belongs here: the section has always been rendered between About and
// Projects, but the bar had no link to it, so it could only be reached by
// scrolling.
const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <a href="#hero" className="logo" onClick={closeMenu}>
          terminalkid
          <span className="logo-suffix">09</span>
        </a>

        <button
          type="button"
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
        >
          <span />
          <span />
          <span />
        </button>

        <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-item"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
