/**
 * Preprocess TeX code to convert things that KaTeX doesn't know how to handle
 * to things is does.
 */

module.exports = (texCode) => {
    // Replace uses of \begin{align}...\end{align} which KaTeX doesn't
    // support (yet) with \begin{aligned}...\end{aligned} which renders
    // the same is supported by KaTeX.  It does the same for align*.
    // TODO(kevinb) update content to use aligned instead of align.
    return texCode.replace(/\{align[*]?\}/g, '{aligned}');
};
