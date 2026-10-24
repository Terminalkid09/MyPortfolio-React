#!/usr/bin/env node
/**
 * measure-languages.mjs — regenerate the language split from real code.
 *
 * Two outputs, one measurement:
 *   * src/data/languages.json          (the portfolio's Skills table)
 *   * a marked block in a markdown file (the GitHub profile README)
 *
 * Three ways to find the repositories:
 *   --from-api <user>   ask the GitHub API. Only PUBLIC, non-fork, enabled
 *                       repositories come back, so a repository that turns
 *                       private (or is deleted, or becomes a fork) drops out of
 *                       the count on the next run with no config change. This
 *                       is the mode CI uses.
 *   --repos a,b,c       an explicit list (owner/name or bare name).
 *   (nothing)           scan the sibling directories of this project — the
 *                       local dev mode.
 *
 * Counting rules, and why they are what they are:
 *   * `git ls-files` only: build output, node_modules and virtualenvs can never
 *     leak in, whatever a .gitignore says behind our back.
 *   * generated/vendored directories are dropped even when tracked.
 *   * binaries and >2 MiB blobs are skipped.
 *   * a "no tests" variant is emitted alongside the total, because test code is
 *     a large and honest part of the number.
 *
 * Usage:
 *   node scripts/measure-languages.mjs
 *   node scripts/measure-languages.mjs --from-api Terminalkid09 --workdir "$RUNNER_TEMP/repos"
 *   node scripts/measure-languages.mjs --from-api Terminalkid09 --readme ../Terminalkid09/README.md
 *   node scripts/measure-languages.mjs --dry
 */

import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const OUT = join(ROOT, "src", "data", "languages.json");
const PARENT = resolve(ROOT, "..");
const OWNER = "Terminalkid09";

// ------------------------------------------------------------------- options

const argv = process.argv.slice(2);

function flag(name, fallback = undefined) {
  const at = argv.indexOf(`--${name}`);
  if (at === -1) return fallback;
  const next = argv[at + 1];
  return next && !next.startsWith("--") ? next : true;
}

const DRY = argv.includes("--dry");
const FROM_API = flag("from-api");
const EXPLICIT = flag("repos");
const ROOT_DIR = resolve(String(flag("root", PARENT)));
const WORKDIR = resolve(String(flag("workdir", join(tmpdir(), "secforge-stats"))));
const README = flag("readme");
const EXCLUDE = new Set(
  String(flag("exclude", "") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

// ---------------------------------------------------------------- languages

const PRIMARY = {
  ".py": "Python",
  ".ts": "TypeScript",
  ".tsx": "TypeScript",
  ".mts": "TypeScript",
  ".cts": "TypeScript",
  ".cpp": "C++ / headers",
  ".cc": "C++ / headers",
  ".cxx": "C++ / headers",
  ".hpp": "C++ / headers",
  ".hh": "C++ / headers",
  ".hxx": "C++ / headers",
  ".h": "C++ / headers",
  ".java": "Java",
  ".go": "Go",
};

const OTHER_EXTS = new Set([
  ".js", ".jsx", ".mjs", ".cjs", ".c", ".s", ".asm", ".inc",
  ".sh", ".bash", ".zsh", ".ps1", ".cs", ".sql", ".kt", ".rs",
  ".swift", ".php", ".rb", ".lua", ".dart", ".scala",
]);

const OTHER_NOTE = "JS, Shell, PowerShell, C, ASM, C#, SQL";
const OTHER_LABEL = `Other (${OTHER_NOTE})`;

// Paths that are never "my source", even when someone committed them.
const EXCLUDED_DIRS = new Set([
  "node_modules", "dist", "build", "out", "vendor", "vendored",
  "third_party", "third-party", "thirdparty", ".venv", "venv",
  "site-packages", "__pycache__", ".next", "coverage", ".pytest_cache",
  ".mypy_cache", ".ruff_cache", "egg-info", "target", "obj", "bin",
  "migrations", "alembic", // generated DDL, not authored logic
]);

const EXCLUDED_FILES =
  /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$|\.min\.(js|css)$|\.lock$/;

const TEST_PATH = /(^|\/)(tests?|__tests__|spec|e2e|fixtures)\//i;
const TEST_FILE =
  /(^|\/)(test_[^/]+|[^/]+_test\.[a-z]+|[^/]+\.(test|spec)\.[a-z]+)$/i;

// ------------------------------------------------------------------ plumbing

function sh(cwd, args) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

/** Repositories found by scanning the parent directory (local dev mode). */
function siblingRepos() {
  if (!existsSync(ROOT_DIR)) return [];
  const repos = [];
  for (const name of readdirSync(ROOT_DIR)) {
    const dir = join(ROOT_DIR, name);
    if (!existsSync(join(dir, ".git"))) continue;
    if (!statSync(dir).isDirectory()) continue;
    let url = "";
    try {
      url = sh(dir, ["remote", "get-url", "origin"]).trim();
    } catch {
      continue; // no origin means it is not one of the public ones
    }
    if (!url.toLowerCase().includes(OWNER.toLowerCase())) continue;
    repos.push({ name, dir, url: "" });
  }
  return repos.sort((a, b) => a.name.localeCompare(b.name));
}

function cloneUrl(name, owner) {
  return `https://github.com/${owner}/${name}.git`;
}

/**
 * Every repository the API reports as public and owned by `user`.
 *
 * The `private === false` filter is the whole point: visibility is decided by
 * GitHub, not by a list in this file, so nothing has to be edited when a
 * repository is made private, archived-by-deletion or turned into a fork.
 */
async function apiRepos(user) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "secforge-stats",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const all = [];
  for (let page = 1; page <= 10; page += 1) {
    const url =
      `https://api.github.com/users/${user}/repos` +
      `?per_page=100&type=owner&sort=pushed&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} ${res.statusText}: ${url}`);
    }
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all
    .filter((r) => r.private === false && r.fork === false && !r.disabled)
    .map((r) => ({
      name: r.name,
      dir: join(WORKDIR, r.name),
      url: r.clone_url || cloneUrl(r.name, user),
    }));
}

