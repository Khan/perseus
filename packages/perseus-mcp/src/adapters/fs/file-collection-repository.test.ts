/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {FileCollectionRepository} from "./file-collection-repository";

import type {Collection} from "../../domain/collections/collection";

const collection: Collection = {
    collectionId: "c1",
    name: "Fractions",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    problemTypes: [
        {
            name: "Type 1",
            contentId: "pt1",
            items: [{itemId: "a", contentId: "x"}],
        },
    ],
};

describe("FileCollectionRepository", () => {
    let dataDir: string;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-"));
    });

    afterEach(() => {
        fs.rmSync(dataDir, {recursive: true, force: true});
    });

    it("loads saved collections when a new repository starts", () => {
        // Arrange
        const before = new FileCollectionRepository(dataDir);
        before.init();
        before.save(collection);

        // Act
        const after = new FileCollectionRepository(dataDir);
        after.init();

        // Assert
        expect(after.get("c1")).toEqual(collection);
    });

    it("skips a file that isn't a collection", () => {
        // Arrange
        fs.mkdirSync(path.join(dataDir, "collections"));
        fs.writeFileSync(path.join(dataDir, "collections", "bad.json"), "{}");

        // Act
        const repository = new FileCollectionRepository(dataDir);
        repository.init();

        // Assert
        expect(repository.list()).toEqual([]);
    });
});
