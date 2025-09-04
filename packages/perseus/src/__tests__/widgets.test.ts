import {mockStrings} from "../strings";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";
import * as Widgets from "../widgets";

describe("Widget API support", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    describe("replaceWidget", () => {
        it("replaces an existing widget", () => {
            Widgets.replaceWidget("transformer", "radio");
            expect(Widgets.getWidget("transformer")?.name).toBe("Radio");
        });

        it("Throws when the replacement isn't available", () => {
            expect(() => Widgets.replaceWidget("radio", "dog-cat")).toThrow();
        });
    });

    describe("getTransform", () => {
        it("returns null for unknown widget types", () => {
            // Coolbeans is not a real widget sadly
            expect(Widgets.getWidget("coolbeans")).toBe(null);
        });

        it("returns an identity function when widgets don't provide a transform", () => {
            const widgetOptions = {cool: "beans"};
            // Group does not provide a `transform` function
            const transform = Widgets.getTransform("group");
            expect(transform?.(widgetOptions, mockStrings)).toEqual(
                widgetOptions,
            );
        });
    });

    describe("getVersionVector", () => {
        it("creates a map of all widget versions", () => {
            expect(Widgets.getVersionVector()).toEqual(
                // skipping the 0.0 widgets for brevity
                expect.objectContaining({
                    expression: {
                        major: 2,
                        minor: 0,
                    },
                    measurer: {
                        major: 1,
                        minor: 0,
                    },
                    "passage-ref": {
                        major: 0,
                        minor: 1,
                    },
                    radio: {
                        major: 2,
                        minor: 0,
                    },
                    transformer: {
                        major: 2,
                        minor: 0,
                    },
                }),
            );
        });

        it("defaults to 0.0 for widgets without a version", () => {
            expect(Widgets.getVersionVector()).toEqual(
                expect.objectContaining({
                    "numeric-input": {
                        major: 0,
                        minor: 0,
                    },
                }),
            );
        });
    });

    describe("getPublicWidgets", () => {
        it("gets a widget exports for all public widgets", () => {
            expect(Widgets.getPublicWidgets()).toEqual(
                expect.objectContaining({
                    radio: expect.objectContaining({
                        displayName: "Radio / Multiple choice",
                        name: "radio",
                    }),
                }),
            );
        });

        it("does not list hidden widgets", () => {
            expect(Widgets.getPublicWidgets().grapher).toBe(undefined);
        });
    });

    describe(`getUserInputFromSerializedState`, () => {
        // This list is mirrored in Khan Academy's webapp for the coach reports.
        // If you change this, be sure to double-check that consuming applications
        // agree on this list of supported widgets.
        it.each([
            "categorizer",
            "expression",
            "grapher",
            "input-number",
            "interactive-graph",
            "numeric-input",
            "radio",
        ])(
            "%s: should provide getUserInputFromSerializedState",
            (widgetType) => {
                const WidgetExport = Widgets.getWidgetExport(widgetType);
                expect(WidgetExport).toHaveProperty(
                    "getUserInputFromSerializedState",
                );
            },
        );

        it.each([
            {
                type: "categorizer",
                input: {
                    values: [0, 1, 0, 1, 2],
                },
                expected: {
                    values: [0, 1, 0, 1, 2],
                },
            },
            {
                type: "expression",
                input: {
                    value: "100 / 45",
                },
                expected: "100 / 45",
            },
            {
                type: "grapher",
                input: {
                    plot: {
                        type: "linear",
                        coords: [
                            [0, 0],
                            [1, 1],
                        ],
                    },
                },
                expected: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
            },
            {
                type: "numeric-input",
                input: {
                    currentValue: "42",
                },
                expected: {
                    currentValue: "42",
                },
            },
            {
                type: "interactive-graph",
                input: {
                    graph: {
                        type: "circle",
                        radius: 5,
                        center: [0, 0],
                    },
                },
                expected: {
                    type: "circle",
                    radius: 5,
                    center: [0, 0],
                },
            },
            {
                type: "radio",
                input: {
                    choiceStates: [
                        {selected: false},
                        {selected: true},
                        {selected: false},
                    ],
                    choices: [
                        {id: "0-0-0-0-0", content: "a", originalIndex: 0},
                        {id: "1-1-1-1-1", content: "b", originalIndex: 1},
                        {id: "2-2-2-2-2", content: "c", originalIndex: 2},
                    ],
                },
                expected: {
                    selectedChoiceIds: ["1-1-1-1-1"],
                },
            },
        ])(
            "$type: getUserInputFromSerializedState should work",
            (widgetData) => {
                const WidgetExport = Widgets.getWidgetExport(widgetData.type);

                if (WidgetExport?.getUserInputFromSerializedState) {
                    const userInput =
                        WidgetExport.getUserInputFromSerializedState(
                            widgetData.input,
                        );
                    expect(userInput).toEqual(widgetData.expected);
                } else {
                    throw new Error(
                        "Widget does not have getUserInputFromSerializedState",
                    );
                }
            },
        );
    });

    describe(`supportsStaticMode`, () => {
        // all widgets that should support static mode
        it.each([
            "interactive-graph",
            "categorizer",
            "grapher",
            "matrix",
            "number-line",
            "plotter",
            "radio",
        ])("supportsStaticMode returns true: %s", (type: string) => {
            expect(Widgets.supportsStaticMode(type)).toBe(true);
        });

        // some widgets that shouldn't support static mode
        it.each([
            "expression",
            "numeric-input",
            "input-number",
            "dropdown",
            "definition",
        ])("supportsStaticMode returns false: %s", (type: string) => {
            expect(Widgets.supportsStaticMode(type)).toBe(false);
        });
    });
});
