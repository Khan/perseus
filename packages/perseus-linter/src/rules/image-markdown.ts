import Rule from "../rule";

export default Rule.makeRule({
    name: "image-markdown",
    severity: Rule.Severity.WARNING,
    selector: "image",
    lint: function (state, content, nodes, match, context) {
        console.log("state", state);
        console.log("content", content);
        console.log("nodes", nodes);
        console.log("match", match);
        console.log("context", context);

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
        // By confirming the markdown is inside the content paragraph, we can
        // avoid flagging images within other widgets (e.g. Radio) that still
        // have to use markdown.
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

// STOP!!!!! THIS DOESN'T STOP FLAGGING STUFF WITHIN RADIO WIDGETS
