import {testDependencies} from "../../../../testing/test-dependencies";
import {setDependencies} from "../dependencies";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";
import * as Widgets from "../widgets";

describe("Widget API support", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    // This verifies a known list of widgets to ensure they provide the static
    // validate function. Not all widgets support this function so even though
    // this list looks exhaustive, it's not!
    it.each([
        "deprecated-standin",
        "radio",
        "input-number",
        "numeric-input",
        "expression",
        "categorizer",
        "cs-program",
        "dropdown",
        "explanation",
        "definition",
        "grapher",
        "iframe",
        "image",
        "interaction",
        "interactive-graph",
        "label-image",
        "matrix",
        "matcher",
        "measurer",
        "number-line",
        "orderer",
        "passage",
        "passage-ref",
        "passage-ref-target",
        "plotter",
        "simulator",
        "sorter",
        "table",
        "transformer",
        "unit-input",
        "video",
    ])("%s widget should provide static validate function", (widgetType) => {
        expect(Widgets.getWidget(widgetType)).toHaveProperty("validate");
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

    it.each(["expression", "input-number", "numeric-input"])(
        "%s widget should provide static getOneCorrectAnswerFromRubric function",
        (widgetType) => {
            const Widget = Widgets.getWidget(widgetType);
            expect(Widget).toHaveProperty("getOneCorrectAnswerFromRubric");
        },
    );
});

describe("replaceWidget", () => {
    beforeEach(() => {
        setDependencies(testDependencies);
        registerAllWidgetsForTesting();
    });

    it("replaces an existing widget", () => {
        Widgets.replaceWidget("transformer", "radio");
        expect(Widgets.getWidget("transformer")?.name).toBe("Radio");
    });

    it("Does nothing when the replacement isn't available", () => {
        Widgets.replaceWidget("radio", "dog-cat");
        expect(Widgets.getWidget("radio")?.name).toBe("Radio");
    });
});
