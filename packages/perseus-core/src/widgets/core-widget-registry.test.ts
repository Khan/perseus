import {
    setStrictRegistration,
    withStrictRegistration,
} from "../utils/strict-registry";

import * as CoreWidgetRegistry from "./core-widget-registry";
import {
    getCurrentVersion,
    isWidgetRegistered,
    registerLogic,
    registerLogics,
    replaceLogic,
    traverseChildWidgets,
} from "./core-widget-registry";

import type {PerseusWidget, PerseusWidgetOptions} from "../data-schema";

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
        "%s throws when called before registration",
        (fnName) => {
            // eslint-disable-next-line no-restricted-syntax
            const fn = (CoreWidgetRegistry as any)[fnName];
            expect(() => fn("radio")).toThrow(
                "Core widget registry accessed before initialization!",
            );
        },
    );

    describe("registerLogics", () => {
        it("registers each logic under its own name", () => {
            registerLogics([
                {name: "_first_", version: {major: 3, minor: 0}},
                {name: "_second_", version: {major: 7, minor: 0}},
            ]);

            expect(isWidgetRegistered("_first_")).toBe(true);
            expect(getCurrentVersion("_second_")).toEqual({
                major: 7,
                minor: 0,
            });
        });
    });

    describe("strict registration", () => {
        // [accessor name, call it for a type, the value it defaults to]
        const defaultingAccessors: ReadonlyArray<
            [string, (type: string) => unknown, unknown]
        > = [
            [
                "getCurrentVersion",
                CoreWidgetRegistry.getCurrentVersion,
                {major: 0, minor: 0},
            ],
            [
                "getDefaultWidgetOptions",
                CoreWidgetRegistry.getDefaultWidgetOptions,
                {},
            ],
            [
                "getPublicWidgetOptionsFunction",
                // The default is the identity function, so apply it to a
                // sentinel rather than comparing function references.
                (type) =>
                    CoreWidgetRegistry.getPublicWidgetOptionsFunction(type)(
                        // eslint-disable-next-line no-restricted-syntax
                        "_sentinel_" as never,
                    ),
                "_sentinel_",
            ],
            [
                "isAccessible",
                (type) =>
                    CoreWidgetRegistry.isAccessible(
                        type,
                        // eslint-disable-next-line no-restricted-syntax
                        {} as PerseusWidgetOptions,
                    ),
                false,
            ],
            [
                "getSupportedAlignments",
                CoreWidgetRegistry.getSupportedAlignments,
                ["default"],
            ],
            [
                "getDefaultAlignment",
                CoreWidgetRegistry.getDefaultAlignment,
                "block",
            ],
        ];

        beforeEach(() => {
            registerLogics([
                {name: "_registered_", version: {major: 1, minor: 0}},
            ]);
            setStrictRegistration(true);
        });

        afterEach(() => {
            setStrictRegistration(false);
        });

        test.each(defaultingAccessors)(
            "%s throws for a registered-but-missing type",
            (_name, accessor) => {
                expect(() => accessor("_missing_")).toThrow(
                    'Widget "_missing_" is not registered',
                );
            },
        );

        test.each(defaultingAccessors)(
            "%s returns its default for a missing type when not strict",
            (_name, accessor, expected) => {
                const value = withStrictRegistration(false, () =>
                    accessor("_missing_"),
                );

                expect(value).toEqual(expected);
            },
        );

        it("isWidgetRegistered tolerates a missing type under strict", () => {
            expect(isWidgetRegistered("_missing_")).toBe(false);
        });

        it("traverseChildWidgets ignores strict for a missing type", () => {
            // eslint-disable-next-line no-restricted-syntax
            const widget = {
                type: "_missing_",
                options: {foo: 1},
            } as unknown as PerseusWidget;

            expect(traverseChildWidgets(widget, jest.fn())).toBe(widget);
        });
    });

    describe("replaceLogic", () => {
        it("points the replaced type at the replacement's logic", () => {
            registerLogics([
                {name: "_standin_", version: {major: 9, minor: 1}},
                {name: "_gone_", version: {major: 2, minor: 0}},
            ]);

            replaceLogic("_gone_", "_standin_");

            expect(getCurrentVersion("_gone_")).toEqual({major: 9, minor: 1});
        });

        it("throws when the replacement is not registered", () => {
            registerLogics([
                {name: "_present_", version: {major: 1, minor: 0}},
            ]);

            expect(() =>
                replaceLogic("_present_", "_never-registered_"),
            ).toThrow("Failed to replace _present_ with _never-registered_");
        });
    });

    describe("replaceDeprecatedLogics", () => {
        it("throws when no deprecated-standin logic is registered", () => {
            expect(() => CoreWidgetRegistry.replaceDeprecatedLogics()).toThrow(
                "Failed to replace transformer with deprecated-standin",
            );
        });

        it("points deprecated types at the standin's logic", () => {
            registerLogics([
                {
                    name: "deprecated-standin",
                    version: {major: 4, minor: 2},
                },
            ]);

            CoreWidgetRegistry.replaceDeprecatedLogics();

            for (const type of [
                "transformer",
                "lights-puzzle",
                "reaction-diagram",
                "sequence",
                "simulator",
                "unit-input",
                "passage",
                "passage-ref",
                "passage-ref-target",
                "molecule-renderer",
            ]) {
                expect(getCurrentVersion(type)).toEqual({
                    major: 4,
                    minor: 2,
                });
            }
        });
    });

    describe("traverseChildWidgets", () => {
        const realTraverseChildWidgets = (options, traverseRenderer) => {
            return {
                ...options,
                traversed: true,
            };
        };

        // eslint-disable-next-line no-restricted-syntax
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
            registerLogic({
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
            // eslint-disable-next-line no-restricted-syntax
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
                // eslint-disable-next-line no-restricted-syntax
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
