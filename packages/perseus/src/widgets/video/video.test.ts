import {testDependenciesV2} from "../../../../../testing/test-dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1, question2} from "./video.testdata";

import type {APIOptions, PerseusDependenciesV2} from "../../types";

describe("video widget", () => {
    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should allow autoplay", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        renderQuestion(question1, apiOptions);

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.getElementsByTagName("iframe")[0]).toHaveAttribute(
            "allow",
            "autoplay",
        );
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question1, apiOptions, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "video",
                widgetId: "video",
            },
        });
    });

    it("should contain dnt param", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        renderQuestion(question2, apiOptions);

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.getElementsByTagName("iframe")[0].src).toContain(
            "dnt=1",
        );
    });

    it("should call the generateUrl dependency to set the iframe src", () => {
        // Arrange
        const dependencies: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            generateUrl: (args) => {
                return "https://www.khanacademy.org/my-test-url";
            },
        };

        // Act
        renderQuestion(question1, {}, {}, {}, dependencies);

        // Assert
        expect(document.getElementsByTagName("iframe")[0].src).toEqual(
            "https://www.khanacademy.org/my-test-url",
        );
    });
});
