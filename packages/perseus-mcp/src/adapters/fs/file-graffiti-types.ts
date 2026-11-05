import {readFile} from "node:fs/promises";
import path from "node:path";

import type {
    GraffitiTypesModule,
    GraffitiTypesSource,
} from "../../ports/graffiti-types";

// `export … from "./shapes/arc.ts"`, as Graffiti's index.d.ts writes it.
const REEXPORT = /from\s+"\.\/([^"]+)\.ts"/g;

/**
 * Reads the type definitions next to Graffiti's entry point: each module
 * `index.d.ts` exports from, without its imports and source map comment,
 * and with `declare` (which only says it's a declaration) left out.
 */
export function fileGraffitiTypes(libDir: string): GraffitiTypesSource {
    return {
        async read(): Promise<GraffitiTypesModule[]> {
            const index = await readFile(
                path.join(libDir, "index.d.ts"),
                "utf8",
            );
            const modules = [
                ...new Set([...index.matchAll(REEXPORT)].map((m) => m[1])),
            ];
            return Promise.all(
                modules.map(async (module) => ({
                    module,
                    text: tidy(
                        await readFile(
                            path.join(libDir, `${module}.d.ts`),
                            "utf8",
                        ),
                    ),
                })),
            );
        },
    };
}

function tidy(declarations: string): string {
    return declarations
        .split("\n")
        .filter(
            (line) =>
                !line.startsWith("import ") &&
                !line.startsWith("//# sourceMappingURL") &&
                line.trim() !== "export {};",
        )
        .map((line) => line.replace(/^export declare /, "export "))
        .join("\n")
        .replace(/\/\/# sourceMappingURL=\S+$/, "")
        .trim();
}
