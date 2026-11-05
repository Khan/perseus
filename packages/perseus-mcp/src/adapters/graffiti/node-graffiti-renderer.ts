import {spawn} from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {pathToFileURL} from "node:url";

import {GraffitiRenderError} from "../../app/errors";

import type {RenderedDiagram} from "../../domain/graffiti/diagram";
import type {GraffitiRenderer} from "../../ports/graffiti-renderer";
import type {GraffitiPaths} from "../../runtime-paths";

/** How much a script may print. */
const OUTPUT_LIMIT = 5_000_000;

/**
 * Runs each diagram script in a Node process of its own, with the permission
 * model on: it can read only the runner, the Graffiti library and the
 * script, and can't write files or start processes or workers. The runner
 * also refuses every import but Graffiti and removes the network globals,
 * since Node 24's permission model doesn't cover the network. That keeps a
 * script from reaching anything by the ordinary routes; it isn't a boundary
 * against code written to get out.
 */
export function createNodeGraffitiRenderer(
    paths: GraffitiPaths,
    {timeLimitMs = 10_000}: {timeLimitMs?: number} = {},
): GraffitiRenderer {
    // The permission model compares real paths, and pnpm links Graffiti in.
    const runner = fs.realpathSync(paths.runner);
    const graffitiModule = fs.realpathSync(paths.module);
    const graffitiDir = path.dirname(graffitiModule);

    return {
        async render(source) {
            const dir = fs.realpathSync(
                fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-graffiti-")),
            );
            // .ts, so Node strips the types if the script has any.
            const script = path.join(dir, "diagram.ts");
            fs.writeFileSync(script, source);
            try {
                const output = await run(process.execPath, timeLimitMs, [
                    "--permission",
                    `--allow-fs-read=${runner}`,
                    `--allow-fs-read=${graffitiDir}`,
                    `--allow-fs-read=${script}`,
                    runner,
                    pathToFileURL(graffitiModule).href,
                    script,
                ]);
                return parseOutput(output);
            } finally {
                fs.rmSync(dir, {recursive: true, force: true});
            }
        },
    };
}

function run(
    node: string,
    timeLimitMs: number,
    args: string[],
): Promise<string> {
    return new Promise((resolve, reject) => {
        // No environment: the script gets nothing of the server's.
        const child = spawn(node, args, {env: {}, stdio: "pipe"});
        let stdout = "";
        let stderr = "";
        const timer = setTimeout(() => {
            child.kill("SIGKILL");
            reject(
                new GraffitiRenderError(
                    `it ran for more than ${timeLimitMs / 1000} seconds.`,
                ),
            );
        }, timeLimitMs);
        child.stdout.on("data", (chunk) => {
            stdout += chunk;
            if (stdout.length > OUTPUT_LIMIT) {
                child.kill("SIGKILL");
                reject(new GraffitiRenderError("it printed too much."));
            }
        });
        child.stderr.on("data", (chunk) => {
            stderr = (stderr + chunk).slice(-20_000);
        });
        child.on("error", (error) => {
            clearTimeout(timer);
            reject(new GraffitiRenderError(String(error)));
        });
        child.on("close", (code) => {
            clearTimeout(timer);
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new GraffitiRenderError(describeFailure(stderr)));
            }
        });
    });
}

/** The error the script died with, without Node's stack frames. */
function describeFailure(stderr: string): string {
    const lines = stderr
        .split("\n")
        .map((line) => line.trimEnd())
        .filter(
            (line) =>
                line !== "" &&
                !line.trimStart().startsWith("at ") &&
                !line.includes("ExperimentalWarning") &&
                !line.includes("--trace-warnings") &&
                !line.startsWith("Node.js v"),
        );
    const error = lines.find((line) => /^\w*Error\b/.test(line.trim()));
    return (error ?? lines.at(-1) ?? "it exited with an error.").trim();
}

function parseOutput(output: string): RenderedDiagram {
    try {
        const parsed = JSON.parse(output);
        if (typeof parsed.svg === "string" && parsed.data != null) {
            return parsed;
        }
    } catch {
        // Falls through to the error below.
    }
    throw new GraffitiRenderError("its output wasn't a diagram.");
}
