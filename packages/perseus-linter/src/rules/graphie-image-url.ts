import {linterWarning} from "../lint";
import Rule from "../rule";

import {getHostname} from "./lint-utils";

const GRAPHIE_HOSTNAME = "ka-perseus-graphie.s3.amazonaws.com";

export default Rule.makeWidgetRule({
    name: "graphie-image-url",
    widgetType: "image",
    lint(widget) {
        const url = widget.options?.backgroundImage?.url;
        if (!url || getHostname(url) !== GRAPHIE_HOSTNAME) {
            return;
        }

        // A Graphie image is an SVG plus a data file of labels, which
        // Perseus lays over the SVG and translators can translate. The PNG
        // export bakes the labels into the image, so they can't be.
        if (!/\.png$/i.test(url)) {
            return;
        }
        return linterWarning(
            "This image is a png, so its labels can't be translated. " +
                "Prefer using a web+graphie:// url instead, which enables " +
                "translatable labels.",
        );
    },
});
