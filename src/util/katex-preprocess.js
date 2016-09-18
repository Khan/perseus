/**
 * Preprocess TeX code to convert things that KaTeX doesn't know how to handle
 * to things is does.
 */

module.exports = (texCode) => texCode
    // Replace uses of \begin{align}...\end{align} which KaTeX doesn't
    // support (yet) with \begin{aligned}...\end{aligned} which renders
    // the same is supported by KaTeX.  It does the same for align*.
    // TODO(kevinb) update content to use aligned instead of align.
    .replace(/\{align[*]?\}/g, '{aligned}')

    // Replace non-breaking spaces with regular spaces.
    .replace(/[\u00a0]/g, ' ');
