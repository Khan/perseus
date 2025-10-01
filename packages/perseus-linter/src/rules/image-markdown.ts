import {parse, traverseContent} from "@khanacademy/pure-markdown";

import Rule from "../rule";

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
            return `No inline markdown images:
Markdown images (![alt](url) format) are not recommended.
Please use the Image widget instead.`;
        }

        return null;
    },
}) as Rule;
