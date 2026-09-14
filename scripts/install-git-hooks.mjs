#!/usr/bin/env node
/**
 * Point this repo at committed hooks in .githooks/
 * Safe to run from npm prepare — no-ops when .git is missing.
 */
import { execSync } from "node:child_process";
import { chmodSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

if (!existsSync(".git") || !existsSync(".githooks")) {
  process.exit(0);
}

try {
  execSync("git config core.hooksPath .githooks", { stdio: "ignore" });
  for (const name of readdirSync(".githooks")) {
    const path = join(".githooks", name);
    if (name.startsWith(".")) continue;
    chmodSync(path, 0o755);
  }
} catch {
  // Environments without git (CI tarball installs) skip quietly.
}
