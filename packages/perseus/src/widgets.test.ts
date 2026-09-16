import {
    CoreWidgetRegistry,
    setStrictRegistration,
} from "@khanacademy/perseus-core";
import {
    enterWidgetManifestContext,
    getWidgetManifest,
    resetWidgetManifests,
} from "@khanacademy/perseus-core/registry";

import {
    getTracking,
    getWidget,
    getWidgetExport,
    isLintable,
    isWidgetRegistered,
    registerWidget,
    registerWidgets,
    resetWidgetRegistry,
    replaceDeprecatedWidgets,
    supportsStaticMode,
    supportsUngraded,
} from "./widgets";
import {deprecatedStandinRegistration} from "./widgets/deprecated-standin";
import {MockWidget} from "./widgets/mock-widgets";

import type {WidgetExports} from "./types";
import type {WidgetRegistration} from "./widget-registration";

const fakeWidget = {
    name: "_test-widget_",
    displayName: "Test widget",
    widget: () => null,
} satisfies WidgetExports;

const fakeRegistration = {
    widget: fakeWidget,
    logic: {name: "_test-widget_", version: {major: 4, minor: 2}},
} satisfies WidgetRegistration;

describe("resetWidgetRegistry", () => {
    it("returns the widget registry to its uninitialized state", () => {
        registerWidget(fakeWidget.name, fakeWidget);

        resetWidgetRegistry();
        registerWidget("_other-test-widget_", fakeWidget);

        expect(isWidgetRegistered(fakeWidget.name)).toBe(false);
    });
});

describe("registerWidgets", () => {
    it("registers a registration's core logic and React widget", () => {
        registerWidgets([fakeRegistration]);

        expect(getWidgetExport("_test-widget_")).toBe(fakeWidget);
        expect(CoreWidgetRegistry.getCurrentVersion("_test-widget_")).toEqual({
            major: 4,
            minor: 2,
        });
    });

    it("registers a legacy React-only widget export", () => {
        registerWidgets([fakeWidget]);

        expect(getWidgetExport("_test-widget_")).toBe(fakeWidget);
    });
});

describe("manifest recording", () => {
    afterEach(() => {
        resetWidgetManifests("widget.test.tsx");
    });

    it("records React widget lookups against the active file", () => {
        const restore = enterWidgetManifestContext("widget.test.tsx");
        registerWidgets([fakeRegistration]);

        getWidget("_test-widget_");
        restore();

        expect(getWidgetManifest("widget.test.tsx").widgets).toEqual([
            "_test-widget_",
        ]);
    });
});

describe("strict registration", () => {
    const defaultingAccessors: ReadonlyArray<
        [string, (type: string) => unknown, unknown]
    > = [
        ["getWidget", getWidget, deprecatedStandinRegistration.widget.widget],
        [
            "getWidgetExport",
            getWidgetExport,
            deprecatedStandinRegistration.widget,
        ],
        ["getTracking", getTracking, ""],
        ["isLintable", isLintable, false],
        ["supportsStaticMode", supportsStaticMode, false],
        ["supportsUngraded", supportsUngraded, false],
    ];

    beforeEach(() => {
        registerWidgets([fakeRegistration]);
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
        "%s resolves a deprecated type mapped to the standin",
        (_name, accessor, expected) => {
            registerWidgets([deprecatedStandinRegistration]);
            replaceDeprecatedWidgets();

            expect(accessor("transformer")).toBe(expected);
        },
    );
});

describe("replaceDeprecatedWidgets", () => {
    it("points a deprecated type at the standin widget", () => {
        registerWidgets([deprecatedStandinRegistration]);

        replaceDeprecatedWidgets();

        expect(getWidgetExport("transformer")).toBe(
            deprecatedStandinRegistration.widget,
        );
    });

    // The core registry is process-wide and already initialized by the test
    // setup, so the delegation itself is what we can observe here.
    it("points deprecated types at the standin logic too", () => {
        const replaceLogics = jest.spyOn(
            CoreWidgetRegistry,
            "replaceDeprecatedLogics",
        );
        registerWidgets([deprecatedStandinRegistration]);

        replaceDeprecatedWidgets();

        expect(replaceLogics).toHaveBeenCalled();
    });
});

describe("registerWidget", () => {
    it("registers a test-only mock in React alone, not in core", () => {
        registerWidget(MockWidget.name, MockWidget);

        expect(getWidgetExport("mock-widget")).toBe(MockWidget);
        expect(CoreWidgetRegistry.isWidgetRegistered("mock-widget")).toBe(
            false,
        );
    });
});
