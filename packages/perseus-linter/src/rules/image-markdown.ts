import {parse, traverseContent} from "@khanacademy/pure-markdown";

import Rule from "../rule";

/**
 * This rule warns when it sees Markdown images used in the
 * top-level content. We are migrating to use the `image`
 * widget exclusively for images and this helps us to alert
 * content authors of this policy change. This rule ignores
 * markdown images found within other widgets for now.
 */
export default Rule.makeRule({
    name: "image-markdown",
    severity: Rule.Severity.WARNING,
    selector: "image",
    lint: function (state, content, nodes, match, context) {
        // Check if we're inside a widget - if so, allow markdown images.
        if (context?.stack && context.stack.includes("widget")) {
            return null;
        }

        // Discourage using markdown images in main content
        const parsedMarkdown = parse(context?.content || "", {});
        let hasInlineImageNode = false;

        traverseContent(parsedMarkdown, (node: any) => {
            if (node.type === "image") {
                hasInlineImageNode = true;
            }
        });

        if (hasInlineImageNode) {
            return `[Inline markdown image]:
Markdown images are not recommended - these are images that use the
![alt](url) format. Please use the Image widget instead.`;
        }

        return null;
    },
}) as Rule;
