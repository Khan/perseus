import * as CoreWidgetRegistry from "./core-widget-registry";
import {registerWidget, traverseChildWidgets} from "./core-widget-registry";

import type {PerseusWidget} from "../data-schema";

const registryFnNames = [
    "isWidgetRegistered",
    "getCurrentVersion",
    "getPublicWidgetOptionsFunction",
    "getDefaultWidgetOptions",
    "getSupportedAlignments",
    "getDefaultAlignment",
];

const mockWidgetType = "_test-mock-widget_";

describe("core-widget-registry", () => {
    test.each(registryFnNames)(
        "%s throws when called before registerWidget",
        (fnName) => {
            const fn = (CoreWidgetRegistry as any)[fnName];
            expect(() => fn("radio")).toThrow(
                "Core widget registry accessed before initialization!",
            );
        },
    );

    describe("traverseChildWidgets", () => {
        const realTraverseChildWidgets = (options, traverseRenderer) => {
            return {
                ...options,
                traversed: true,
            };
        };

        const validRadioWidget = {
            type: "radio",
            options: {
                choices: [
                    {content: "A", correct: true},
                    {content: "B", correct: false},
                ],
                randomize: false,
                multipleSelect: false,
                deselectEnabled: false,
                countChoices: false,
            },
            graded: true,
            static: false,
            version: {major: 0, minor: 0},
            alignment: "default",
        } as unknown as PerseusWidget;

        beforeEach(() => {
            registerWidget(mockWidgetType, {
                name: mockWidgetType,
                traverseChildWidgets: realTraverseChildWidgets,
            });
        });

        it("throws if traverseRenderer is not provided", () => {
            expect(() =>
                traverseChildWidgets(validRadioWidget, undefined),
            ).toThrow("traverseRenderer must be provided, but was not");
        });

        it("returns the widget unchanged if widget type is unregistered", () => {
            const widget = {
                type: "non-existent-widget",
                options: {foo: 1},
            } as unknown as PerseusWidget;
            const traverseRenderer = jest.fn();

            expect(traverseChildWidgets(widget, traverseRenderer)).toBe(widget);
        });

        it("returns the widget unchanged if widget has no traverseChildWidgets", () => {
            const widget = validRadioWidget;
            const traverseRenderer = jest.fn();

            const result = traverseChildWidgets(widget, traverseRenderer);
            expect(result).toBe(widget);
        });

        it("calls traverseChildWidgets when defined and returns updated widget", () => {
            const widget: PerseusWidget = {
                type: mockWidgetType as any,
                options: {foo: 1},
            };
            const traverseRenderer = jest.fn();

            const result = traverseChildWidgets(widget, traverseRenderer);

            expect(result).toEqual({
                type: mockWidgetType,
                options: {foo: 1, traversed: true},
            });
        });
    });
});
