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
