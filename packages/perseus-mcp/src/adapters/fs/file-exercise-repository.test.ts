/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {FileExerciseRepository} from "./file-exercise-repository";

import type {Exercise} from "../../domain/exercises/exercise";

const exercise: Exercise = {
    exerciseId: "c1",
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

describe("FileExerciseRepository", () => {
    let dataDir: string;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-"));
    });

    afterEach(() => {
        fs.rmSync(dataDir, {recursive: true, force: true});
    });

    it("loads saved exercises when a new repository starts", () => {
        // Arrange
        const before = new FileExerciseRepository(dataDir);
        before.init();
        before.save(exercise);

        // Act
        const after = new FileExerciseRepository(dataDir);
        after.init();

        // Assert
        expect(after.get("c1")).toEqual(exercise);
    });

    it("skips a file that isn't an exercise", () => {
        // Arrange
        fs.mkdirSync(path.join(dataDir, "exercises"));
        fs.writeFileSync(path.join(dataDir, "exercises", "bad.json"), "{}");

        // Act
        const repository = new FileExerciseRepository(dataDir);
        repository.init();

        // Assert
        expect(repository.list()).toEqual([]);
    });

    it("moves exercises saved as collections into exercises/", () => {
        // Arrange
        const {exerciseId, ...rest} = exercise;
        fs.mkdirSync(path.join(dataDir, "collections"));
        fs.writeFileSync(
            path.join(dataDir, "collections", `${exerciseId}.json`),
            JSON.stringify({collectionId: exerciseId, ...rest}),
        );

        // Act
        const repository = new FileExerciseRepository(dataDir);
        repository.init();

        // Assert
        expect({
            loaded: repository.get("c1"),
            legacyLeft: fs.existsSync(path.join(dataDir, "collections")),
        }).toEqual({loaded: exercise, legacyLeft: false});
    });
});
