import "./Skills.css";

export default function Skills() {
  const categories = [
    {
      title: "Languages",
      items: ["Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Backend & Frameworks",
      items: ["FastAPI", "Spring Boot", "Node.js/Express", "SQLAlchemy", "Alembic", "asyncio", "aiohttp", "mitmproxy"],
    },
    {
      title: "Security & Offensive",
      items: ["C2 Frameworks", "Beacon Development", "AMSI/ETW Evasion", "SIEM/XDR", "Honeypots", "OSINT", "Penetration Testing", "MITM/Proxy", "WinDivert", "Reflective Loading", "Syscalls"],
    },
    {
      title: "Databases & Infrastructure",
      items: ["PostgreSQL", "Redis", "MongoDB", "Docker", "Docker Compose", "Nginx", "GitLab CI", "GitHub Actions", "Caddy"],
    },
    {
      title: "Frontend & Desktop",
      items: ["React", "Vite", "Tailwind CSS", "Electron", "TypeScript", "HTML/CSS"],
    },
    {
      title: "AI / ML",
      items: ["Ollama", "scikit-learn", "TensorFlow/Keras", "LLM Integration"],
    },
  ];

  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skill-category" key={cat.title}>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.items.map((item) => (
                  <span className="skill-tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
