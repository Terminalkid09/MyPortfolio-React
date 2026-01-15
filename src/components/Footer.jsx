import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Cristian — All rights reserved.
      </p>

      <div className="footer-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}