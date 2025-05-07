import Rule from "../rule";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

export default Rule.makeRule({
    name: "inaccessible-widget",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        console.log("Enter lint rule");
        const node = state.currentNode();
        const widgetType = node.widgetType;
        const widgetId = node.id;

        if (!widgetType || !widgetId) {
            return;
        }

        const widgetInfo = context?.widgets?.[widgetId];
        if (!widgetInfo) {
            return;
        }

        const accessible = CoreWidgetRegistry.isAccessible(widgetType, widgetInfo.options);
        if(!accessible) {
            console.log(`The widget "${widgetType}" is not accessible.`)
            return `The widget "${widgetType}" is not accessible.`
        }
    }
}) as Rule;
