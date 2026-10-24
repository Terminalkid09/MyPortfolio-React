import "./Skills.css";
import stats from "../data/languages.json";

// The language split is MEASURED, not decoration. `npm run stats`
// (scripts/measure-languages.mjs) counts git-tracked source lines across every
// repository owned by Terminalkid09 and writes src/data/languages.json; nothing
// on this table is typed by hand, so it cannot rot between commits.
//
// The GitHub profile README quotes the same snapshot: when the numbers move,
// regenerate both from one run of the script rather than editing one of them.
const languages = stats.languages.map((language) => ({
  name: language.name,
  lines: language.lines,
  share: language.share,
  note:
    language.name === "Other"
      ? "JS, Shell, PowerShell, C, ASM, C#, SQL"
      : undefined,
}));

// The "excluding tests" split comes from the same run, so the sentence below
// cannot disagree with the bars above it.
const lean = stats.excludingTests.split;
const leanPct = (name) => `${Math.round(lean[name])}%`;

const categories = [
  {
    title: "Languages",
    items: ["Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Backend & Frameworks",
    items: [
      "FastAPI",
      "Spring Boot",
      "Node.js/Express",
      "SQLAlchemy",
      "Alembic",
      "asyncio",
      "aiohttp",
      "mitmproxy",
    ],
  },
  {
    title: "Security & Offensive",
    items: [
      "C2 Frameworks",
      "Beacon Development",
      "AMSI/ETW Evasion",
      "SIEM/XDR",
      "Honeypots",
      "OSINT",
      "Penetration Testing",
      "MITM/Proxy",
      "WinDivert",
      "Reflective Loading",
      "Syscalls",
    ],
  },
  {
    title: "Databases & Infrastructure",
    items: [
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Docker",
      "Docker Compose",
      "Nginx",
      "GitLab CI",
      "GitHub Actions",
      "Caddy",
    ],
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

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <h2 className="section-title">Skills</h2>
        <p className="section-note">
          Where the code actually is, and what it is written with.
        </p>

        <div className="stack-block">
          <h3 className="stack-title">Language distribution</h3>

          <ul className="stack-rows">
            {languages.map((language) => (
              <li key={language.name} className="stack-row">
                <span className="stack-name">{language.name}</span>
                <span className="stack-track" aria-hidden="true">
                  <span
                    className="stack-fill"
                    style={{ width: `${language.share}%` }}
                  />
                </span>
                <span className="stack-value">
                  {language.share}%
                  <span className="stack-lines">
                    {language.lines.toLocaleString("en-US")} lines
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="stack-note">
            Source lines in my tracked files, {stats.generatedAt}; test suites
            are included, and excluding them the split is Python{" "}
            {leanPct("Python")}, TypeScript {leanPct("TypeScript")}, C++{" "}
            {leanPct("C++ / headers")}. The smaller bars are small on purpose —
            Python is where most of the work happens.
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((category) => (
            <div className="skill-category" key={category.title}>
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
