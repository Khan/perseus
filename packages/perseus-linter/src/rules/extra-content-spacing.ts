import Rule from "../rule";

export default Rule.makeRule({
    name: "extra-content-spacing",
    selector: "paragraph",
    pattern: /\s+$/,
    applies: function (context) {
        return context?.contentType === "article";
    },
    message: `No extra whitespace at the end of content blocks.`,
}) as Rule;
