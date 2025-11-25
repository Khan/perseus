import {makeSafeUrl} from "@khanacademy/perseus-core";

import Rule from "../rule";

export default Rule.makeRule({
    name: "phet-simulation-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at phet-simulation widgets
        if (state.currentNode().widgetType !== "phet-simulation") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        if (
            makeSafeUrl(
                widget.options.url,
                "en",
                "https://phet.colorado.edu",
            ) === null
        ) {
            return "The URL is not from the PhET domain.";
        }
    },
}) as Rule;
