import Rule from "../rule.js";
import {isInternalURL, getHostname} from "./lint-utils.js";

module.exports = Rule.makeRule({
    name: "link-image-url",
    selector: "link, image",
    lint: function(state, content, nodes, match) {
        const url = nodes[0].target;

        if (!isInternalURL(url)) {
            return `Don't link to third-party content:
Links and images must all be to or on KA servers such as
khanacademy.org, kastatic.org and ka-*.s3.amazonaws.com`;
        } else {
            const hostname = getHostname(url);
            if (
                hostname === "khanacademy.org" ||
                hostname.endsWith("khanacademy.org")
            ) {
                return `Don't use absolute URLs:
When linking to KA content or images, omit the
https://www.khanacademy.org URL prefix.
Use a relative URL beginning with / instead.`;
            }
        }
    },
});
