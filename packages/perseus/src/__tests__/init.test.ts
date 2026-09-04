import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {initPerseus} from "../init";
import {getEditor, getWidgetExport} from "../widgets";

const productionWidgetNames = [
    "blank",
    "categorizer",
    "cs-program",
    "definition",
    "deprecated-standin",
    "dropdown",
    "explanation",
    "expression",
    "fill-in-the-blank",
    "free-response",
    "graded-group",
    "graded-group-set",
    "grapher",
    "group",
    "iframe",
    "image",
    "input-number",
    "interaction",
    "interactive-graph",
    "label-image",
    "matcher",
    "matrix",
    "measurer",
    "number-line",
    "numeric-input",
    "orderer",
    "phet-simulation",
    "plotter",
    "python-program",
    "radio",
    "sorter",
    "table",
    "video",
];

describe("initPerseus", () => {
    it("registers every production widget and its logic without editors", () => {
        initPerseus();

        for (const name of productionWidgetNames) {
            expect(getWidgetExport(name)?.name).toBe(name);
            expect(CoreWidgetRegistry.isWidgetRegistered(name)).toBe(true);
            expect(() => getEditor(name)).toThrow(
                "Perseus widget editor registry accessed before initialization!",
            );
        }
        expect(getWidgetExport("transformer")?.name).toBe("deprecated-standin");
    });
});
