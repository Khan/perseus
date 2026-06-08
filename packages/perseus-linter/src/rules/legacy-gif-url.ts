import Rule from "../rule";

import {getHostname} from "./lint-utils";

const LEGACY_HOSTNAME = "ka-perseus-images.s3.amazonaws.com";

export default Rule.makeRule({
    name: "legacy-gif-url",
    severity: Rule.Severity.GUIDELINE,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at image widgets.
        if (state.currentNode().widgetType !== "image") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing.
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context && context.widgets && context.widgets[nodeId];
        if (!widget) {
            return;
        }

        const url = widget.options?.backgroundImage?.url;
        if (!url) {
            return;
        }

        // Legacy gifs hosted on the old S3 bucket don't render in the editor
        // iframe, so we encourage content creators to use the CDN URL instead
        // or confirm that the image displays correctly in the published content.
        if (
            getHostname(url) === LEGACY_HOSTNAME &&
            url.toLowerCase().endsWith(".gif")
        ) {
            return `Legacy gif URL:
gifs hosted at ${LEGACY_HOSTNAME} might not appear in the editor preview,
but can still be viewed in the published content. Please use a
cdn.kastatic.org/ka-perseus-images/ URL instead or confirm the
image displays correctly in the published content.`;
        }
    },
});
