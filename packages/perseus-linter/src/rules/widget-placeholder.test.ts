import {expectIssue, expectPass} from "../__tests__/test-utils";

import {
    WidgetPlaceholderDuplicate,
    WidgetPlaceholderMissingWidget,
    WidgetPlaceholderUnrenderable,
} from "./widget-placeholder";

const radio = {"radio 1": {type: "radio", options: {}}};

describe("widget-placeholder-missing-widget", () => {
    it("errors on a placeholder with no widget", () => {
        expectIssue(
            WidgetPlaceholderMissingWidget,
            "Pick one: [[☃ radio 2]]",
            {widgets: radio},
            {
                messages: [
                    "[[☃ radio 2]] has no widget: nothing will render here.",
                ],
            },
        );
    });

    it("passes for a placeholder with a widget", () => {
        expectPass(WidgetPlaceholderMissingWidget, "Pick one: [[☃ radio 1]]", {
            widgets: radio,
        });
    });
});

describe("widget-placeholder-duplicate", () => {
    it("errors on a widget placed twice", () => {
        expectIssue(
            WidgetPlaceholderDuplicate,
            "[[☃ radio 1]]\n\n[[☃ radio 1]]",
            {widgets: radio},
            {
                messages: [
                    "[[☃ radio 1]] appears 2 times; a widget can be placed " +
                        "only once.",
                ],
            },
        );
    });

    it("passes for a widget placed once", () => {
        expectPass(WidgetPlaceholderDuplicate, "[[☃ radio 1]]", {
            widgets: radio,
        });
    });
});

describe("widget-placeholder-unrenderable", () => {
    it("errors on a placeholder whose id won't render", () => {
        expectIssue(
            WidgetPlaceholderUnrenderable,
            "Pick one: [[☃ Radio 1]]",
            {widgets: {}},
            {
                messages: [
                    "[[☃ Radio 1]] won't render: widget ids must be a " +
                        'lowercase type and a number, such as "radio 1".',
                ],
            },
        );
    });

    it("passes for a placeholder that renders", () => {
        expectPass(WidgetPlaceholderUnrenderable, "Pick one: [[☃ radio 1]]", {
            widgets: radio,
        });
    });
});
