import {testDependencies} from "../../../../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../../../../testing/wait";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {GrapherPromptJSON} from "./prompt-utils";

describe("grapher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot linear graph question", async () => {
        // Arrange and Act
        const {container} = renderQuestion(linearQuestion);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot question with multiple graph types", async () => {
        // Arrange and Act
        const {container} = renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(linearQuestion);
        const widget = renderer.getWidgetInstance("grapher 1");
        const graphOptions = linearQuestion.widgets["grapher 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as GrapherPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "grapher",
            options: {
                availableTypes: graphOptions.availableTypes,
                range: graphOptions.graph.range,
                labels: graphOptions.graph.labels,
                tickStep: graphOptions.graph.step,
                gridStep: graphOptions.graph.gridStep,
                snapStep: graphOptions.graph.snapStep,
                backgroundImage: graphOptions.graph.backgroundImage.url,
            },
            userInput: {
                type: "linear",
                coords: null,
            },
        });
    });
});
