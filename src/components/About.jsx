import "./About.css";
import { AGE } from "../data/profile";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          <div className="about-card">
            <p>
              I&apos;m a {AGE}-year-old self-taught backend &amp; security engineer
              from Italy. I design and build production-grade security systems —
              C2 frameworks, SIEM platforms, honeypot networks, MITM interception
              tools, and AI-powered security tooling.
            </p>
            <p>
              My projects span the full stack: Python/FastAPI async backends,
              Java/Spring Boot ingestion gateways, C++ native beacons with
              evasion techniques, cross-platform agents, Electron/React desktop
              apps, and React dashboards. Every system is containerized, tested,
              and CI/CD-ready.
            </p>
            <p>
              I learn by building real tools that solve real problems — clean
              architecture, security fundamentals, and systems that work in
              production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
