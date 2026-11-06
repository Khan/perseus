import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";
import {graphieUrlFor} from "../domain/graffiti/diagram";

import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createOverviewUseCases, imagesShowing} from "./overview";

import type {GraffitiUseCases} from "./graffiti";
import type {Exercise} from "../domain/exercises/exercise";
import type {ExerciseRepository} from "../ports/exercise-repository";

function draftOf(
    itemId: string,
    content: string,
    at: string,
    diagram?: string,
) {
    return newDraft({
        itemId,
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    diagram == null ? content : `${content} [[☃ image 1]]`,
                widgets:
                    diagram == null
                        ? {}
                        : {
                              "image 1": generateImageWidget({
                                  options: generateImageOptions({
                                      backgroundImage: {
                                          url: graphieUrlFor(diagram),
                                          width: 100,
                                          height: 100,
                                      },
                                  }),
                              }),
                          },
            }),
        }),
        change: "Created",
        now: new Date(at),
    });
}

function setUp() {
    const drafts = inMemoryRepository();
    drafts.save(draftOf("d1", "\n**First.**", "2026-01-01T00:00:00Z", "g1"));
    drafts.save(draftOf("d2", "Second.", "2026-01-03T00:00:00Z", "g1"));
    drafts.save(draftOf("d3", "Third.", "2026-01-02T00:00:00Z"));
    const exercise: Exercise = {
        exerciseId: "e1",
        name: "Shapes",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-04T00:00:00Z",
        problemTypes: [
            {name: "Type 1", items: [{itemId: "d1"}, {itemId: "d3"}]},
        ],
    };
    const exercises: ExerciseRepository = {
        get: () => exercise,
        list: () => [exercise],
        save: () => {},
    };
    const graffiti: Pick<GraffitiUseCases, "listGraffiti"> = {
        listGraffiti: () => [
            {graffitiId: "g1", revision: 2, updatedAt: "2026-01-01T00:00:00Z"},
            {
                graffitiId: "g2",
                revision: 1,
                notes: "Unused",
                updatedAt: "2026-01-05T00:00:00Z",
            },
        ],
    };
    return createOverviewUseCases({drafts, exercises, graffiti});
}

describe("overview", () => {
    it("counts what the server holds and lists the newest first", () => {
        // Arrange
        const overview = setUp();

        // Act
        const result = overview.overview();

        // Assert
        expect(result).toMatchObject({
            drafts: 3,
            exercises: 1,
            diagrams: 2,
            recentExercises: [{exerciseId: "e1", name: "Shapes", items: 2}],
        });
        expect(result.recentDrafts.map((d) => d.itemId)).toEqual([
            "d2",
            "d3",
            "d1",
        ]);
        expect(result.recentDrafts[2]).toMatchObject({
            firstLine: "**First.** [[\u2603 image 1]]",
            exercises: [{exerciseId: "e1", name: "Shapes"}],
        });
    });
});

describe("diagrams", () => {
    it("lists each diagram, newest first, with the drafts that show it", () => {
        // Arrange
        const overview = setUp();

        // Act
        const diagrams = overview.diagrams();

        // Assert
        expect(
            diagrams.map((d) => [d.graffitiId, d.usedIn.map((u) => u.itemId)]),
        ).toEqual([
            ["g2", []],
            ["g1", ["d2", "d1"]],
        ]);
    });
});

describe("imagesShowing", () => {
    it("returns how each image widget showing the diagram describes it", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[\u2603 image 1]] [[\u2603 image 2]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: {url: graphieUrlFor("g1")},
                            alt: "A line.",
                            caption: "Figure 1. A line.",
                            longDescription: "It rises.",
                        }),
                    }),
                    "image 2": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: {url: graphieUrlFor("g2")},
                            alt: "Another.",
                        }),
                    }),
                },
            }),
        });

        // Act
        const images = imagesShowing(item, "g1");

        // Assert
        expect(images).toEqual([
            {
                alt: "A line.",
                caption: "Figure 1. A line.",
                longDescription: "It rises.",
            },
        ]);
    });
});
