import "./Hero.css";

/**
 * The hero.
 *
 * `className` used to read "section-inner, hero-inner" — a comma inside the
 * string, so the element carried the class `section-inner,` and never matched
 * `.section-inner`: the hero had no horizontal padding, and on a phone the
 * text ran to the edges.
 *
 * The `$ whoami` prompt and the mono stack list are gone: they were the
 * terminal costume, down to a monospace font at 13.6px that failed contrast
 * against the background. The role now sits in a single pill above the name,
 * and the stack is three chips — the same `.chip` primitive the Skills grid
 * already uses, so there is one definition of a chip on the page.
 */
export default function Hero() {
  return (
    <section className="section hero" id="hero">
      <div className="section-inner hero-inner">
        <p className="hero-eyebrow reveal">Backend &amp; security engineer</p>

        <h1 className="hero-title reveal">
          Hi, I&apos;m <span className="accent">Terminalkid09</span>
        </h1>

        <p className="hero-subtitle reveal">
          I build production-grade systems — C2 frameworks, SIEM platforms,
          honeypot networks, and AI-powered security tools.
        </p>

        {/* Kept to what does not go stale: no project count to update the day a
         * fifth repository is published. */}
        <ul className="hero-meta reveal">
          <li className="chip">Python · TypeScript · C++</li>
          <li className="chip">Native · Web · Desktop</li>
          <li className="chip">Containerized · tested · CI/CD</li>
        </ul>

        <div className="hero-buttons reveal">
          <a href="#projects" className="btn primary">
            View Projects
          </a>
          <a
            href="https://github.com/Terminalkid09"
            className="btn secondary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#contact" className="btn ghost">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
