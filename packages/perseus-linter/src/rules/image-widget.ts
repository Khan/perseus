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

        // Decorative images don't need alt text validation
        if (widget.options.decorative) {
            return;
        }

        const alt = widget.options.alt;

        // Non-decorative images must have alt text
        if (!alt) {
            return `Images should have alt text:
for accessibility, all images should have a text description.
Add a description in the "Alt Text" box of the image widget.`;
        }

        // Alt text must be descriptive (at least 8 characters)
        if (alt.trim().length < 8) {
            return `Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${alt.trim().length} characters long.`;
        }

        // Make sure the alt text is not too long to be navigable
        if (alt.trim().length > 150) {
            return `Images should have alt text:
for accessibility, image alt text should not exceed 150 characters.
This image's alt text is ${alt.trim().length} characters long.
Please pair your alt with a long description below if you need significantly
more text to sufficiently describe the image.`;
        }
    },
}) as Rule;
