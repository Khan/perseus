/**
 * Preprocess TeX code to convert things that MathJax doesn't know how to handle
 * to things is does.
 */
export default (texCode: string): string =>
    texCode
        // Replace non-breaking spaces with regular spaces.
        .replace(/[\u00a0]/g, " ");
