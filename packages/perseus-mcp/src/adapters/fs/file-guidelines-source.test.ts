/**
 * @jest-environment node
 */
import {mkdtempSync, writeFileSync} from "node:fs";
import os from "node:os";
import path from "node:path";

import {fileGuidelinesSource} from "./file-guidelines-source";

describe("fileGuidelinesSource", () => {
    it("reads the folder's .md files in name order", async () => {
        // Arrange
        const dir = mkdtempSync(path.join(os.tmpdir(), "guidance-"));
        writeFileSync(path.join(dir, "tex.md"), "# TeX");
        writeFileSync(path.join(dir, "general.md"), "# General");
        writeFileSync(path.join(dir, "source.pdf"), "not markdown");

        // Act
        const read = await fileGuidelinesSource(dir, "a test").read();

        // Assert
        expect(read).toEqual({
            ok: true,
            dir,
            files: [
                {name: "general.md", text: "# General"},
                {name: "tex.md", text: "# TeX"},
            ],
        });
    });

    it("says why when no folder is set up", async () => {
        // Arrange, Act
        const read = await fileGuidelinesSource(undefined, "a test").read();

        // Assert
        expect(read).toMatchObject({ok: false});
    });
});
