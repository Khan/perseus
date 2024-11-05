import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {angleQuestion} from "../../widgets/interactive-graphs/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../../widgets/interactive-graphs/mafs-supported-graph-types";

import type {InteractiveGraphPromptJSON} from "./prompt-utils";
import type {UserEvent} from "@testing-library/user-event";

const apiOptions = {
    flags: {mafs: trueForAllMafsSupportedGraphTypes},
};

describe("interactive-graph widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should get prompt JSON for an angle graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(angleQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            angleQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "angle",
                },
                backgroundImageUrl: questionOptions.backgroundImage?.url,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [6.998933866094739, 0.12216684506098452],
                    [0, 0],
                    [6.535062985480412, 2.5085756468171017],
                ],
                angleOffsetDegrees: 1,
            },
        });
    });
});
