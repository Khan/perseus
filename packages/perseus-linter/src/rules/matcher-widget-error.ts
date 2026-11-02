import {linterError} from "../lint";
import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "matcher-widget-error",
    widgetType: "matcher",
    lint(widget) {
        if (widget.options.left.length !== widget.options.right.length) {
            return linterError(
                "The two halves of the matcher have different numbers of cards.",
            );
        }
    },
});
