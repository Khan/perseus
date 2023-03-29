import Rule from "../rule";

export default Rule.makeRule({
    name: "image-alt-text",
    severity: Rule.Severity.WARNING,
    selector: "image",
    lint: function (state, content, nodes, match) {
        const image = nodes[0];
        if (!image.alt || !image.alt.trim()) {
            return `Images should have alt text:
for accessibility, all images should have alt text.
Specify alt text inside square brackets after the !.`;
        }
        if (image.alt.length < 8) {
            return `Images should have alt text:
for accessibility, all images should have descriptive alt text.
This image's alt text is only ${image.alt.length} characters long.`;
        }
    },
}) as Rule;
