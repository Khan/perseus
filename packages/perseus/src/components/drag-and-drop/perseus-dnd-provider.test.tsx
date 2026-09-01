import {useDragDropManager} from "@dnd-kit/react";
import {render} from "@testing-library/react";
import * as React from "react";

import {PerseusDndProvider} from "./perseus-dnd-provider";

import type {DragDropManager} from "@dnd-kit/react";

// Captures the manager the provider configures, so tests can assert on
// the plugins and sensors that actually registered.
let capturedManager: DragDropManager | null = null;
function CaptureManager() {
    capturedManager = useDragDropManager();
    return null;
}

function renderProvider() {
    render(
        <PerseusDndProvider>
            <CaptureManager />
        </PerseusDndProvider>,
    );
}

// Some dist classes carry a compiler-added underscore prefix on their
// instance constructor names (e.g. _AutoScroller); strip it so the tests
// read against the public plugin names.
function registeredPluginNames(): string[] {
    return (
        capturedManager?.registry.plugins.values.map((plugin) =>
            plugin.constructor.name.replace(/^_+/, ""),
        ) ?? []
    );
}

describe("PerseusDndProvider", () => {
    beforeEach(() => {
        capturedManager = null;
    });

    // Guards the plugin filter: it must subtract Accessibility and only
    // Accessibility, so behavior like edge auto-scrolling stays intact.
    it.each(["AutoScroller", "Cursor", "Feedback", "PreventSelection"])(
        "keeps dnd-kit's default %s plugin",
        (pluginName) => {
            // Arrange, Act
            renderProvider();

            expect(registeredPluginNames()).toContain(pluginName);
        },
    );

    // The exact set matters, not just Accessibility's absence: a dnd-kit
    // upgrade that changes the default roster in any way must fail HERE,
    // on the upgrade PR — the provider itself deliberately never throws
    // over it.
    it("registers exactly the expected plugins, without Accessibility", () => {
        // Arrange, Act
        renderProvider();

        expect(registeredPluginNames().sort()).toEqual(
            [
                // Always-on internals dnd-kit adds to every manager.
                "CollisionNotifier",
                "ScrollListener",
                "Scroller",
                "StyleInjector",
                // The defaults we keep — minus Accessibility.
                "AutoScroller",
                "Cursor",
                "Feedback",
                "PreventSelection",
            ].sort(),
        );
    });

    it("registers the pointer sensor and no keyboard sensor", () => {
        // Arrange, Act
        renderProvider();

        const sensorNames = capturedManager?.registry.sensors.values.map(
            (sensor) => sensor.constructor.name.replace(/^_+/, ""),
        );
        expect(sensorNames).toEqual(["PointerSensor"]);
    });
});
