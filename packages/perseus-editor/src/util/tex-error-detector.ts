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
 * Macros that our real math renderer (@khanacademy/mathjax-renderer) accepts
 * but KaTeX rejects.
 *
 * Content renders with MathJax, but errors are detected below by re-parsing
 * it with KaTeX. If MathJax recognizes a macro but KaTeX does not,
 * the Issues panel shows an error even though the math renders perfectly
 * in the preview and in production. Defining the macros here prevents those
 * false positives.
 *
 * KaTeX's output is discarded — only its errors matter — so an expansion need
 * not resemble MathJax's. It only has to parse in both math and text mode, take
 * the same number of arguments, and avoid referring to itself, since these
 * shadow KaTeX's own definitions (`"\\AA": "\\text{\\AA}"` would recurse until
 * the stack overflows). Hence the bare `{#1}` expansions.
 *
 * Derived from `texInputConfig.macros` in mathjax-renderer's
 * src/ts/tex-input-config.ts; only macros KaTeX rejects belong here, and the two
 * engines already agree on the other ~130. That config can't be imported
 * wholesale: many of its expansions use MathJax-only primitives (\unicode,
 * \enclose, \centercolon, \overparen) that KaTeX lacks.
 *
 * Scoped to English content, which is all our authors write. (Macros that
 * only appear in translated strings are deliberately absent: \sen and \cossec,
 * and \0-\9, which is what `\$1` becomes when a translator localizes the
 * currency and drops the dollar sign but not the backslash.)
 */
const MATHJAX_ONLY_MACROS: Readonly<Record<string, string>> = {
    // KaTeX defines the other bare color macros (\blue, \orange, ...) and every
    // lettered shade (\goldD etc.), but never bare \gold.
    "\\gold": "{#1}",
    "\\inte": "\\int",
    "\\RR": "\\mathbb{R}",
    // Ångström sign; KaTeX defines \AA in text mode only.
    "\\AA": "A",
    // Rational exponents: content uses \^ rather than ^ to push the exponent
    // higher. KaTeX defines \^ only as a text-mode circumflex accent.
    "\\^": "{#1}",
    "\\lcm": "\\operatorname{lcm}",
    "\\gcf": "\\operatorname{gcf}",
    // A one-argument no-op in MathJax, undefined in KaTeX. The empty expansion
    // is deliberate: KaTeX sizes array rows by reading this macro's definition
    // instead of expanding it in place, so a matching `{#1}` arity makes every
    // array, matrix and aligned environment eat its own first cell.
    "\\arraystretch": "",
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
