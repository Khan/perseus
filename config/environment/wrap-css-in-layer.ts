// A Vite plugin that puts Perseus's CSS in the cascade layers it has in
// production.
import type {Plugin} from "vite";

const excludedCssFiles = ["lato.css", "protractor.css", "mafs-styles.css"];
// This is a temporary plugin option to mimic what is in PROD in regard to cascade layers.
// Perseus CSS files are wrapped in the 'shared' layer in khan/frontend.
// To get the same ordering of precedence outside production, the imported CSS files need to be wrapped accordingly.
// Once the CSS files have cascade layers included (LEMS-2801),
//     then the following plugin option should be removed.
export const cssWrapper: Plugin = {
    name: "wrap-css-in-layer",
    transform: (code: string, pathname: string) => {
        if (pathname.endsWith(".css")) {
            // Exclude the CSS files that are not part of the shared layer.
            if (!excludedCssFiles.some((file) => pathname.endsWith(file))) {
                // Exclude any CSS file that already has a layer statement,
                //    unless it is specifying a sub-layer.
                // This runs on every CSS file, including the ~150KB
                // inlined token sheet, so it must stay linear-time.
                if (
                    !code.includes("@layer") ||
                    /\bperseus-legacy\b/.test(code) ||
                    /\bperseus-base\b/.test(code)
                ) {
                    const layerStatements =
                        "@layer reset, shared, shared.base, legacy;\n@layer shared";
                    return {
                        code: `${layerStatements} { ${code} }`,
                        map: null,
                    };
                }
            }
        }
    },
};
