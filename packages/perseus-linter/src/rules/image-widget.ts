import Rule from "../rule";

// Normally we have one rule per file. But since our selector class
// can't match specific widget types directly, this rule implements
// a number of image widget related rules in one place. This should
// slightly increase efficiency, but it means that if there is more
// than one problem with an image widget, the user will only see one
// problem at a time.
export default Rule.makeRule({
    name: "image-widget",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at image widgets
        if (state.currentNode().widgetType !== "image") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context && context.widgets && context.widgets[nodeId];
        if (!widget) {
            return;
        }

        // Make sure there is alt text
        const alt = widget.options.alt;
        if (!alt) {
            return `Images should have alt text:
for accessibility, all images should have a text description.
Add a description in the "Alt Text" box of the image widget.`;
        }

        // Make sure the alt text it is not trivial
        if (alt.trim().length < 8) {
            return `Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${alt.trim().length} characters long.`;
        }

        // Discourage using markdown images
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
        if (context.content.match(/!\[[^\]]*\]\([^)]*\)/)) {
            return `No inline markdown images:
Markdown images (![alt](url) format) are not recommended.
Please use the Image widget instead.`;
        }
    },
}) as Rule;
