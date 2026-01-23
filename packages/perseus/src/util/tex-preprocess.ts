/**
 * Preprocess TeX code to convert things that MathJax doesn't know how to handle
 * to things is does.
 */
export default (texCode: string): string =>
    texCode
        // Replace uses of \begin{align}...\end{align} which KaTeX doesn't
        // support (yet) with \begin{aligned}...\end{aligned} which renders
        // the same is supported by KaTeX.  It does the same for align*.
        // TODO(LEMS-1608) Remove this replacement as MathJax supports the
        // "align" macro correctly (and, in fact, it is not synonymous with
        // "aligned").
        .replace(/\{align[*]?\}/g, "{aligned}")
        // Replace non-breaking spaces with regular spaces.
        .replace(/[\u00a0]/g, " ");
