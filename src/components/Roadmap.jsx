import { useState } from "react";
import "./Roadmap.css";

export default function Roadmap() {
  const [isOpen, setIsOpen] = useState(false);

  const roadmapItems = [
    {
      category: "Nyx",
      currentVersion: "v1.0.0",
      targetVersion: "v2.0.0",
      items: [
        { title: "Transparent MITM Proxy", done: true, desc: "DHCP-first stealth + ARP fallback, QUIC/HTTP3 blocking" },
        { title: "Activity Monitor", done: true, desc: "Live SNI + HTTP Host per target without CA" },
        { title: "HAR 1.2 Export", done: true, desc: "One-click traffic export for analysis" },
        { title: "340+ Vulnerability Scanner", done: true, desc: "Passive + active scanning with auto-exploit" },
        { title: "Collaborator OOB Server", done: true, desc: "HTTP/DNS interaction detection" },
        { title: "Guaranteed Clean Shutdown", done: true, desc: "3-layer: API graceful + signal handlers + atexit" },
        { title: "Router Mode (SoftAP + NAT)", done: false, desc: "hostapd/SoftAP, nftables/netsh, DHCP, deauth/KARMA" },
        { title: "Scope Enforcement Engine", done: false, desc: "Allowlist/denylist MAC/OUI/SSID, audit trail" },
        { title: "Public IP Spoofing (VPS upstream)", done: false, desc: "Egress selection: direct/VPN/VPS/Tor" },
        { title: "Mobile Companion App", done: false, desc: "Kotlin + Rust JNI, VpnService, rogue AP recon" },
      ],
    },
    {
      category: "Phantom",
      currentVersion: "v2.0.0",
      targetVersion: "v3.0.0",
      items: [
        { title: "C2 Operations Center", done: true, desc: "Cross-platform beacons (Win/Linux/Android/macOS), AES-256-GCM + mTLS, 35+ commands" },
        { title: "12 Pentest Modules", done: true, desc: "Scan, OSINT, Web, Exploit, Brute, Payload, Handler, Analyzer, Pivot, WiFi, Wordlist, Report" },
        { title: "Electron GUI (18 views)", done: true, desc: "C2 Dashboard, Session, Auto-Mode, Modules, Network Map, Reports, Timeline, Vault" },
        { title: "Autonomous Kill-Chain Agent", done: false, desc: "Deterministic planner + anomaly engine, full chain without human input" },
        { title: "Sub-Agent Parallel Campaigns", done: false, desc: "Multiple agents targeting different hosts simultaneously" },
        { title: "Social Engineering Chain", done: false, desc: "Persona → breach check → phish delivery → IP grab → network pivot" },
        { title: "BloodHound Integration", done: false, desc: "AD attack path mapping, Kerberoasting, GPO abuse paths" },
        { title: "Cloud Exploitation (AWS/Azure/GCP)", done: false, desc: "IAM enumeration, privilege escalation, container escape" },
        { title: "Supply Chain & API Security", done: false, desc: "Dependency confusion, typosquatting, REST/GraphQL testing" },
        { title: "Multi-Operator Collaboration", done: false, desc: "Real-time session sharing, shared WorldModel, RBAC" },
      ],
    },
  ];

  return (
    <section className="section roadmap" id="roadmap">
      <div className="section-inner">
        <div className="roadmap-header">
          <h2 className="section-title">Roadmap</h2>
          <button
            className={`roadmap-toggle ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="roadmap-content"
          >
            <span className="toggle-text">{isOpen ? "Hide Roadmap" : "Show Roadmap"}</span>
            <span className="toggle-arrow" />
          </button>
        </div>

        <div
          id="roadmap-content"
          className={`roadmap-content ${isOpen ? "open" : "closed"}`}
          role="region"
          aria-label="Project roadmap"
        >
          <p className="roadmap-intro">
            Transparency on what&apos;s shipped, what&apos;s in progress, and what&apos;s planned.
            <span className="legend-inline">
              <span className="legend-dot-inline done" />
              <span>Done</span>
              <span className="legend-dot-inline wip" />
              <span>In Progress</span>
              <span className="legend-dot-inline planned" />
              <span>Planned</span>
            </span>
          </p>

          {roadmapItems.map((cat) => (
            <div key={cat.category} className="roadmap-category">
              <div className="roadmap-category-header">
                <div className="roadmap-version-info">
                  <h3 className="roadmap-category-title">{cat.category}</h3>
                  <div className="version-badges">
                    <span className="version-badge current">Current: {cat.currentVersion}</span>
                    <span className="version-badge target">Target: {cat.targetVersion}</span>
                  </div>
                </div>
              </div>

              <div className="roadmap-timeline">
                {cat.items.map((item, idx) => (
                  <div key={`${cat.category}-${idx}`} className={`roadmap-item ${item.done ? "done" : "wip"}`}>
                    <div className="roadmap-marker">
                      <span className="roadmap-dot" />
                      <span className="roadmap-line" />
                    </div>
                    <div className="roadmap-content">
                      <div className="roadmap-item-header">
                        <h4 className="roadmap-item-title">{item.title}</h4>
                        <span className={`roadmap-badge ${item.done ? "done" : "wip"}`}>
                          {item.done ? "Done" : "In Progress"}
                        </span>
                      </div>
                      <p className="roadmap-item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}