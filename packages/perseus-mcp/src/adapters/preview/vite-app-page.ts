import {readFile} from "node:fs/promises";
import path from "node:path";

import {build} from "vite";

import type {Rolldown} from "vite";

const APP_DIR = path.join(import.meta.dirname, "app");
const SCRIPT_SLOT =
    "<!-- The page's script is inlined here when the page is built. -->";

async function buildPage(): Promise<string> {
    const result = await build({
        configFile: false,
        root: APP_DIR,
        // Vite writes info to stdout, which carries MCP over stdio.
        logLevel: "warn",
        build: {
            write: false,
            // An app build with the script as its only input. (A library
            // build isn't minified, which leaves comments naming local file
            // paths in the page.)
            rolldownOptions: {
                input: path.join(APP_DIR, "preview-app.ts"),
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
    const html = await readFile(path.join(APP_DIR, "preview-app.html"), "utf8");
    // A literal "</script" in the code would end the inline script early.
    const code = entry.code.replace(/<\/script/gi, "<\\/script");
    // A function, so "$&" and the like in the code aren't read as
    // replacement patterns.
    return html.replace(
        SCRIPT_SLOT,
        () => `<script type="module">${code}</script>`,
    );
}

/**
 * The MCP Apps page for preview_item. Hosts receive it as a resource's text,
 * so it must be one document: Vite builds the page's script and it's inlined.
 * The build runs when a host first asks for the page, then is reused.
 */
export function createViteAppPage(): {html(): Promise<string>} {
    let built: Promise<string> | null = null;
    return {
        html() {
            if (built == null) {
                // A failed build is retried on the next request.
                built = buildPage().catch((error: unknown) => {
                    built = null;
                    throw error;
                });
            }
            return built;
        },
    };
}
