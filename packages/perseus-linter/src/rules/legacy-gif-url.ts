import Rule from "../rule";

import {getHostname} from "./lint-utils";

const LEGACY_HOSTNAME = "ka-perseus-images.s3.amazonaws.com";

export default Rule.makeWidgetRule({
    name: "legacy-gif-url",
    widgetType: "image",
    severity: Rule.Severity.GUIDELINE,
    lint(widget) {
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
