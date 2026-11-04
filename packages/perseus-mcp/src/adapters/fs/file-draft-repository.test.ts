/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";

import {newDraft, reviseDraft} from "../../domain/draft";

import {
    DataDirNotWritableError,
    FileDraftRepository,
} from "./file-draft-repository";

import type {Draft} from "../../domain/draft";

function draftWith(itemId: string, now: string): Draft {
    return newDraft({
        itemId,
        item: generateTestPerseusItem(),
        now: new Date(now),
    });
}

describe("FileDraftRepository", () => {
    let dataDir: string;

    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "perseus-mcp-"));
    });

    afterEach(() => {
        fs.rmSync(dataDir, {recursive: true, force: true});
    });

    function initRepository(): FileDraftRepository {
        const repository = new FileDraftRepository(dataDir);
        repository.init();
        return repository;
    }

    function writeDraftFile(name: string, contents: string) {
        fs.writeFileSync(path.join(dataDir, "drafts", name), contents);
    }

    it("saves each draft as a JSON file in the data directory", () => {
        // Arrange
        const repository = initRepository();
        const draft = draftWith("abc", "2026-01-01T00:00:00Z");

        // Act
        repository.save(draft);

        // Assert
        const saved = JSON.parse(
            fs.readFileSync(path.join(dataDir, "drafts", "abc.json"), "utf8"),
        );
        expect(saved).toEqual(draft);
    });

    it("keeps every revision, readable after a restart", () => {
        // Arrange
        const first = draftWith("abc", "2026-01-01T00:00:00Z");
        const second = reviseDraft(first, {
            change: "edit_item: 1 operation",
            now: new Date("2026-01-02T00:00:00Z"),
        });
        const before = initRepository();
        before.save(first);
        before.save(second);

        // Act
        const after = initRepository();

        // Assert
        expect({
            revisions: after.revisions("abc"),
            first: after.getRevision("abc", 1),
        }).toEqual({
            revisions: [
                {revision: 1, updatedAt: first.updatedAt, change: undefined},
                {
                    revision: 2,
                    updatedAt: second.updatedAt,
                    change: "edit_item: 1 operation",
                },
            ],
            first,
        });
    });

    it("lists only the current revision of a draft saved before history", () => {
        // Arrange
        const draft = {
            ...draftWith("abc", "2026-01-01T00:00:00Z"),
            revision: 7,
        };
        initRepository();
        writeDraftFile("abc.json", JSON.stringify(draft));

        // Act
        const revisions = initRepository().revisions("abc");

        // Assert
        expect(revisions.map((r) => r.revision)).toEqual([7]);
    });

    it("reads no history for a draft it doesn't know", () => {
        // Arrange
        const repository = initRepository();

        // Act
        const revision = repository.getRevision("../drafts/abc", 1);

        // Assert
        expect(revision).toBeUndefined();
    });

    it("loads saved drafts when a new repository starts", () => {
        // Arrange
        const draft = {
            ...draftWith("abc", "2026-01-01T00:00:00Z"),
            notes: "From the fractions unit",
        };
        initRepository().save(draft);

        // Act
        const reloaded = initRepository();

        // Assert
        expect(reloaded.get("abc")).toEqual(draft);
    });

    it("lists the most recently changed draft first", () => {
        // Arrange
        const repository = initRepository();
        repository.save(draftWith("older", "2026-01-01T00:00:00Z"));
        repository.save(draftWith("newer", "2026-02-01T00:00:00Z"));

        // Act
        const ids = repository.list().map((draft) => draft.itemId);

        // Assert
        expect(ids).toEqual(["newer", "older"]);
    });

    it("returns the path of a draft's file as its location", () => {
        // Arrange, Act
        const location = initRepository().locationOf("abc");

        // Assert
        expect(location).toBe(path.join(dataDir, "drafts", "abc.json"));
    });

    it("skips a saved file that isn't valid JSON", () => {
        // Arrange
        initRepository();
        writeDraftFile("broken.json", "{");

        // Act
        const reloaded = initRepository();

        // Assert
        expect(reloaded.skipped()).toEqual([
            {
                location: path.join(dataDir, "drafts", "broken.json"),
                reason: expect.stringContaining("Not valid JSON"),
            },
        ]);
    });

    it("skips a saved file that isn't a draft", () => {
        // Arrange
        initRepository();
        writeDraftFile("other.json", JSON.stringify({hello: "world"}));

        // Act
        const reloaded = initRepository();

        // Assert
        expect(reloaded.skipped()).toEqual([
            expect.objectContaining({
                reason: expect.stringContaining("Not a draft"),
            }),
        ]);
    });

    it("skips a saved draft whose item doesn't parse", () => {
        // Arrange
        initRepository();
        writeDraftFile(
            "bad.json",
            JSON.stringify({
                ...draftWith("bad", "2026-01-01T00:00:00Z"),
                item: {question: {content: 5}, hints: []},
            }),
        );

        // Act
        const reloaded = initRepository();

        // Assert
        expect({
            draft: reloaded.get("bad"),
            skipped: reloaded.skipped(),
        }).toEqual({
            draft: undefined,
            skipped: [
                expect.objectContaining({
                    reason: expect.stringContaining(
                        "isn't a valid PerseusItem",
                    ),
                }),
            ],
        });
    });

    it("throws DataDirNotWritableError when the directory can't be created", () => {
        // Arrange: a file where the data directory should be.
        const notADirectory = path.join(dataDir, "file");
        fs.writeFileSync(notADirectory, "");
        const repository = new FileDraftRepository(notADirectory);

        // Act, Assert
        expect(() => repository.init()).toThrow(DataDirNotWritableError);
    });
});
