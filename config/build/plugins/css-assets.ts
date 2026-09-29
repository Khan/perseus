import postcssUrl from "postcss-url";

/**
 * Keep local CSS assets, such as MathQuill's Symbola fonts, as separate files
 * instead of embedding them in the CSS bundle. Adding `?no-inline` tells Vite
 * to emit each asset and rewrite its URL for the build output. External and
 * fragment-only URLs are left unchanged.
 */
export function createCssAssetPlugin() {
    return postcssUrl({
        url(asset) {
            // Keep scheme-based URLs (e.g. `https:` or `data:`),
            // protocol-relative URLs (e.g. `//cdn.example.com/font.woff`),
            // and fragment-only URLs (e.g. `#icon`) unchanged.
            if (!asset.absolutePath || /^(?:[a-z]+:|\/\/|#)/i.test(asset.url)) {
                return asset.url;
            }

            return `${asset.url}?no-inline${asset.hash ?? ""}`;
        },
    });
}
