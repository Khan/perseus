import postcssUrl from "postcss-url";

/**
 * Keep local CSS assets as files. This includes the Symbola fonts referenced
 * by MathQuill's CSS in the math-input package. Vite otherwise inlines every
 * asset in library mode, regardless of build.assetsInlineLimit. The
 * `no-inline` query uses Vite's built-in asset emission and URL rewriting.
 */
export const createCssAssetPlugin = () =>
    postcssUrl({
        url(asset) {
            if (!asset.absolutePath || /^(?:[a-z]+:|\/\/|#)/i.test(asset.url)) {
                return asset.url;
            }

            return `${asset.url}?no-inline${asset.hash ?? ""}`;
        },
    });
