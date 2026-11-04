// Which perseus-mcp is running, for get_server_info: its version, the commit
// it was built from, and whether it runs from the testers' bundle or from
// this repo.
import {spawnSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export type BuildInfo = {
    version: string;
    /** The commit, with "-dirty" if the work tree had changes; null if unknown. */
    commit: string | null;
    source: "bundle" | "repo";
};

/** The commit the work tree at `dir` is on, or null outside a git checkout. */
export function gitCommit(dir: string): string | null {
    const head = spawnSync("git", ["rev-parse", "--short", "HEAD"], {
        cwd: dir,
        encoding: "utf8",
    });
    if (head.status !== 0) {
        return null;
    }
    const status = spawnSync("git", ["status", "--porcelain"], {
        cwd: dir,
        encoding: "utf8",
    });
    const dirty = status.status === 0 && status.stdout.trim() !== "";
    return `${head.stdout.trim()}${dirty ? "-dirty" : ""}`;
}

/** perseus-mcp's version (from its package.json) and commit, from the repo. */
export function repoBuildInfo(): BuildInfo {
    const packageDir = path.resolve(import.meta.dirname, "..");
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    return {
        version: packageJson.version,
        commit: gitCommit(packageDir),
        source: "repo",
    };
}
