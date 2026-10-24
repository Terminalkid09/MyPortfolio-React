#!/usr/bin/env node
/**
 * measure-languages.mjs — regenerate src/data/languages.json.
 *
 * The portfolio used to carry the language table as a hand-maintained constant
 * in Skills.jsx, with a comment claiming it was "measured". It was measured
 * exactly once: every commit after that made it a lie, and the GitHub profile
 * README quotes the same numbers, so the two drifted independently.
 *
 * This script is the fix. It counts `git ls-files` over every repository you
 * own next to this one, so the table is a measurement or it is a committed
 * snapshot of the last measurement — never an estimate.
 *
 * Rules:
 *   * tracked files only (git ls-files): build output, node_modules and
 *     virtualenvs can never leak in, whatever a .gitignore says behind our back
 *   * generated/vendored directories are dropped even when tracked
 *   * binaries are detected and skipped (NUL byte in the first 8 KiB)
 *   * a "no tests" variant is emitted alongside the total, because test code
 *     is a large and honest part of the number
 *
 * Usage:
 *   node scripts/measure-languages.mjs            # discover sibling repos
 *   node scripts/measure-languages.mjs --dry      # print, do not write
 *
 * Exits 0 even when no repository is found: on a CI host that checks out only
 * this repo, the committed snapshot is the correct answer, not a failure.
 */

import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const OUT = join(ROOT, "src", "data", "languages.json");
const PARENT = resolve(ROOT, "..");
const OWNER = "Terminalkid09";
const DRY = process.argv.includes("--dry");

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

const OTHER_LABEL = "Other (JS, Shell, PowerShell, C, ASM, C#, SQL)";

// Paths that are never "my source", even when someone committed them.
const EXCLUDED_DIRS = new Set([
  "node_modules", "dist", "build", "out", "vendor", "vendored",
  "third_party", "third-party", "thirdparty", ".venv", "venv",
  "site-packages", "__pycache__", ".next", "coverage", ".pytest_cache",
  ".mypy_cache", ".ruff_cache", "egg-info", "target", "obj", "bin",
  "migrations", "alembic", // generated DDL, not authored logic
]);

const EXCLUDED_FILES = /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$|\.min\.(js|css)$|\.lock$/;

const TEST_PATH = /(^|\/)(tests?|__tests__|spec|e2e|fixtures)\//i;
const TEST_FILE = /(^|\/)(test_[^/]+|[^/]+_test\.[a-z]+|[^/]+\.(test|spec)\.[a-z]+)$/i;

// ------------------------------------------------------------------ helpers

function sh(cwd, args) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function ownedRepos() {
  if (!existsSync(PARENT)) return [];
  const repos = [];
  for (const name of readdirSync(PARENT)) {
    const dir = join(PARENT, name);
    if (!existsSync(join(dir, ".git"))) continue;
    if (!statSync(dir).isDirectory()) continue;
    let url = "";
    try {
      url = sh(dir, ["remote", "get-url", "origin"]).trim();
    } catch {
      continue; // a repo with no origin is not one of the public ones
    }
    if (!url.toLowerCase().includes(OWNER.toLowerCase())) continue;
    repos.push({ name, dir });
  }
  return repos.sort((a, b) => a.name.localeCompare(b.name));
}

function isExcluded(path) {
  if (EXCLUDED_FILES.test(path)) return true;
  const parts = path.toLowerCase().split("/");
  const dirs = parts.slice(0, -1);
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

function pct(part, total) {
  return total ? Math.round((part / total) * 1000) / 10 : 0;
}

// -------------------------------------------------------------------- measure

const counters = { all: new Map(), noTests: new Map() };
const perRepo = [];
let files = 0;

for (const repo of ownedRepos()) {
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
    "[stats] no owned repository found next to this project — keeping the committed snapshot.",
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
  source: `git ls-files over the repositories owned by ${OWNER}`,
  files,
  repos: perRepo,
  total: full.total,
  languages: full.languages,
  excludingTests: {
    total: lean.total,
    languages: lean.languages,
    // the two or three labels the UI shows as "excluding test files"
    split: Object.fromEntries(lean.languages.slice(0, 5).map((l) => [l.name, l.share])),
  },
};

if (DRY) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `[stats] ${files} files, ${full.total.toLocaleString("en-US")} lines across ${perRepo.length} repos -> src/data/languages.json`,
);
for (const l of full.languages) {
  console.log(`  ${l.name.padEnd(16)} ${String(l.lines).padStart(9)}  ${l.share}%`);
}
