import {act} from "@testing-library/react";

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
            const nativeMessageEvent = new MessageEvent("message", {
                data: JSON.stringify(messageData),
                origin: window.location.origin || "http://localhost",
            });
            window.dispatchEvent(nativeMessageEvent);
        });

        const updatedProps = renderer.getWidgetProps("iframe 1");
        expect(updatedProps.status).toBe("correct");
        expect(updatedProps.message).toBe("Nicely done!");
    });

    it("should update widget props to incorrect when testsPassed is false", () => {
        const {renderer} = renderQuestion(question1);

        const messageData = {testsPassed: false, message: "Try again."};

        act(() => {
            const nativeMessageEvent = new MessageEvent("message", {
                data: JSON.stringify(messageData),
                origin: window.location.origin || "http://localhost",
            });
            window.dispatchEvent(nativeMessageEvent);
        });

        const updatedProps = renderer.getWidgetProps("iframe 1");
        expect(updatedProps.status).toBe("incorrect");
        expect(updatedProps.message).toBe("Try again.");
    });

    it("should not update widget props if testsPassed is missing", () => {
        const {renderer} = renderQuestion(question1);
        const initialProps = renderer.getWidgetProps("iframe 1");

        const messageData = {info: "This is just an informational message."};

        act(() => {
            const nativeMessageEvent = new MessageEvent("message", {
                data: JSON.stringify(messageData),
                origin: window.location.origin || "http://localhost",
            });
            window.dispatchEvent(nativeMessageEvent);
        });

        const currentProps = renderer.getWidgetProps("iframe 1");
        expect(currentProps.status).toBe(initialProps.status);
        expect(currentProps.message).toBe(initialProps.message);
    });

    it("should not update widget props if message data is not valid JSON", () => {
        const {renderer} = renderQuestion(question1);
        const initialProps = renderer.getWidgetProps("iframe 1");

        act(() => {
            const nativeMessageEvent = new MessageEvent("message", {
                data: "this is not json",
                origin: window.location.origin || "http://localhost",
            });
            window.dispatchEvent(nativeMessageEvent);
        });

        const currentProps = renderer.getWidgetProps("iframe 1");
        expect(currentProps.status).toBe(initialProps.status);
        expect(currentProps.message).toBe(initialProps.message);
    });
});
