import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

export const gradedGroupWidgetRule = Rule.makeWidgetRule({
    name: "graded-group",
    widgetType: "graded-group",
    lint: (widget, context) => {
        return lintPerseusRenderer(widget.options, context.contentType);
    },
});