function explicitRepos(spec) {
  return String(spec)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const [owner, name] = entry.includes("/")
        ? entry.split("/")
        : [OWNER, entry];
      return { name, dir: join(WORKDIR, name), url: cloneUrl(name, owner) };
    });
}

function ensureClone(repo) {
  if (!repo.url) return;
  if (existsSync(join(repo.dir, ".git"))) return;
  execFileSync(
    "git",
    ["clone", "--depth", "1", "--quiet", repo.url, repo.dir],
    { stdio: "inherit" },
  );
}

// -------------------------------------------------------------------- measure

function isExcluded(path) {
  if (EXCLUDED_FILES.test(path)) return true;
  const dirs = path.toLowerCase().split("/").slice(0, -1);
  return dirs.some((d) => EXCLUDED_DIRS.has(d));
}

function countLines(abs) {
  let buf;
  try {
    buf = readFileSync(abs);
  } catch {
    return 0;
  }
  if (buf.length === 0) return 0;
  if (buf.subarray(0, 8192).includes(0)) return 0; // binary
  if (buf.length > 2 * 1024 * 1024) return 0; // generated blob
  let n = 0;
  for (let i = 0; i < buf.length; i += 1) if (buf[i] === 10) n += 1;
  if (buf[buf.length - 1] !== 10) n += 1;
  return n;
}

function bucketOf(path) {
  const dot = path.lastIndexOf(".");
  if (dot < 0) return null;
  const ext = path.slice(dot).toLowerCase();
  if (PRIMARY[ext]) return PRIMARY[ext];
  if (OTHER_EXTS.has(ext)) return "Other";
  return null;
}

const pct = (part, total) =>
  total ? Math.round((part / total) * 1000) / 10 : 0;

// ------------------------------------------------------------------ rendering

const fmt = (n) => n.toLocaleString("en-US");

/** 20-cell bar. Sub-cell shares get one thin block so they stay visible. */
function bar(share) {
  const cells = 20;
  let full = Math.round(share / (100 / cells));
  if (full === 0 && share > 0) return `▏${"░".repeat(cells - 1)}`;
  if (full >= cells) return "█".repeat(cells);
  return "█".repeat(full) + "░".repeat(cells - full);
}

/** Pie legends read better with the short name than the table header. */
function pieLabel(name) {
  if (name === "Other") return OTHER_LABEL;
  if (name === "C++ / headers") return "C++";
  return name;
}

