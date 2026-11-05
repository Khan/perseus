/**
 * @jest-environment node
 */
import path from "node:path";

import {fileGraffitiTypes} from "../../adapters/fs/file-graffiti-types";
import {checkoutPaths} from "../../runtime-paths";

import {GRAFFITI_NOTES, graffitiReference} from "./reference";

import type {GraffitiTypesModule} from "../../ports/graffiti-types";

/** The functions and classes the modules export, by name. */
function exportedNames(
    modules: ReadonlyArray<GraffitiTypesModule>,
): Set<string> {
    const names = new Set<string>();
    for (const {text} of modules) {
        for (const match of text.matchAll(
            /^export (?:function|class|const|interface|type) (\w+)/gm,
        )) {
            names.add(match[1]);
        }
    }
    return names;
}

const libDir = path.dirname(checkoutPaths().graffiti!.module);

describe("GRAFFITI_NOTES", () => {
    it("names only functions the Graffiti library exports", async () => {
        // Arrange
        const exported = exportedNames(await fileGraffitiTypes(libDir).read());
        const named = GRAFFITI_NOTES.flatMap(({text}) =>
            [...text.matchAll(/\b([a-zA-Z]+)\(/g)].map((m) => m[1]),
        );

        // Act
        const unknown = named.filter(
            (name) =>
                !exported.has(name) &&
                // Methods and plain JavaScript, not Graffiti's exports.
                !["at", "turned", "px", "f", "radians"].includes(name),
        );

        // Assert
        expect(unknown).toEqual([]);
    });
});

describe("graffitiReference", () => {
    it("puts the notes before each module's declarations", () => {
        // Arrange, Act
        const reference = graffitiReference([
            {module: "plane", text: "export function point(): void;"},
        ]);

        // Assert
        expect(reference.indexOf("## Style")).toBeLessThan(
            reference.indexOf("### plane\n\n```ts\nexport function point"),
        );
    });
});
