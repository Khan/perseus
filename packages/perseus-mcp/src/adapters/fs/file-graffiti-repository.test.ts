/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {FileGraffitiRepository} from "./file-graffiti-repository";

import type {Diagram} from "../../domain/graffiti/diagram";

function revision(n: number): Diagram {
    return {
        graffitiId: "g1",
        revision: n,
        source: `source ${n}`,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    };
}

describe("FileGraffitiRepository", () => {
    let dataDir: string;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-"));
    });

    afterEach(() => {
        fs.rmSync(dataDir, {recursive: true, force: true});
    });

    it("loads each diagram's latest revision and keeps the earlier ones", () => {
        // Arrange
        const before = new FileGraffitiRepository(dataDir);
        before.init();
        before.save(revision(1));
        before.save(revision(2));

        // Act
        const after = new FileGraffitiRepository(dataDir);
        after.init();

        // Assert
        expect({
            latest: after.get("g1")?.source,
            first: after.getRevision("g1", 1)?.source,
        }).toEqual({latest: "source 2", first: "source 1"});
    });

    it("reads no revision of a diagram it doesn't know", () => {
        // Arrange
        const repository = new FileGraffitiRepository(dataDir);
        repository.init();

        // Act
        const diagram = repository.getRevision("../drafts", 1);

        // Assert
        expect(diagram).toBeUndefined();
    });
});