function readmeBlock(payload) {
  const lean = payload.excludingTests.split;
  const rows = payload.languages.map((l) => {
    const name =
      l.name === "Other" ? `**Other** (${OTHER_NOTE})` : `**${l.name}**`;
    return `| ${name} | ${fmt(l.lines)} | ${l.share.toFixed(1)}% | \`${bar(
      l.share,
    )}\` |`;
  });

  const lines = [
    "<!-- stats:start -->",
    "Where the code actually is, rather than where I would like it to be — source lines",
    "across my own repositories, tracked files only (vendored dependencies, generated",
    "code and build output excluded):",
    "",
    "```mermaid",
    "pie showData",
    "    title Source lines by language",
    ...payload.languages.map(
      (l) => `    "${pieLabel(l.name)}" : ${l.lines}`,
    ),
    "```",
    "",
    "| Language | Lines | Share | Share of all source lines |",
    "|---|---:|---:|---|",
    ...rows,
    "",
    "One bar is a 20-cell scale: the small ones are small on purpose. That is the honest",
    "picture — Python is where most of the work happens (platform backends, automation",
    "and the test suites), TypeScript is the desktop and dashboard layer, C++ is the",
    "native side (beacons, injection, syscalls).",
    "",
    "The figures include test suites, which are a large part of the work here; excluding",
    `test files the split is Python ${lean.Python}%, TypeScript ${lean.TypeScript}%, C++ ${
      lean["C++ / headers"]
    }%, Java ${lean.Java}%, Go ${lean.Go}%.`,
    `Measured over the tracked source of every repository above, on ${payload.generatedAt}.`,
    "<!-- stats:end -->",
  ];
  return lines.join("\n");
}

function writeReadme(file, payload) {
  const marker = /<!-- stats:start -->[\s\S]*?<!-- stats:end -->/;
  const text = readFileSync(file, "utf8");
  if (!marker.test(text)) {
    throw new Error(
      `${file} has no <!-- stats:start --> / <!-- stats:end --> block`,
    );
  }
  const next = text.replace(marker, readmeBlock(payload));
  if (next === text) {
    console.log(`[stats] ${file} already up to date`);
    return;
  }
  writeFileSync(file, next, "utf8");
  console.log(`[stats] rewrote the stats block in ${file}`);
}

// ---------------------------------------------------------------------- main

let repos;
if (FROM_API) {
  repos = await apiRepos(String(FROM_API));
  console.log(`[stats] GitHub API: ${repos.length} public repositor(ies)`);
} else if (EXPLICIT) {
  repos = explicitRepos(EXPLICIT);
} else {
  repos = siblingRepos();
}

repos = repos.filter((r) => !EXCLUDE.has(r.name.toLowerCase()));

const counters = { all: new Map(), noTests: new Map() };
const perRepo = [];
let files = 0;

for (const repo of repos) {
  ensureClone(repo);
  if (!existsSync(join(repo.dir, ".git"))) {
    console.warn(`[stats] skip ${repo.name}: not a git checkout`);
    continue;
  }
  let listed;
  try {
    listed = sh(repo.dir, ["ls-files"]).split("\n").filter(Boolean);
  } catch {
    continue;
  }
  let repoLines = 0;
  let repoFiles = 0;
  for (const path of listed) {
    if (isExcluded(path)) continue;
    const tool = bucketOf(path);
    if (!tool) continue;
    const n = countLines(join(repo.dir, path));
    if (!n) continue;
    repoFiles += 1;
    repoLines += n;
    counters.all.set(tool, (counters.all.get(tool) || 0) + n);
    if (!(TEST_PATH.test(path) || TEST_FILE.test(path))) {
      counters.noTests.set(tool, (counters.noTests.get(tool) || 0) + n);
    }
  }
  if (repoFiles) perRepo.push({ name: repo.name, files: repoFiles, lines: repoLines });
  files += repoFiles;
}

if (!counters.all.size) {
  console.log(
    "[stats] no repository measured — keeping the committed snapshot.",
  );
  process.exit(0);
}

function table(map) {
  const total = [...map.values()].reduce((a, b) => a + b, 0);
  return {
    total,
    languages: [...map.entries()]
      .map(([name, lines]) => ({ name, lines, share: pct(lines, total) }))
      .sort((a, b) => b.lines - a.lines),
  };
}

const full = table(counters.all);
const lean = table(counters.noTests);

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: FROM_API
    ? `GitHub API, public non-fork repositories owned by ${FROM_API}`
    : `git ls-files over the repositories owned by ${OWNER}`,
  files,
  repos: perRepo,
  total: full.total,
  languages: full.languages,
  excludingTests: {
    total: lean.total,
    languages: lean.languages,
    split: Object.fromEntries(lean.languages.map((l) => [l.name, l.share])),
  },
};

if (DRY) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

if (README) {
  writeReadme(resolve(String(README)), payload);
} else {
  writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`[stats] wrote ${OUT}`);
}

console.log(
  `[stats] ${files} files, ${full.total.toLocaleString("en-US")} lines across ${perRepo.length} repos`,
);
for (const l of full.languages) {
  console.log(
    `  ${l.name.padEnd(16)} ${String(l.lines).padStart(9)}  ${l.share}%`,
  );
}
