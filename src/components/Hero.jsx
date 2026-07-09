import "./Hero.css";

export default function Hero() {
  return (
    <section className="section hero" id="hero">
      <div className="section-inner, hero-inner">

        <h1 className="hero-title reveal">
          Hi, I'm <span className="accent">Terminalkid09</span>
        </h1>

        <p className="hero-subtitle reveal">
          Backend & security engineer. Building production-grade systems — C2 frameworks, SIEM platforms, honeypot networks, and AI-powered security tools.
        </p>

        <div className="hero-buttons reveal">
          <a href="#projects" className="btn primary">View Projects</a>
          <a href="#contact" className="btn secondary">Contact Me</a>
        </div>

      </div>
    </section>
  );
}