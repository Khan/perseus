import {act} from "@testing-library/react";
import $ from "jquery";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./iframe.testdata";

import type {APIOptions} from "../../types";

describe("iframe widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

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
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    //There isn't testable behavior for this widget
});

describe("iframe widget postMessage handling", () => {
    it("should update widget props to correct when testsPassed is true", () => {
        const {renderer} = renderQuestion(question1);

        const messageData = {testsPassed: true, message: "Nicely done!"};

        act(() => {
            const fakeEvent = new $.Event("message", {
                originalEvent: {data: JSON.stringify(messageData)},
            });
            $(window).trigger(fakeEvent);
        });

        const updatedProps = renderer.getWidgetProps("iframe 1");
        expect(updatedProps.status).toBe("correct");
        expect(updatedProps.message).toBe("Nicely done!");
    });

    it("should update widget props to incorrect when testsPassed is false", () => {
        const apiOptions: APIOptions = {isMobile: false};
        const {renderer} = renderQuestion(question1, apiOptions);

        const messageData = {testsPassed: false, message: "Try again."};

        act(() => {
            const fakeEvent = new $.Event("message", {
                originalEvent: {data: JSON.stringify(messageData)},
            });
            $(window).trigger(fakeEvent);
        });

        const updatedProps = renderer.getWidgetProps("iframe 1");
        expect(updatedProps.status).toBe("incorrect");
        expect(updatedProps.message).toBe("Try again.");
    });

    it("should not update widget props if testsPassed is missing", () => {
        const apiOptions: APIOptions = {isMobile: false};
        const {renderer} = renderQuestion(question1, apiOptions);
        const initialProps = renderer.getWidgetProps("iframe 1");

        const messageData = {info: "This is just an informational message."};

        act(() => {
            const fakeEvent = new $.Event("message", {
                originalEvent: {data: JSON.stringify(messageData)},
            });
            $(window).trigger(fakeEvent);
        });

        const currentProps = renderer.getWidgetProps("iframe 1");
        expect(currentProps.status).toBe(initialProps.status);
        expect(currentProps.message).toBe(initialProps.message);
    });

    it("should not update widget props if message data is not valid JSON", () => {
        const apiOptions: APIOptions = {isMobile: false};
        const {renderer} = renderQuestion(question1, apiOptions);
        const initialProps = renderer.getWidgetProps("iframe 1");

        act(() => {
            const fakeEvent = new $.Event("message", {
                originalEvent: {data: "this is not json"},
            });
            $(window).trigger(fakeEvent);
        });

        const currentProps = renderer.getWidgetProps("iframe 1");
        expect(currentProps.status).toBe(initialProps.status);
        expect(currentProps.message).toBe(initialProps.message);
    });
});
