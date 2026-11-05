import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {SearchUnavailableError} from "./errors";
import {createSearchUseCases} from "./search";

import type {ExerciseUseCases} from "./exercises";
import type {ImportedProblemType} from "../domain/exercises/import-shapes";
import type {ContentDocument} from "../domain/search/content-document";
import type {
    ContentSearch,
    ContentSource,
    SearchStatus,
} from "../ports/content-search";

function documentOf(
    contentId: string,
    overrides: Partial<ContentDocument> = {},
): ContentDocument {
    return {
        id: `item-${contentId}`,
        kind: "item",
        contentId,
        title: ["Solve equations"],
        url: ["/math/e/solve"],
        listed: true,
        exerciseId: ["e1"],
        problemType: ["Type 1"],
        sourceFile: "Exercise/e1-sha.json",
        snapshotVersion: "v1",
        domain: ["math"],
        domainTitle: ["Math"],
        course: ["algebra"],
        courseTitle: ["Algebra"],
        unit: [],
        unitTitle: [],
        lesson: [],
        lessonTitle: [],
        text: "",
        hintText: "",
        math: [],
        widgetText: [],
        widgetTypes: [],
        widgetProps: [],
        widgetCount: 0,
        hintCount: 0,
        imageCount: 0,
        hasGraphie: false,
        firstLine: "",
        mathSpeech: [],
        ...overrides,
    };
}

function fakeSearch(
    documents: ContentDocument[],
    status: SearchStatus = {
        available: true,
        url: "http://search",
        documents: documents.length,
        snapshotDir: "/snapshot",
    },
): ContentSearch & {filters: string[]; retrieved: string[][]} {
    const filters: string[] = [];
    const retrieved: string[][] = [];
    return {
        filters,
        retrieved,
        status: async () => status,
        async search({fields = [], limit}) {
            retrieved.push([...fields]);
            return {
                total: documents.length,
                hits: documents
                    .slice(0, limit)
                    .map((document) => ({document, snippet: ""})),
            };
        },
        facets: async () => ({total: 0, counts: {}}),
        async documents({filter}) {
            filters.push(filter);
            return documents;
        },
    };
}

function fakeExercises() {
    const imports: Array<{
        problemTypes: ReadonlyArray<ImportedProblemType>;
        name: string;
    }> = [];
    const exercises: Pick<ExerciseUseCases, "importItems"> = {
        importItems(problemTypes, options) {
            imports.push({problemTypes, name: options.name});
            return {
                exercise: {
                    exerciseId: `x${imports.length}`,
                    name: options.name,
                    createdAt: "",
                    updatedAt: "",
                    problemTypes: [],
                },
                imported: problemTypes.reduce(
                    (n, problemType) => n + problemType.items.length,
                    0,
                ),
                skipped: [],
            };
        },
    };
    return {imports, exercises};
}

const content: ContentSource = {
    readItem: async (_dir, _file, itemId) =>
        itemId === "gone" ? undefined : {itemId},
};

