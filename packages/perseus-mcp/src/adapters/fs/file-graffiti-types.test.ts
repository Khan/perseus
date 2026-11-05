/**
 * @jest-environment node
 */
import path from "node:path";

import {checkoutPaths} from "../../runtime-paths";

import {fileGraffitiTypes} from "./file-graffiti-types";

const libDir = path.dirname(checkoutPaths().graffiti!.module);

describe("fileGraffitiTypes", () => {
    it("reads each module the entry point exports from", async () => {
        // Arrange, Act
        const modules = await fileGraffitiTypes(libDir).read();

        // Assert
        expect(modules.map((m) => m.module)).toEqual(
            expect.arrayContaining(["plane", "canvas", "shapes/arc", "labels"]),
        );
    });

    it("returns declarations without imports or source map comments", async () => {
        // Arrange, Act
        const modules = await fileGraffitiTypes(libDir).read();
        const arc = modules.find((m) => m.module === "shapes/arc")!;

        // Assert
        expect({
            hasArcBetween: arc.text.includes("export function arcBetween("),
            hasImports: /^import /m.test(arc.text),
            hasSourceMap: arc.text.includes("sourceMappingURL"),
        }).toEqual({
            hasArcBetween: true,
            hasImports: false,
            hasSourceMap: false,
        });
    });
});
