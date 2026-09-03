import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {
    getWidgetExport,
    registerWidget,
    registerWidgets,
    replaceDeprecatedWidgets,
} from "./widgets";
import {deprecatedStandinRegistration} from "./widgets/deprecated-standin";
import {MockWidget} from "./widgets/mock-widgets";

import type {WidgetRegistration} from "./widget-registration";
import type {WidgetExports} from "./types";

const fakeWidget = {
    name: "_test-widget_",
    displayName: "Test widget",
    widget: () => null,
} satisfies WidgetExports;

const fakeRegistration = {
    widget: fakeWidget,
    logic: {name: "_test-widget_", version: {major: 4, minor: 2}},
} satisfies WidgetRegistration;

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
