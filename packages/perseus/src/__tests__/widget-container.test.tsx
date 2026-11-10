import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {renderQuestion} from "../__testutils__/render-question";
import * as Dependencies from "../dependencies";
import {ApiOptions} from "../perseus-api";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";
import {containerSizeClass} from "../util/sizing-utils";
import WidgetContainer from "../widget-container";
import {registerWidget} from "../widgets";
import Explanation from "../widgets/explanation";
import Image from "../widgets/image";

import type {
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

const MockWidgetComponent = React.forwardRef<
    Widget,
    {options: {text: string; fail: boolean}}
>(function MockWidgetComponent({options: {text, fail = false}}, ref) {
    React.useImperativeHandle(ref, () => ({}));

    if (fail) {
        throw new Error("MockWidget failed to render");
    }

    return <div>{text}</div>;
});

const MockWidget: WidgetExports<typeof MockWidgetComponent> = {
    name: "mock-widget",
    displayName: "Mock Widget",
    widget: MockWidgetComponent,
};

const getBaseProps = (
    // TODO(benchristel): Pass real type arguments here. Maybe getBaseProps can
    //  be generic.
    overrides?: Partial<WidgetProps<any, any>>,
): WidgetProps<any, any> => ({
    options: {},
    trackInteraction: () => {},
    widgetId: "widget 1",
    widgetIndex: 0,
    alignment: null,
    static: false,
    problemNum: 0,
    apiOptions: {...ApiOptions.defaults, isMobile: false},
    onFocus: () => {},
    onBlur: () => {},
    findWidgets: () => [],
    reviewMode: false,
    isScorable: false,
    handleUserInput: () => {},
    userInput: {},
    linterContext: linterContextDefault,
    containerSizeClass: containerSizeClass.MEDIUM,
    ...overrides,
});

describe("widget-container", () => {
    it("renders the unsupported-widget notice when the widget isn't registered", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        render(
            <WidgetContainer
                type="invalid-widget"
                id="invalid-widget 1"
                widgetProps={getBaseProps()}
            />,
        );

        // Assert
        expect(
            screen.getByText(
                /this part of the question is no longer available/,
            ),
        ).toBeInTheDocument();
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
                    widgetProps={getBaseProps({
                        options: {
                            showPrompt: "Explanation",
                            hidePrompt: "Hide explanation",
                            explanation: "This is an explanation",
                            widgets: {},
                        },
                    })}
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
            widgetProps: Partial<WidgetProps<any, any>>,
        ) => {
            const {container} = render(
                <Dependencies.DependenciesContext.Provider
                    value={testDependenciesV2}
                >
                    <WidgetContainer
                        type={type}
                        id={`${type} 1`}
                        widgetProps={getBaseProps(widgetProps)}
                    />
                </Dependencies.DependenciesContext.Provider>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            return container.querySelector(".perseus-widget-container");
        };

        it("renders a <div> for a widget with no alignment specified", () => {
            // Arrange, Act
            const containerElement = renderContainer("mock-widget", {
                options: {text: "Hello world!", fail: false},
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });

        it("renders a <div> for a block-aligned widget", () => {
            // Arrange, Act - the image widget's default alignment is "block".
            const containerElement = renderContainer("image", {
                options: {backgroundImage: {}},
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });

        it("renders a <span> for an inline-aligned widget", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                options: {
                    showPrompt: "Explanation",
                    hidePrompt: "Hide explanation",
                    explanation: "This is an explanation",
                    widgets: {},
                },
            });

            // Assert
            expect(containerElement?.tagName).toBe("SPAN");
        });

        it("resolves a 'default' alignment through the registry", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                alignment: "default",
                options: {
                    showPrompt: "Explanation",
                    hidePrompt: "Hide explanation",
                    explanation: "This is an explanation",
                    widgets: {},
                },
            });

            // Assert
            expect(containerElement?.tagName).toBe("SPAN");
        });

        it("honors an explicitly-passed alignment over the widget default", () => {
            // Arrange, Act
            const containerElement = renderContainer("explanation", {
                alignment: "block",
                options: {
                    showPrompt: "Explanation",
                    hidePrompt: "Hide explanation",
                    explanation: "This is an explanation",
                    widgets: {},
                },
            });

            // Assert
            expect(containerElement?.tagName).toBe("DIV");
        });
    });

    // TODO(nisha): Delete this block along with the static overlay once every
    // widget handles its own static elements.
    describe("static overlay", () => {
        // Numeric input is on the overlay list.
        function generateNumericInputQuestion(
            isStatic: boolean,
        ): PerseusRenderer {
            return generateTestPerseusRenderer({
                content: "[[☃ numeric-input 1]]",
                widgets: {
                    "numeric-input 1": generateNumericInputWidget({
                        static: isStatic,
                    }),
                },
            });
        }

        // Dropdown handles its own static elements, so it isn't on the list.
        function generateDropdownQuestion(isStatic: boolean): PerseusRenderer {
            return generateTestPerseusRenderer({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": generateDropdownWidget({
                        static: isStatic,
                        options: generateDropdownOptions({
                            choices: [{content: "Choice", correct: true}],
                        }),
                    }),
                },
            });
        }

        const staticModes = [
            {mode: "static", isStatic: true, readOnly: false},
            {mode: "read-only", isStatic: false, readOnly: true},
        ];

        it("renders no overlay when a widget is neither static nor read-only", () => {
            // Arrange, Act
            renderQuestion(generateNumericInputQuestion(false), {
                apiOptions: {readOnly: false},
            });

            // Assert
            expect(
                screen.queryByTestId("widget-container-static-overlay"),
            ).not.toBeInTheDocument();
        });

        it.each(staticModes)(
            "renders the overlay over a widget on the overlay list when $mode",
            ({isStatic, readOnly}) => {
                // Arrange, Act
                renderQuestion(generateNumericInputQuestion(isStatic), {
                    apiOptions: {readOnly},
                });

                // Assert
                expect(
                    screen.getByTestId("widget-container-static-overlay"),
                ).toBeInTheDocument();
            },
        );

        it.each(staticModes)(
            "renders no overlay over a widget that handles its own static " +
                "elements when $mode",
            ({isStatic, readOnly}) => {
                // Arrange, Act
                renderQuestion(generateDropdownQuestion(isStatic), {
                    apiOptions: {readOnly},
                });

                // Assert
                expect(
                    screen.queryByTestId("widget-container-static-overlay"),
                ).not.toBeInTheDocument();
            },
        );

        it.each(staticModes)(
            "disables a widget that handles its own static elements when $mode",
            ({isStatic, readOnly}) => {
                // Arrange, Act
                renderQuestion(generateDropdownQuestion(isStatic), {
                    apiOptions: {readOnly},
                });

                // Assert - the widget itself blocks interaction, in a way
                // assistive technology can detect, instead of the overlay.
                expect(screen.getByRole("combobox")).toHaveAttribute(
                    "aria-disabled",
                    "true",
                );
            },
        );
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
                    widgetProps={getBaseProps({
                        options: {text: "Hello world!", fail: true},
                    })}
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
