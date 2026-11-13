// `import/no-restricted-paths` keeps the parsers self-contained: they may not
// import from the rest of perseus-core. Tests can override that restriction,
// while main files cannot — hence the disables on the imports below.
import {
    generateFillInTheBlankOptions,
    generateFillInTheBlankTile,
    generateFillInTheBlankWidget,
    // eslint-disable-next-line import/no-restricted-paths
} from "../../utils/generators/fill-in-the-blank-widget-generator";
// eslint-disable-next-line import/no-restricted-paths
import fillInTheBlankWidgetLogic from "../../widgets/fill-in-the-blank";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseFillInTheBlankWidget} from "./fill-in-the-blank-widget";

describe("fillInTheBlankWidget", () => {
    it("accepts a fill-in-the-blank widget with valid data", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content: "The [[☃ blank 1]] drum is a tall drum.",
                widgets: {
                    "blank 1": {
                        type: "blank",
                        version: {major: 0, minor: 0},
                        options: {
                            displayType: "normal",
                            correctId: "tile-1",
                        },
                    },
                },
                tiles: [
                    generateFillInTheBlankTile({
                        id: "tile-1",
                        content: "djembe",
                        label: "djembe",
                        maxUses: 1,
                    }),
                    generateFillInTheBlankTile({
                        id: "tile-2",
                        content: "bongo",
                        label: "bongo",
                        maxUses: 1,
                    }),
                ],
                randomize: false,
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            success(widget),
        );
    });

    it("accepts the widget's own default options", () => {
        const widget = generateFillInTheBlankWidget({
            options: fillInTheBlankWidgetLogic.defaultWidgetOptions,
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            success(widget),
        );
    });

    it("accepts tiles with different caps in one choice bank", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [
                    generateFillInTheBlankTile({id: "penny", maxUses: 10}),
                    generateFillInTheBlankTile({id: "dime", maxUses: 5}),
                ],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            success(widget),
        );
    });

    it("accepts an uncapped multi-use tile", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [generateFillInTheBlankTile({maxUses: "unlimited"})],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            success(widget),
        );
    });

    it("accepts a tile with an image height", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [generateFillInTheBlankTile({imageHeight: 72})],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            success(widget),
        );
    });

    // Every field is required, with no `defaulted` fallback: this widget is
    // new enough to have no legacy content, and a field lost in a bad write
    // should fail loudly rather than parse to a silently valid item.
    it.each([
        ["content", "expected string"],
        ["widgets", "expected PerseusWidgetsMap"],
        ["tiles", "expected array"],
        ["randomize", "expected boolean"],
    ])("rejects a widget with no %s", (field: string, expected: string) => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({[field]: undefined}),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            failure(
                expect.stringContaining(
                    `At (root).options.${field} -- ${expected}, but got undefined`,
                ),
            ),
        );
    });

    it("rejects a tile with no label", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [generateFillInTheBlankTile({label: undefined})],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root).options.tiles[0].label -- expected string, but got undefined",
                ),
            ),
        );
    });

    it("rejects a tile with no maxUses", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [generateFillInTheBlankTile({maxUses: undefined})],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            failure(
                expect.stringContaining(
                    `At (root).options.tiles[0].maxUses -- expected a positive number, or "unlimited", but got undefined`,
                ),
            ),
        );
    });

    it.each([0, -3, 1.5])("rejects a tile maxUses of %p", (maxUses: number) => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [generateFillInTheBlankTile({maxUses})],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            failure(
                expect.stringContaining(
                    `At (root).options.tiles[0].maxUses -- expected a positive number, or "unlimited"`,
                ),
            ),
        );
    });

    it("rejects an unrecognized tile maxUses sigil", () => {
        const widget = generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                tiles: [
                    generateFillInTheBlankTile({
                        // @ts-expect-error: the point of the test is the invalid value
                        maxUses: "infinite",
                    }),
                ],
            }),
        });

        expect(parse(widget, parseFillInTheBlankWidget)).toEqual(
            failure(
                expect.stringContaining(
                    `At (root).options.tiles[0].maxUses -- expected a positive number, or "unlimited"`,
                ),
            ),
        );
    });
});
