import Rule from "../rule";

export default Rule.makeRule({
    name: "image-spaces-around-urls",
    severity: Rule.Severity.ERROR,
    selector: "image",
    lint: function (state, content, nodes, match, context) {
        const image = nodes[0];
        const url = image.target;

        // The markdown parser strips leading and trailing spaces for us,
        // but they're still a problem for our translation process, so
        // we need to go check for them in the unparsed source string
        // if we have it.
        if (context && context.content) {
            // Find the url in the original content and make sure that the
            // character before is '(' and the character after is ')'
            const index = context.content.indexOf(url);
            if (index === -1) {
                // It is not an error if we didn't find it.
                return;
            }

            if (
                context.content[index - 1] !== "(" ||
                context.content[index + url.length] !== ")"
            ) {
                return `Whitespace before or after image url:
For images, don't include any space or newlines after '(' or before ')'.
Whitespace in image URLs causes translation difficulties.`;
            }
        }
    },
}) as Rule;
