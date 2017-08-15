import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "extra-content-spacing",
    selector: "paragraph",
    pattern: /\s+$/,
    applies: function(context) {
        return context.contentType === 'article';
    },
    message: `No extra whitespace at the end of content blocks.`,
});
