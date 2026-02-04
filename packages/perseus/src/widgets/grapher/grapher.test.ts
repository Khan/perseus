import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../testing/wait";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {PerseusDependenciesV2} from "../../types";

describe("grapher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
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

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(linearQuestion, undefined, undefined, undefined, depsV2);
        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "grapher",
                widgetId: "grapher 1",
            },
        });
    });
});
