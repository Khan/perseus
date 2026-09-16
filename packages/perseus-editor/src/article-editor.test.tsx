import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {fillInTheBlankRegistration} from "@khanacademy/perseus/widgets/fill-in-the-blank" /* widget-manifest import */;
import {registerWidgets} from "@khanacademy/perseus/widgets/registry" /* widget-manifest import */;
import {render, screen} from "@testing-library/react";
import {
    userEvent as userEventLib,
    type UserEvent,
} from "@testing-library/user-event";
import * as React from "react";

import {comprehensiveQuestion} from "./__testdata__/all-widgets.testdata";
import ArticleEditor from "./article-editor";
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
describe("ArticleEditor", () => {
    beforeAll(() => {
        registerManifestWidgets();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", () => {
        // Arrange, Act
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Section 1")).toBeInTheDocument();
    });

    it("should render with 0 issues by default", () => {
        // Arrange, Act
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
            />,
        );

        // Assert
        const zeroIssuesPanel = screen.getByText("0 issues");
        expect(zeroIssuesPanel).toBeInTheDocument();
    });

    it("should render with issues when props have issues", async () => {
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
                json={[
                    {
                        content:
                            "![test image](https://www.example.com/image.png)",
                        images: {},
                        widgets: {},
                    },
                ]}
            />,
        );

        // Act - open issues panel
        const issuesPanel = screen.getByText("Issues");
        await userEvent.click(issuesPanel);

        // Assert
        expect(screen.getByText("1 issue")).toBeInTheDocument();
        expect(screen.getByText("Warning: image-markdown")).toBeInTheDocument();

        // Act - open the issue details
        const detailAccordion = screen.getByText("Warning: image-markdown");
        await userEvent.click(detailAccordion);

        // Assert
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Impact:")).toBeInTheDocument();
        expect(screen.getByText("Issue:")).toBeInTheDocument();
    });

    it("should match snapshot for editing disabled for all widgets", () => {
        // Arrange, Act
        const {container} = render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isArticle: true,
                    editingDisabled: true, // editing disabled
                }}
                imageUploader={() => {}}
                json={[comprehensiveQuestion]} // question with all widgets
                onChange={() => {}}
                previewURL="https://www.example.com"
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
