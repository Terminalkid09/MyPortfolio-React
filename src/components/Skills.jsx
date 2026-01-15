import "./Skills.css";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <h2 className="section-title">Skills</h2>

        <ul className="skills-list">
          <li><strong>Languages:</strong> C++, JavaScript, Python</li>
          <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React</li>
          <li><strong>Backend:</strong> Node.js, Express, REST APIs, MongoDB, SQL</li>
          <li><strong>Cybersecurity:</strong> OSINT, Recon, TryHackMe labs</li>
          <li><strong>Tools:</strong> Git, GitHub, VS Code, Netlify, Render</li>
        </ul>
      </div>
    </section>
  );
}