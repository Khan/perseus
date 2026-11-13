import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const ExplanationWidgetRule = Rule.makeWidgetRule({
    name: "explanation",
    widgetType: "explanation",
    lint(widget, context) {
        const renderer: PerseusRenderer = {
            content: widget.options.explanation,
            widgets: widget.options.widgets,
            images: {},
        };
        return lintPerseusRenderer(renderer, context);
    },
});
