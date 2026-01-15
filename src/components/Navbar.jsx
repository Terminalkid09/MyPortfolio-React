import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#hero" className="logo">Terminalkid09.dev</a>
        <div className="nav-links">
          <a href="#hero" className="nav-item">Home</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#projects" className="nav-item">Projects</a>
          <a href="#contact" className="nav-item">Contact</a>
        </div>
      </div>
    </nav>
  );
}