import {makeSafeUrl} from "@khanacademy/perseus-core";

import {lintError} from "../lint";
import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "phet-simulation-widget-error",
    widgetType: "phet-simulation",
    lint(widget) {
        if (
            makeSafeUrl(
                widget.options.url,
                "en",
                "https://phet.colorado.edu",
            ) === null
        ) {
            return lintError("The URL is not from the PhET domain.");
        }
    },
});
