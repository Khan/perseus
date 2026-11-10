import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

export const GroupWidgetRule = Rule.makeWidgetRule({
    name: "group",
    widgetType: "group",
    lint(widget, context) {
        return lintPerseusRenderer(widget.options, context);
    },
});