describe("importFromSearch", () => {
    it("makes an exercise per exercise, grouped by problem type", async () => {
        // Arrange
        const {imports, exercises} = fakeExercises();
        const search = fakeSearch([
            documentOf("i1"),
            documentOf("i2", {problemType: ["Type 2"]}),
            documentOf("i3", {exerciseId: ["e2"], title: ["Other"]}),
            documentOf("i4"),
        ]);
        const useCases = createSearchUseCases({
            search,
            content,
            exercises,
        });

        // Act
        const result = await useCases.importFromSearch({limit: 50});

        // Assert
        expect(imports).toEqual([
            {
                name: "Solve equations",
                problemTypes: [
                    {
                        name: "Type 1",
                        items: [
                            {itemData: {itemId: "i1"}, contentId: "i1"},
                            {itemData: {itemId: "i4"}, contentId: "i4"},
                        ],
                    },
                    {
                        name: "Type 2",
                        items: [{itemData: {itemId: "i2"}, contentId: "i2"}],
                    },
                ],
            },
            {
                name: "Other",
                problemTypes: [
                    {
                        name: "Type 1",
                        items: [{itemData: {itemId: "i3"}, contentId: "i3"}],
                    },
                ],
            },
        ]);
        expect(result.exercises).toEqual([
            expect.objectContaining({fromExerciseId: "e1", imported: 3}),
            expect.objectContaining({fromExerciseId: "e2", imported: 1}),
        ]);
    });

    it("skips articles and items missing from their file", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const useCases = createSearchUseCases({
            search: fakeSearch([
                documentOf("a1", {kind: "article", exerciseId: undefined}),
                documentOf("gone"),
            ]),
            content,
            exercises,
        });

        // Act
        const result = await useCases.importFromSearch({limit: 50});

        // Assert
        expect(result.skipped).toEqual([
            {contentId: "a1", reason: "an article, not an item"},
            {
                contentId: "gone",
                reason: "not in Exercise/e1-sha.json in /snapshot",
            },
        ]);
        expect(result.exercises).toEqual([]);
    });

    it("imports named items whether or not they're listed", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const search = fakeSearch([documentOf("i1")]);
        const useCases = createSearchUseCases({
            search,
            content,
            exercises,
        });

        // Act
        await useCases.importFromSearch({contentIds: ["i1"], limit: 50});

        // Assert
        expect(search.filters).toEqual(['contentId IN ["i1"]']);
    });

    it("throws when search can't say where the snapshot is", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const useCases = createSearchUseCases({
            search: fakeSearch([documentOf("i1")], {
                available: false,
                url: "http://search",
                reason: "nothing answered",
            }),
            content,
            exercises,
        });

        // Act
        const result = useCases.importFromSearch({limit: 50});

        // Assert
        await expect(result).rejects.toThrow(SearchUnavailableError);
    });
});

describe("searchContent", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("adds the fields asked for to each hit", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const search = fakeSearch([
            documentOf("i1", {
                mathSpeech: ["the square root of 2"],
                exerciseId: ["e1", "e2"],
                title: ["First", "Second"],
                problemType: ["Type 1", "Shared"],
            }),
        ]);
        const useCases = createSearchUseCases({search, content, exercises});

        // Act
        const result = await useCases.searchContent({
            fields: ["speech", "exercises"],
            limit: 10,
        });

        // Assert
        expect(search.retrieved).toEqual([
            ["mathSpeech", "exerciseId", "problemType"],
        ]);
        expect(result.hits[0].fields).toEqual({
            speech: ["the square root of 2"],
            exercises: [
                {exerciseId: "e1", title: "First", problemType: "Type 1"},
                {exerciseId: "e2", title: "Second", problemType: "Shared"},
            ],
        });
    });

    it("reads the item parts asked for from the snapshot, migrated", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({content: "What is 2+2?"}),
            hints: [generateTestPerseusRenderer({content: "Count."})],
        });
        const useCases = createSearchUseCases({
            search: fakeSearch([documentOf("i1")]),
            content: {readItem: async () => item},
            exercises,
        });

        // Act
        const result = await useCases.searchContent({
            itemPaths: ["/question/content", "/hints/0/content", "/missing"],
            limit: 10,
        });

        // Assert
        expect(result.hits[0].item).toEqual({
            "/question/content": "What is 2+2?",
            "/hints/0/content": "Count.",
            "/missing": null,
        });
    });

    it("returns at most 10 hits when reading item parts", async () => {
        // Arrange
        const {exercises} = fakeExercises();
        const documents = Array.from({length: 12}, (_, i) =>
            documentOf(`i${i}`),
        );
        const useCases = createSearchUseCases({
            search: fakeSearch(documents),
            content,
            exercises,
        });

        // Act
        const result = await useCases.searchContent({
            itemPaths: ["/question"],
            limit: 50,
        });

        // Assert
        expect(result.hits).toHaveLength(10);
    });
});
