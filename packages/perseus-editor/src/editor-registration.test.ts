import {defineWidgetRegistration, Radio, Widgets} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    setStrictRegistration,
} from "@khanacademy/perseus-core";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

import allEditors from "./all-editors";
import {defineEditorRegistration} from "./editor-registration";
import {
    getEditor,
    registerEditors,
    resetEditorRegistry,
} from "./editor-registry";
import {categorizerEditorRegistration} from "./widgets/categorizer-editor";
import {csProgramEditorRegistration} from "./widgets/cs-program-editor";
import {definitionEditorRegistration} from "./widgets/definition-editor";
import {deprecatedStandinEditorRegistration} from "./widgets/deprecated-standin-editor";
import {dropdownEditorRegistration} from "./widgets/dropdown-editor";
import {explanationEditorRegistration} from "./widgets/explanation-editor";
import {expressionEditorRegistration} from "./widgets/expression-editor";
import {fillInTheBlankEditorRegistration} from "./widgets/fill-in-the-blank-editor";
import {freeResponseEditorRegistration} from "./widgets/free-response-editor";
import {gradedGroupEditorRegistration} from "./widgets/graded-group-editor";
import {gradedGroupSetEditorRegistration} from "./widgets/graded-group-set-editor";
import {grapherEditorRegistration} from "./widgets/grapher-editor";
import {groupEditorRegistration} from "./widgets/group-editor";
import {iframeEditorRegistration} from "./widgets/iframe-editor";
import {imageEditorRegistration} from "./widgets/image-editor";
import {inputNumberEditorRegistration} from "./widgets/input-number-editor";
import {interactionEditorRegistration} from "./widgets/interaction-editor";
import {interactiveGraphEditorRegistration} from "./widgets/interactive-graph-editor";
import {labelImageEditorRegistration} from "./widgets/label-image-editor";
import {matcherEditorRegistration} from "./widgets/matcher-editor";
import {matrixEditorRegistration} from "./widgets/matrix-editor";
import {measurerEditorRegistration} from "./widgets/measurer-editor";
import {numberLineEditorRegistration} from "./widgets/number-line-editor";
import {numericInputEditorRegistration} from "./widgets/numeric-input-editor";
import {ordererEditorRegistration} from "./widgets/orderer-editor";
import {phetSimulationEditorRegistration} from "./widgets/phet-simulation-editor";
import {plotterEditorRegistration} from "./widgets/plotter-editor";
import {pythonProgramEditorRegistration} from "./widgets/python-program-editor";
import RadioEditor, {radioEditorRegistration} from "./widgets/radio-editor";
import {sorterEditorRegistration} from "./widgets/sorter-editor";
import {tableEditorRegistration} from "./widgets/table-editor";
import {videoEditorRegistration} from "./widgets/video-editor";

const radioRegistration = defineWidgetRegistration({
    widget: {name: "radio", displayName: "Radio", widget: Radio},
    logic: radioLogic,
});

const productionEditorRegistrations = [
    categorizerEditorRegistration,
    csProgramEditorRegistration,
    definitionEditorRegistration,
    deprecatedStandinEditorRegistration,
    dropdownEditorRegistration,
    explanationEditorRegistration,
    expressionEditorRegistration,
    fillInTheBlankEditorRegistration,
    freeResponseEditorRegistration,
    gradedGroupEditorRegistration,
    gradedGroupSetEditorRegistration,
    grapherEditorRegistration,
    groupEditorRegistration,
    iframeEditorRegistration,
    imageEditorRegistration,
    inputNumberEditorRegistration,
    interactionEditorRegistration,
    interactiveGraphEditorRegistration,
    labelImageEditorRegistration,
    matcherEditorRegistration,
    matrixEditorRegistration,
    measurerEditorRegistration,
    numberLineEditorRegistration,
    numericInputEditorRegistration,
    ordererEditorRegistration,
    phetSimulationEditorRegistration,
    plotterEditorRegistration,
    pythonProgramEditorRegistration,
    radioEditorRegistration,
    sorterEditorRegistration,
    tableEditorRegistration,
    videoEditorRegistration,
];

describe("editor registrations", () => {
    afterEach(() => {
        resetEditorRegistry();
        setStrictRegistration(false);
    });

    describe("registerEditors", () => {
        it("registers every descriptor in the core, widget, and editor registries", () => {
            expect(productionEditorRegistrations.length).toBeGreaterThan(0);

            registerEditors(productionEditorRegistrations);

            for (const {
                widgetRegistration,
                editor,
            } of productionEditorRegistrations) {
                const {widget, logic} = widgetRegistration;

                expect(CoreWidgetRegistry.isWidgetRegistered(logic.name)).toBe(
                    true,
                );
                expect(Widgets.getWidgetExport(widget.name)).toBe(widget);
                expect(getEditor(widget.name)).toBe(editor);
            }
        });
    });

    describe("defineEditorRegistration", () => {
        it("returns the widget registration and editor unchanged", () => {
            const registration = defineEditorRegistration({
                widgetRegistration: radioRegistration,
                editor: RadioEditor,
            });

            expect(registration).toEqual({
                widgetRegistration: radioRegistration,
                editor: RadioEditor,
            });
        });

        it("exports descriptors for every production editor", () => {
            expect(
                Object.fromEntries(
                    productionEditorRegistrations.map((registration) => [
                        registration.widgetRegistration.widget.name,
                        registration.editor,
                    ]),
                ),
            ).toEqual(allEditors);
        });

        it("takes its widget type from the widget registration", () => {
            const registration = defineEditorRegistration({
                widgetRegistration: radioRegistration,
                editor: RadioEditor,
            });

            expect(registration.widgetRegistration.widget.name).toBe("radio");
        });
    });
});
