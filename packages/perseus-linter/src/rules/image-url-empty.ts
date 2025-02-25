import Rule from "../rule";

export default Rule.makeRule({
    name: "image-url-empty",
    severity: Rule.Severity.ERROR,
    selector: "image",
    lint: function (state, content, nodes) {
        const image = nodes[0];
        const url = image.target;

        // If no URL is provided, an infinite spinner will be shown in articles
        // overlaying the page where the image should be. This prevents the page
        // from fully loading. As a result, we check for URLS with all images.
        if (!url || !url.trim()) {
            return "Images should have a URL";
        }

        // NOTE(TB): Ideally there would be a check to confirm the URL works
        // and leads to a valid resource, but fetching the URL would require
        // linting to be able to handle async functions, which it currently
        // cannot do.
    },
}) as Rule;
