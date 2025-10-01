import Rule from "../rule";

export default Rule.makeRule({
    name: "image-markdown",
    severity: Rule.Severity.WARNING,
    selector: "image",
    lint: function (state, content, nodes, match, context) {
        // Check if we're inside a widget - if so, allow markdown images.
        if (context?.stack && context.stack.includes("widget")) {
            return;
        }

        // Discourage using markdown images in main content
        //
        // Regex for ![alt](image url):
        //   ![ start of image image regex/alt
        //   [^\]]* any characters except ]
        //   \] end of image marker
        //   \( start of image url
        //   [^\)]* any characters except )
        //   \) end of link
        //
        // NOTE: Can't use PerseusMarkdown.parse() to identify the markdown
        // image because it would try to access 'allWidgets' before
        // initialization, causing an error.
        if (context?.content.match(/!\[[^\]]*\]\([^)]*\)/)) {
            return `No inline markdown images:
Markdown images (![alt](url) format) are not recommended.
Please use the Image widget instead.`;
        }
    },
}) as Rule;
