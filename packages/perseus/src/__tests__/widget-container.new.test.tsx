/***********************************************************************
 *                                                                     *
 * WARNING!!!! THERE ARE ACTIVE CHANGES HAPPENING IN THE RENDERER!     *
 *                                                                     *
 ***********************************************************************/
// TODO(LEMS-4304): feature flag cleanup - rename this file to widget-container.test.tsx.
// This file is the new widget container test file that will replace the old container tests.

import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";
import WidgetContainer from "../widget-container.new";
import {registerWidget} from "../widgets";
import Explanation from "../widgets/explanation";
import Image from "../widgets/image";

import type {PerseusDependenciesV2, WidgetExports} from "../types";

const MockWidgetComponent = ({
    text,
    fail = false,
}: {
    text: string;
    fail: boolean;
}) => {
    if (fail) {
        throw new Error("MockWidget failed to render");
    }

    return <div>{text}</div>;
};

const MockWidget: WidgetExports<typeof MockWidgetComponent> = {
    name: "mock-widget",
    displayName: "Mock Widget",
    widget: MockWidgetComponent,
};

describe("widget-container", () => {
    it("should render nothing when requested widget not registered", () => {
        // Arrange
        const warnMock = jest.spyOn(console, "warn").mockImplementation();

        // Act
        render(
            <WidgetContainer
                type="invalid-widget"
                id="invalid-widget 1"
                widgetProps={{apiOptions: {isMobile: false}}}
            />,
        );

        // Assert
        expect(warnMock).toHaveBeenCalledWith(
            "Widget type 'invalid-widget' not found!",
        );
    });

    it("should render the requested widget", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        registerWidget("explanation", Explanation);

        // Act
        render(
            <Dependencies.DependenciesContext.Provider
                value={testDependenciesV2}
            >
                <WidgetContainer
                    type="explanation"
                    id="explanation 1"
                    widgetProps={{
                        showPrompt: "Explanation",
                        hidePrompt: "Hide explanation",
                        explanation: "This is an explanation",
                        widgets: {},

                        findWidgets: () => [],

                        apiOptions: {isMobile: false},
                    }}
                />
            </Dependencies.DependenciesContext.Provider>,
        );

        // Assert - widget renders button
        expect(screen.getByText("Explanation")).toBeInTheDocument();
    });

    describe("container element by alignment", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            registerWidget("explanation", Explanation);
            registerWidget("image", Image);
            registerWidget("mock-widget", MockWidget);
        });

        const renderContainer = (
            type: string,
            widgetProps: Record<string, unknown>,
        ) => {
            const {container} = render(
                <Dependencies.DependenciesContext.Provider
                    value={testDependenciesV2}
                >
                    <WidgetContainer
                        type={type}
                        id={`${type} 1`}
                        widgetProps={{
                            findWidgets: () => [],
                            apiOptions: {isMobile: false},
                            ...widgetProps,
                        }}
                    />
                </Dependencies.DependenciesContext.Provider>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            return container.querySelector(".perseus-widget-container");
        };

        it("renders a <div> for a widget with no alignment specified", () => {
            // Arrange, Act
            const containerElement = renderContainer("mock-widget", {
                text: "Hello world!",
                fail: false,
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });

        it("renders a <div> for a block-aligned widget", () => {
            // Arrange, Act - the image widget's default alignment is "block".
            const containerElement = renderContainer("image", {
                backgroundImage: {},
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });

        it("renders a <span> for an inline-aligned widget", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                showPrompt: "Explanation",
                hidePrompt: "Hide explanation",
                explanation: "This is an explanation",
                widgets: {},
            });

            // Assert
            expect(containerElement?.tagName).toBe("SPAN");
        });

        it("resolves a 'default' alignment through the registry", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                alignment: "default",
                showPrompt: "Explanation",
                hidePrompt: "Hide explanation",
                explanation: "This is an explanation",
                widgets: {},
            });

            // Assert
            expect(containerElement?.tagName).toBe("SPAN");
        });

        it("honors an explicitly-passed alignment over the widget default", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                alignment: "block",
                showPrompt: "Explanation",
                hidePrompt: "Hide explanation",
                explanation: "This is an explanation",
                widgets: {},
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });
    });

    it("should send analytics even when widget rendering errors", () => {
        // Arrange
        jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue(
            "userAgent",
        );
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(console, "error").mockImplementation(() => {});

        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        registerWidget("mock-widget", MockWidget);

        // Act
        render(
            <Dependencies.DependenciesContext.Provider value={depsV2}>
                <WidgetContainer
                    type="mock-widget"
                    id="mock-widget 1"
                    widgetProps={{
                        text: "Hello world!",
                        fail: true,

                        findWidgets: () => [],

                        apiOptions: {isMobile: false},
                    }}
                />
            </Dependencies.DependenciesContext.Provider>,
        );

        // Assert
        const expectedPayload = {
            widgetSubType: "null",
            widgetType: "mock-widget",
            widgetId: "mock-widget 1",
            message: "MockWidget failed to render",
            stack: "Error: MockWidget failed to render\n    at MockWidgetComponent",
            userAgent: "userAgent",
        };
        const expectedEventInfo = {
            type: "perseus:widget-rendering-error:ti",
            payload: expectedPayload,
        };
        expect(onAnalyticsEventSpy).toHaveBeenCalledTimes(1);
        // NOTE: We do a partial match on the stack trace since it may vary across
        // environments/runs.
        const analyticsEventArgument = onAnalyticsEventSpy.mock.calls[0][0];
        expect(Object.keys(analyticsEventArgument)).toEqual(
            Object.keys(expectedEventInfo),
        );
        expect(analyticsEventArgument.type).toEqual(expectedEventInfo.type);
        expect(Object.keys(analyticsEventArgument.payload)).toEqual(
            Object.keys(expectedPayload),
        );
        // Checking that only the beginning of the stack trace matches so that
        // running this locally won't fail. Plus, the stack trace is frickin' long!
        expect(
            analyticsEventArgument.payload.stack.startsWith(
                expectedPayload.stack,
            ),
        ).toEqual(true);
    });
});
