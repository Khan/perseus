import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {linterWarning} from "../lint";
import Rule from "../rule";

export default Rule.makeRule({
    name: "inaccessible-widget",
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
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

        const accessible = CoreWidgetRegistry.isAccessible(
            widgetType,
            widgetInfo.options,
        );
        if (!accessible) {
            return linterWarning(
                `The "${widgetType}" widget is not accessible.`,
                {
                    location: {start: 0, end: content.length},
                    metadata: {
                        widgetType: widgetType,
                        widgetId: widgetId,
                    },
                },
            );
        }
    },
});
