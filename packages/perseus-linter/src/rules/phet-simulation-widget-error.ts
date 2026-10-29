import {makeSafeUrl} from "@khanacademy/perseus-core";

import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "phet-simulation-widget-error",
    widgetType: "phet-simulation",
    severity: Rule.Severity.ERROR,
    lint(widget) {
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
});
