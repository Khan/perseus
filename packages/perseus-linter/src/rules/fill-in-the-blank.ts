import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

export const FillInTheBlankRule = Rule.makeWidgetRule({
    name: "fill-in-the-blank",
    widgetType: "fill-in-the-blank",
    lint(widget, context) {
        const renderer = {
            content: widget.options.content,
            widgets: widget.options.widgets,
            images: {},
        };
        return lintPerseusRenderer(renderer, context);
    },
});
