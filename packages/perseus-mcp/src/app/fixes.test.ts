/**
 * @jest-environment node
 */
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../adapters/fs/perseus-core-schema-source";
import {checkoutPaths} from "../runtime-paths";

import {createCatalog} from "./catalog";
import {withDraftFeed} from "./draft-feed";
import {createDraftUseCases} from "./drafts";
import {InvalidFixError} from "./errors";
import {createFixUseCases} from "./fixes";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {ExerciseUseCases} from "./exercises";

function setUp(questions: string[]) {
    const {drafts, feed} = withDraftFeed(inMemoryRepository());
    let next = 0;
    const draftUseCases = createDraftUseCases({
        drafts,
        feed,
        files: {read: () => Promise.reject(new Error())},
        catalog: createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ),
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => `d${++next}`,
    });
    for (const content of questions) {
        draftUseCases.createItem({question: {content}});
    }
    const exercises: Pick<ExerciseUseCases, "getExercise"> = {
        getExercise: (exerciseId) => ({
            exerciseId,
            name: "Exercise",
            problemTypes: [
                {
                    name: "Type 1",
                    items: drafts.list().map((d) => ({itemId: d.itemId})),
                },
            ],
        }),
    };
    const fixes = createFixUseCases({drafts, draftUseCases, exercises});
    return {drafts, fixes};
}

describe("applyFix", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("says what a dry run would change, and saves nothing", () => {
        // Arrange
        const {drafts, fixes} = setUp(["What is 2+2?", "**Bold already.**"]);

        // Act
        const result = fixes.applyFix({
            request: {fix: "bold-first-line"},
            target: {exerciseId: "e"},
            dryRun: true,
        });

        // Assert
        expect(result.counts).toEqual({
            changed: 0,
            "would change": 1,
            unchanged: 1,
            rejected: 0,
        });
        expect(result.outcomes[0]).toEqual({
            itemId: "d1",
            outcome: "would change",
            changes: [
                {
                    path: "/question/content",
                    before: ["What is 2+2?"],
                    after: ["**What is 2+2?**"],
                },
            ],
        });
        expect(drafts.get("d1")?.revision).toBe(1);
    });

    it("saves each change as a revision saying which fix made it", () => {
        // Arrange
        const {drafts, fixes} = setUp(["What is 2+2?"]);

        // Act
        fixes.applyFix({
            request: {fix: "bold-first-line"},
            target: {itemIds: ["d1"]},
            dryRun: false,
        });

        // Assert
        expect(drafts.get("d1")).toMatchObject({
            revision: 2,
            change: "apply_fix: bold-first-line",
            item: {question: {content: "**What is 2+2?**"}},
        });
    });

    it("rejects a change that would break the item", () => {
        // Arrange
        const {drafts, fixes} = setUp(["Pick one."]);

        // Act
        const result = fixes.applyFix({
            request: {
                fix: "replace-text",
                find: "Pick one.",
                replace: "Pick one. [[☃ radio 1]]",
                scope: "question",
            },
            target: {itemIds: ["d1"]},
            dryRun: false,
        });

        // Assert
        expect(result.counts.rejected).toBe(1);
        expect(drafts.get("d1")?.revision).toBe(1);
    });

    it("throws on a regular expression that isn't valid", () => {
        // Arrange
        const {fixes} = setUp(["x"]);

        // Act
        const apply = () =>
            fixes.applyFix({
                request: {
                    fix: "replace-text",
                    find: "(",
                    replace: "",
                    regex: true,
                },
                target: {itemIds: ["d1"]},
                dryRun: true,
            });

        // Assert
        expect(apply).toThrow(InvalidFixError);
    });
});
