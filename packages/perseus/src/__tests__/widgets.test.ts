import {testDependencies} from "../../../../testing/test-dependencies";
import * as Dependencies from "../dependencies";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";
import * as Widgets from "../widgets";

describe("Widget API support", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
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
            const Widget = Widgets.getWidget(widgetType);
            expect(Widget).toHaveProperty("getUserInputFromProps");
        },
    );

    it("categorizer widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("categorizer");

        if (Widget && "getUserInputFromProps" in Widget) {
            const props = {
                values: [0, 1, 0, 1, 2],
            };

            // @ts-expect-error - TS2339 - Property 'getUserInputFromProps' does not exist on type 'ComponentType<any>'.
            const userInput = Widget.getUserInputFromProps(props);
            expect(userInput).toEqual({
                values: [0, 1, 0, 1, 2],
            });
        } else {
            throw new Error("Widget does not have getUserInputFromProps");
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

    it("input-number widget getUserInputFromProps should return the correct user input", () => {
        const Widget = Widgets.getWidget("input-number");

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

describe("replaceWidget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        registerAllWidgetsForTesting();
    });

    it("replaces an existing widget", () => {
        Widgets.replaceWidget("transformer", "radio");
        expect(Widgets.getWidget("transformer")?.name).toBe("Radio");
    });

    it("Throws when the replacement isn't available", () => {
        expect(() => Widgets.replaceWidget("radio", "dog-cat")).toThrow();
    });
});
