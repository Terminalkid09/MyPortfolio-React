import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Terminalkid09 — All rights reserved.
      </p>

      <div className="footer-links">
        <a
          href="https://github.com/Terminalkid09"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:Terminalkid09@gmail.com">Email</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}
