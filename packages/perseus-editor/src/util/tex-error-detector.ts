import {preprocessTex, PerseusMarkdown} from "@khanacademy/perseus";
import katex from "katex";
// ./katex-mhchem is imported for side effects. It adds the mhchem extension
// to KaTeX, which is needed to render chemistry expressions. This prevents
// spurious KaTeX errors from displaying in the editor for every chemistry
// expression.
// eslint-disable-next-line import/no-unassigned-import
import "../katex-mhchem";

type TexError = {
    math: string;
    message: string;
};

/**
 * Macros that our real math renderer (@khanacademy/mathjax-renderer) defines
 * but KaTeX does not.
 *
 * Content is rendered with MathJax, but errors are detected below by
 * re-parsing that same content with KaTeX. Any macro the two engines disagree
 * on surfaces in the Issues panel as an "Undefined control sequence" error for
 * math that renders perfectly in the preview and in production. Defining them
 * here keeps those false positives out.
 *
 * Keep in sync with `texInputConfig.macros` in mathjax-renderer's
 * src/tex-input-config.ts. Only macros KaTeX lacks belong here — the two
 * engines already agree on the other ~100.
 */
const MATHJAX_ONLY_MACROS: Readonly<Record<string, string>> = {
    // KaTeX owns the bare color macros \blue, \gray, \green, \orange, \pink,
    // \purple and \red, but has never defined \gold.
    // The doubled ## escapes the hex's #, which KaTeX would otherwise read as a
    // macro parameter; #1 is the argument being colored. mathjax-renderer maps
    // every gold shade, and \orange, to this one hex.
    "\\gold": "\\textcolor{##946700}{#1}",
    "\\inte": "\\int",
    "\\RR": "\\mathbb{R}",
    // Operator names, several of which are localized function names that
    // appear in translated content (\sen is sine in Spanish and Portuguese).
    "\\cossec": "\\operatorname{cossec}",
    "\\sen": "\\operatorname{sen}",
    "\\lcm": "\\operatorname{lcm}",
    "\\gcf": "\\operatorname{gcf}",
};

/**
 * Detects TeX rendering errors in markdown content by parsing the content
 * and attempting to render each math expression with KaTeX.
 *
 * @param content - The markdown content to check for TeX errors
 * @returns An array of TeX errors found in the content
 */
export function detectTexErrors(content: string): TexError[] {
    const errors: TexError[] = [];

    // Parse the entire content - PerseusMarkdown handles widget syntax correctly
    const ast = PerseusMarkdown.parse(content, {});

    PerseusMarkdown.traverseContent(ast, (node) => {
        if (node.type === "math" || node.type === "blockMath") {
            const texContent = preprocessTex(node.content);
            try {
                katex.renderToString(texContent, {
                    colorIsTextColor: true,
                    // Spread a fresh copy per expression: KaTeX writes into
                    // this object when the TeX uses \gdef, and one
                    // expression's definitions shouldn't leak into the next.
                    macros: {...MATHJAX_ONLY_MACROS},
                });
            } catch (e: any) {
                errors.push({
                    math: texContent,
                    message: e.message,
                });
            }
        }
    });

    return errors;
}
