import {fork} from "node:child_process";
import {readFile} from "node:fs/promises";
import path from "node:path";

import {APP_DIR, PERSEUS_VITE_CONFIG, productionBuild} from "./vite-shared";
import {keepWoff2Fonts} from "./woff2-fonts";

import type {Plugin, Rolldown} from "vite";

const STYLE_SLOT =
    "<!-- The page's styles are inlined here when the page is built. -->";
const SCRIPT_SLOT =
    "<!-- The page's script is inlined here when the page is built. -->";

/**
 * Imports SVGs as base64 data URLs. Vite's own inlining leaves an SVG's text
 * mostly readable, quotes and all, and Wonder Blocks puts its icons in
 * unquoted `url(...)`s, which those quotes break: icons show as squares.
 */
function svgAsBase64(): Plugin {
    return {
        name: "perseus-mcp:svg-as-base64",
        enforce: "pre",
        async load(id) {
            const file = id.split("?")[0];
            if (!file.endsWith(".svg")) {
                return null;
            }
            const svg = await readFile(file);
            return `export default "data:image/svg+xml;base64,${svg.toString("base64")}";`;
        },
    };
}

/**
 * Builds the MCP Apps page into one self-contained HTML document: its script,
 * styles, fonts and icons inlined.
 */
export async function buildAppPage(): Promise<string> {
    const result = await productionBuild({
        ...PERSEUS_VITE_CONFIG,
        root: APP_DIR,
        plugins: [...PERSEUS_VITE_CONFIG.plugins, svgAsBase64()],
        build: {
            write: false,
            minify: true,
            // The page can only load files from the hosts its resource
            // declares, so fonts and images go into the page too.
            assetsInlineLimit: () => true,
            cssCodeSplit: false,
            // An app build with the script as its only input. (A library
            // build isn't minified, which leaves comments naming local file
            // paths in the page.)
            rolldownOptions: {
                input: path.join(APP_DIR, "preview-app.tsx"),
                output: {format: "es", codeSplitting: false},
            },
        },
    });
    const outputs = (Array.isArray(result) ? result : [result]).flatMap(
        (output) => ("output" in output ? output.output : []),
    );
    const entry = outputs.find(
        (output): output is Rolldown.OutputChunk =>
            output.type === "chunk" && output.isEntry,
    );
    if (entry == null) {
        throw new Error("Building the preview app page produced no script.");
    }
    const css = outputs
        .filter(
            (output): output is Rolldown.OutputAsset =>
                output.type === "asset" && output.fileName.endsWith(".css"),
        )
        .map((asset) => String(asset.source))
        .join("\n");

    const html = await readFile(path.join(APP_DIR, "preview-app.html"), "utf8");
    // A literal "</script" or "</style" would end the inline element early.
    const code = entry.code.replace(/<\/script/gi, "<\\/script");
    const styles = keepWoff2Fonts(css).replace(/<\/style/gi, "<\\/style");
    // Functions, so "$&" and the like in the code aren't read as replacement
    // patterns.
    return html
        .replace(STYLE_SLOT, () => `<style>${styles}</style>`)
        .replace(SCRIPT_SLOT, () => `<script type="module">${code}</script>`);
}

/**
 * Builds the MCP Apps page in a process of its own (build-app-page.mjs), so
 * the build's NODE_ENV doesn't reach the browser preview's Vite server in
 * this one. The child's output goes to stderr: over stdio, stdout is MCP's.
 */
function buildAppPageApart(): Promise<string> {
    return new Promise((resolve, reject) => {
        const child = fork(
            path.join(import.meta.dirname, "build-app-page.mjs"),
            {
                env: {...process.env, NODE_ENV: "production"},
                stdio: ["ignore", "pipe", "pipe", "ipc"],
            },
        );
        child.stdout?.pipe(process.stderr);
        child.stderr?.pipe(process.stderr);
        let settled = false;
        child.on("message", (message: {html?: string; error?: string}) => {
            settled = true;
            if (message.html != null) {
                resolve(message.html);
            } else {
                reject(
                    new Error(
                        `Building the preview app page failed: ${message.error}`,
                    ),
                );
            }
        });
        child.on("error", (error) => {
            settled = true;
            reject(error);
        });
        child.on("exit", (code) => {
            if (!settled) {
                reject(
                    new Error(
                        `Building the preview app page stopped (exit code ${code}).`,
                    ),
                );
            }
        });
    });
}

/**
 * The MCP Apps page for show_item. Hosts receive it as a resource's text,
 * so it must be one document: Vite builds the page, and its script, styles,
 * fonts and icons are inlined. The build runs, in a process of its own, when
 * a host first asks for the page, then is reused.
 */
export function createViteAppPage(): {html(): Promise<string>} {
    let built: Promise<string> | null = null;
    return {
        html() {
            if (built == null) {
                // A failed build is retried on the next request.
                built = buildAppPageApart().catch((error: unknown) => {
                    built = null;
                    throw error;
                });
            }
            return built;
        },
    };
}
