const WOFF2 = /format\(\s*["']?woff2["']?\s*\)/;

/**
 * Removes every font source but woff2 from the `@font-face` rules that offer
 * woff2. The MCP Apps page inlines its fonts, so the fallbacks for old
 * browsers that don't read woff2 (woff, TrueType, SVG, IE's eot) cost their
 * full size, and every browser an MCP Apps host runs in reads woff2.
 * MathQuill's Symbola offers all five: 1.5 MB inlined, 0.2 MB as woff2.
 */
export function keepWoff2Fonts(css: string): string {
    return css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => {
        // Set the URLs aside: a data URL holds ";" and ",", which also
        // separate declarations and sources.
        const urls: Array<string> = [];
        const masked = rule.replace(
            /url\([^)]*\)/g,
            (url) => `url(${urls.push(url) - 1})`,
        );
        if (!WOFF2.test(masked)) {
            return rule;
        }
        const body = masked.slice(masked.indexOf("{") + 1, -1);
        const declarations = body.split(";").flatMap((declaration) => {
            const src = /^\s*src\s*:([\s\S]*)$/.exec(declaration);
            if (src == null) {
                return [declaration];
            }
            const sources = src[1]
                .split(",")
                .filter(
                    (source) => !source.includes("url(") || WOFF2.test(source),
                );
            // A src left with no font file (IE's lone eot) is dropped; the
            // woff2 one remains.
            return sources.some((source) => source.includes("url("))
                ? [`src:${sources.join(",")}`]
                : [];
        });
        return `@font-face{${declarations.join(";")}}`.replace(
            /url\((\d+)\)/g,
            (_, index) => urls[Number(index)],
        );
    });
}
