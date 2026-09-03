import {
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";

import {getTileContentKind, getFillInTheBlankSaveWarnings} from "./validation";

import type {FillInTheBlankEditorOptions} from "./types";

/**
 * A valid two-blank exercise. Anything a test asserts on is passed explicitly
 * by the test, so no assertion depends on a default it does not control.
 */
function generateOptions(
    overrides: Partial<FillInTheBlankEditorOptions> = {},
): FillInTheBlankEditorOptions {
    return {
        content: "The [[☃ blank 1]] drum, and the [[☃ blank 2]].",
        widgets: {
            "blank 1": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-1"}),
            }),
            "blank 2": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-2"}),
            }),
        },
        tiles: [
            {id: "tile-1", content: "djembe", label: "djembe"},
            {id: "tile-2", content: "bongo", label: "bongo"},
        ],
        tileUsage: "single",
        randomizeTiles: false,
        ...overrides,
    };
}

describe("getTileContentKind", () => {
    it.each([
        ["", "empty"],
        ["   ", "empty"],
        ["djembe", "text"],
        ["$2$", "tex"],
        ["$\\text{NaCl}$", "tex"],
        ["![a red apple](https://cdn.kastatic.org/apple.png)", "image"],
    ])("classifies %p as %p", (content, expected) => {
        // Arrange, Act
        const kind = getTileContentKind(content);

        expect(kind).toBe(expected);
    });
});

describe("getFillInTheBlankSaveWarnings", () => {
    it("returns no warnings for a complete exercise", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(generateOptions());

        expect(warnings).toEqual([]);
    });

    it("warns when the answer zone has no blanks", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({content: "The drum is a drum.", widgets: {}}),
        );

        expect(warnings).toContain(
            "Fill in the Blank needs at least one blank in the answer zone.",
        );
    });

    it("warns when there are fewer than two choices", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [{id: "tile-1", content: "djembe", label: "djembe"}],
            }),
        );

        expect(warnings).toContain(
            "Fill in the Blank needs at least 2 choices.",
        );
    });

    it("warns when a blank has no correct answer", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: ""}),
                    }),
                },
            }),
        );

        expect(warnings).toContain("Blank 2 has no correct answer.");
    });

    it("warns when a correct answer names a choice that no longer exists", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-99"}),
                    }),
                },
            }),
        );

        expect(warnings).toContain(
            "Blank 2's correct answer refers to a choice that no longer exists.",
        );
    });

    it("numbers blanks by their order in the content, not by their widget id", () => {
        // Arrange, Act
        // "blank 2" comes first, so it is Blank 1 — and it is the unanswered one.
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                content: "The [[☃ blank 2]] drum, and the [[☃ blank 1]].",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: ""}),
                    }),
                },
            }),
        );

        expect(warnings).toContain("Blank 1 has no correct answer.");
    });

    it("warns when single-use choices cannot fill every blank", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                content:
                    "[[☃ blank 1]] [[☃ blank 2]] [[☃ blank 3]] [[☃ blank 4]]",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-2"}),
                    }),
                    "blank 3": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 4": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-2"}),
                    }),
                },
                tileUsage: "single",
            }),
        );

        expect(warnings).toContain(
            "There are 4 blanks but only 2 single-use choices, so the blanks cannot all be filled.",
        );
    });

    it("allows more blanks than choices when choices are multi-use", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                content:
                    "[[☃ blank 1]] [[☃ blank 2]] [[☃ blank 3]] [[☃ blank 4]]",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-2"}),
                    }),
                    "blank 3": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 4": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-2"}),
                    }),
                },
                tileUsage: "multi",
            }),
        );

        expect(warnings).toEqual([]);
    });

    it("warns when a text choice holds more than one word", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "bass drum", label: "bass drum"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                ],
            }),
        );

        expect(warnings).toContain(
            'Choice "bass drum" must be a single word or standalone character.',
        );
    });

    it("allows spaces inside a TeX choice", () => {
        // Arrange, Act
        // TeX legitimately contains spaces.
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "$2 + 2$", label: "2 plus 2"},
                    {id: "tile-2", content: "$4$", label: "4"},
                ],
            }),
        );

        expect(warnings).toEqual([]);
    });

    it("warns when choices mix content types", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: "djembe"},
                    {id: "tile-2", content: "$2$", label: "2"},
                ],
            }),
        );

        expect(warnings).toContain(
            "Choices mix tex, text content. Only text, only TeX, or only images " +
                "(empty choices may be mixed in).",
        );
    });

    it("allows an empty choice alongside another content type", () => {
        // Arrange, Act
        // "No coefficient" is a real answer when balancing an equation.
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "", label: "empty"},
                    {id: "tile-2", content: "$2$", label: "2"},
                ],
            }),
        );

        expect(warnings).toEqual([]);
    });

    it("warns when a choice has no screen reader label", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: ""},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                ],
            }),
        );

        expect(warnings).toContain(
            'Choice "djembe" needs a screen reader label.',
        );
    });

    it("warns rather than throwing when a choice is missing fields", () => {
        // Arrange, Act
        // Hand-edited JSON can omit a field; a TypeError here would lose every
        // warning at once, showing the author nothing.
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                // The cast is the point: JSON the type forbids, but reachable.
                // eslint-disable-next-line no-restricted-syntax
                tiles: [
                    {id: "tile-1", content: "djembe"},
                    {id: "tile-2"},
                ] as unknown as FillInTheBlankEditorOptions["tiles"],
            }),
        );

        expect(warnings).toContain(
            'Choice "djembe" needs a screen reader label.',
        );
        expect(warnings).toContain("Choice 2 needs a screen reader label.");
    });

    it("warns when an image choice has no alt text", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content: "![](https://cdn.kastatic.org/penny.png)",
                        label: "penny",
                        imageHeight: 48,
                    },
                    {
                        id: "tile-2",
                        content: "![a dime](https://cdn.kastatic.org/dime.png)",
                        label: "dime",
                        imageHeight: 48,
                    },
                ],
            }),
        );

        expect(warnings).toContain(
            'Choice "![](https://cdn.kastatic.org/penny.png)" needs image alt text.',
        );
    });

    it("warns when an image choice has no display height", () => {
        // Arrange, Act
        // The presets are what let the renderer scale an image predictably.
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content:
                            "![a penny](https://cdn.kastatic.org/penny.png)",
                        label: "penny",
                    },
                    {
                        id: "tile-2",
                        content: "![a dime](https://cdn.kastatic.org/dime.png)",
                        label: "dime",
                        imageHeight: 48,
                    },
                ],
            }),
        );

        expect(warnings).toContain(
            'Choice "![a penny](https://cdn.kastatic.org/penny.png)" needs a display height.',
        );
    });

    it("returns no warnings for well-formed image choices", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content:
                            "![a penny](https://cdn.kastatic.org/penny.png)",
                        label: "penny",
                        imageHeight: 48,
                    },
                    {
                        id: "tile-2",
                        content: "![a dime](https://cdn.kastatic.org/dime.png)",
                        label: "dime",
                        imageHeight: 48,
                    },
                ],
            }),
        );

        expect(warnings).toEqual([]);
    });

    it("warns when the maximum uses per choice is below one", () => {
        // Arrange, Act
        const warnings = getFillInTheBlankSaveWarnings(
            generateOptions({tileUsage: "multi", maxUsesPerTile: 0}),
        );

        expect(warnings).toContain(
            "Maximum uses per choice must be at least 1.",
        );
    });
});
