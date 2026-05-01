import {applyDefaultsToWidget} from "./apply-defaults";
import {registerCoreWidgets} from "./core-widget-registry";

import type {PerseusWidget} from "../data-schema";

describe("applyDefaultsToWidget", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    it("defaults definition widgets to graded false when graded is omitted", () => {
        const widget = {
            type: "definition",
            alignment: "default",
            static: false,
            version: {major: 0, minor: 0},
            options: {
                togglePrompt: "term",
                definition: "",
            },
        } as PerseusWidget;

        const withDefaults = applyDefaultsToWidget(widget);

        expect(withDefaults.graded).toBe(false);
    });
});
