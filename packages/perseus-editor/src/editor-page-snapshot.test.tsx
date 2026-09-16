/**
 * The snapshot test(s) are in a separate file to avoid IDs shifting
 * from new tests being added above them.
 *
 * This is because a number of components use `React.useId()` to generate IDs,
 * and `useId` counter is global, so changing any tests above the snapshot
 * tests unnecessarily causes ID shifts and therefore snapshot updates.
 *
 * Note that adding new tests here that are not at the end of this file will
 * also expectedly cause ID shifts.
 *
 * Non-snapshot tests for the editor page can be found in
 * packages/perseus-editor/src/editor-page.test.tsx.
 */
import {Dependencies} from "@khanacademy/perseus";
import {fillInTheBlankRegistration} from "@khanacademy/perseus/widgets/fill-in-the-blank" /* widget-manifest import */;
import {registerWidgets} from "@khanacademy/perseus/widgets/registry" /* widget-manifest import */;
import {render} from "@testing-library/react";
import * as React from "react";

import {comprehensiveQuestion} from "./__testdata__/all-widgets.testdata";
import EditorPage from "./editor-page";
import {registerEditors} from "./editor-registry" /* widget-manifest import */;
import {
    testDependencies,
    testDependenciesV2,
} from "./testing/test-dependencies-data";
import {categorizerEditorRegistration} from "./widgets/categorizer-editor" /* widget-manifest import */;
import {csProgramEditorRegistration} from "./widgets/cs-program-editor" /* widget-manifest import */;
import {definitionEditorRegistration} from "./widgets/definition-editor" /* widget-manifest import */;
import {dropdownEditorRegistration} from "./widgets/dropdown-editor" /* widget-manifest import */;
import {explanationEditorRegistration} from "./widgets/explanation-editor" /* widget-manifest import */;
import {expressionEditorRegistration} from "./widgets/expression-editor" /* widget-manifest import */;
import {fillInTheBlankEditorRegistration} from "./widgets/fill-in-the-blank-editor" /* widget-manifest import */;
import {freeResponseEditorRegistration} from "./widgets/free-response-editor" /* widget-manifest import */;
import {gradedGroupEditorRegistration} from "./widgets/graded-group-editor" /* widget-manifest import */;
import {gradedGroupSetEditorRegistration} from "./widgets/graded-group-set-editor" /* widget-manifest import */;
import {grapherEditorRegistration} from "./widgets/grapher-editor" /* widget-manifest import */;
import {groupEditorRegistration} from "./widgets/group-editor" /* widget-manifest import */;
import {iframeEditorRegistration} from "./widgets/iframe-editor" /* widget-manifest import */;
import {imageEditorRegistration} from "./widgets/image-editor" /* widget-manifest import */;
import {inputNumberEditorRegistration} from "./widgets/input-number-editor" /* widget-manifest import */;
import {interactionEditorRegistration} from "./widgets/interaction-editor" /* widget-manifest import */;
import {interactiveGraphEditorRegistration} from "./widgets/interactive-graph-editor" /* widget-manifest import */;
import {labelImageEditorRegistration} from "./widgets/label-image-editor" /* widget-manifest import */;
import {matcherEditorRegistration} from "./widgets/matcher-editor" /* widget-manifest import */;
import {matrixEditorRegistration} from "./widgets/matrix-editor" /* widget-manifest import */;
import {measurerEditorRegistration} from "./widgets/measurer-editor" /* widget-manifest import */;
import {numberLineEditorRegistration} from "./widgets/number-line-editor" /* widget-manifest import */;
import {numericInputEditorRegistration} from "./widgets/numeric-input-editor" /* widget-manifest import */;
import {ordererEditorRegistration} from "./widgets/orderer-editor" /* widget-manifest import */;
import {phetSimulationEditorRegistration} from "./widgets/phet-simulation-editor" /* widget-manifest import */;
import {plotterEditorRegistration} from "./widgets/plotter-editor" /* widget-manifest import */;
import {pythonProgramEditorRegistration} from "./widgets/python-program-editor" /* widget-manifest import */;
import {radioEditorRegistration} from "./widgets/radio-editor" /* widget-manifest import */;
import {sorterEditorRegistration} from "./widgets/sorter-editor" /* widget-manifest import */;
import {tableEditorRegistration} from "./widgets/table-editor" /* widget-manifest import */;
import {videoEditorRegistration} from "./widgets/video-editor" /* widget-manifest import */;

// widget-manifest setup: start
function registerManifestWidgets(): void {
    registerWidgets([fillInTheBlankRegistration]);
    registerEditors([
        categorizerEditorRegistration,
        csProgramEditorRegistration,
        definitionEditorRegistration,
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
    ]);
}
registerManifestWidgets();
// widget-manifest setup: end
describe("EditorPage", () => {
    beforeAll(() => {
        registerManifestWidgets();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        Dependencies.setDependencies(testDependencies);
    });

    it("should match snapshot for editing disabled for all widgets", () => {
        // Arrange, Act
        const {container} = render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={comprehensiveQuestion} // question with all widgets
                apiOptions={{editingDisabled: true}} // editing disabled
                onChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // Assert
        // Note: the interactive-graph movable point renders fill/stroke="none"
        // here because its color now comes from tokenValue(), which reads a CSS
        // custom property. jsdom doesn't define those variables, so it resolves
        // to "" and Raphael renders it as "none". The real color resolves in a
        // browser (covered by Chromatic). See movable-point.tsx / .test.ts.
        expect(container).toMatchSnapshot();
    });
});
