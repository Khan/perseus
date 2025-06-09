import {mockStrings} from "../strings";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";
import {generateTestRadioWidget} from "../util/test-utils";
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

        it("returns a transform function when widgets provide one", () => {
            const widgetOptions = generateTestRadioWidget().options;
            // Radio provides a `transform` function
            const transform = Widgets.getTransform("radio");
            expect(transform?.(widgetOptions, mockStrings)).not.toEqual(
                widgetOptions,
            );
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
        "%s widget should provide static getUserInputFromProps function",
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
    ])(
        "%s widget should provide static getUserInputFromProps function",
        (widgetData) => {
            const WidgetExport = Widgets.getWidgetExport(widgetData.type);

            if (WidgetExport?.getUserInputFromSerializedState) {
                const userInput = WidgetExport.getUserInputFromSerializedState(
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

    it("categorizer widget getUserInputFromProps should return the correct user input", () => {
        const WidgetExport = Widgets.getWidgetExport("categorizer");

        if (WidgetExport?.getUserInputFromSerializedState) {
            const props = {
                values: [0, 1, 0, 1, 2],
            };

            const userInput =
                WidgetExport.getUserInputFromSerializedState(props);
            expect(userInput).toEqual({
                values: [0, 1, 0, 1, 2],
            });
        } else {
            throw new Error(
                "Widget does not have getUserInputFromSerializedState",
            );
        }
    });

    it("expression widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("expression");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                value: "100 / 45",
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual("100 / 45");
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });

    it("grapher widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("grapher");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                plot: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                type: "linear",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });

    it("numeric-input widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("numeric-input");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                currentValue: "42",
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                currentValue: "42",
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });

    it("interactive-graph widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("interactive-graph");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                graph: {
                    type: "circle",
                    radius: 5,
                    center: [0, 0],
                },
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                type: "circle",
                radius: 5,
                center: [0, 0],
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });

    it("numeric-input widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("numeric-input");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                currentValue: 42,
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                currentValue: 42,
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });

    it("radio widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("radio");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                choiceStates: [
                    {selected: false},
                    {selected: true},
                    {selected: false},
                ],
                choices: [
                    {content: "a", originalIndex: 0},
                    {content: "b", originalIndex: 1},
                    {content: "c", originalIndex: 2},
                ],
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                choicesSelected: [false, true, false],
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
        }
    });
});
