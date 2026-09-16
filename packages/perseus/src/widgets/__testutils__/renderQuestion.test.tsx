import {
    isStrictRegistration,
    withStrictRegistration,
} from "@khanacademy/perseus-core";

import {registerWidgets} from "../../widgets";
import {blankRegistration} from "../blank";

import {renderQuestion} from "./renderQuestion";

import type {PerseusRenderer, WidgetOptions} from "@khanacademy/perseus-core";

declare module "@khanacademy/perseus-core" {
    interface PerseusWidgetTypes {
        "unknown-widget": WidgetOptions<
            "unknown-widget",
            Record<string, never>
        >;
    }
}

registerWidgets([blankRegistration]);

const unknownWidgetQuestion: PerseusRenderer = {
    content: "[[☃ unknown-widget 1]]",
    images: {},
    widgets: {
        "unknown-widget 1": {
            type: "unknown-widget",
            graded: true,
            options: {},
        },
    },
};

describe("renderQuestion", () => {
    it("renders an unknown widget with the empty fallback", () => {
        const warn = jest.spyOn(console, "warn").mockImplementation();
        const {container, rerender} = renderQuestion(unknownWidgetQuestion, {
            allowUnregisteredWidgets: true,
        });

        expect(container).toContainHTML(
            '<div class="perseus-widget-container"></div>',
        );
        expect(warn).toHaveBeenCalledWith(
            "Widget type 'unknown-widget' not found!",
        );
        // TEST partial lint run
        expect(() => rerender(unknownWidgetQuestion)).not.toThrow();
        expect(isStrictRegistration()).toBe(true);
    });

    it("restores strict registration after a render throws", () => {
        withStrictRegistration(true, () => {
            expect(() =>
                renderQuestion(unknownWidgetQuestion, {
                    allowUnregisteredWidgets: true,
                    extraProps: {userInput: {}},
                }),
            ).toThrow("HERE");

            expect(isStrictRegistration()).toBe(true);
        });
    });
});
