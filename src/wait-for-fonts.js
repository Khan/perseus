/**
 * Helper functions that wait for fonts to be loaded.  On mobile we measure the
 * width of TeX components so that we can scale block math to fit the width of
 * the screen.  We need to wait for fonts to be loaded so that those
 * measurements are accurate.
 *
 * TODO(kevinb): Add an API to KaTeX that returns which fonts need to be
 * loaded to render a particular TeX string.
 */

const WebFont = require('webfontloader');

let katexPromise = null;
let mathjaxPromise = null;

const getCount = (families) =>
    // Font families are described using https://github.com/typekit/fvd.
    // In short n4 = font-style: normal, font-weight: 400.
    families.reduce((accum, family) =>
        accum +
        family.indexOf('n4') !== -1 ? 1 : 0 +
        family.indexOf('i4') !== -1 ? 1 : 0 +
        family.indexOf('n7') !== -1 ? 1 : 0
    );

const waitForFonts = (families, testStrings) => {
    // Create a single Promise and reuse it because we only want to call
    // WebFont.load once.
    let activeCount = 0;

    return new Promise((resolve, reject) => {
        const count = getCount(families);

        WebFont.load({
            custom: {
                families,
                testStrings,
            },
            fontactive: (familyName, fvd) => {
                activeCount++;
                if (activeCount === count) {
                    resolve();
                }
            },
            fontinactive: (familyName, fvd) => {
                activeCount++;
                if (activeCount === count) {
                    resolve();
                }
            },
        });
    });
};

const waitForKatexFonts = () => {
    // We load more fonts than are necessary.  This should capture a
    // large portion of expressions.
    //
    // TODO(kevinb): Add an API to KaTeX that returns which fonts to load for
    // a particular piece of math.  https://github.com/Khan/KaTeX/issues/480
    const families = [
        'KaTeX_AMS:n4',
        'KaTeX_Main:n4,i4',
        'KaTeX_Math:n4,i4',
        'KaTeX_Size1:n4',
        'KaTeX_Size2:n4',
        'KaTeX_Size3:n4',
        'KaTeX_Size4:n4',
    ];

    // The webfontloader looks at specific characters within a test string to
    // determine if the font has loaded or not. In the case of these fonts,
    // they don't contain any of the characters that are used in the default
    // test strings that's why we have to specify other test strings.
    const testStrings = {
        'KaTeX_Size1': '()[]',
        'KaTeX_Size2': '()[]',
        'KaTeX_Size3': '()[]',
        'KaTeX_Size4': '()[]',
    };

    if (!katexPromise) {
        katexPromise = waitForFonts(families, testStrings);
    }
    return katexPromise;
};

const waitForMathjaxFonts = () => {
    const families = [
        'MathJax_AMS:n4',
        'MathJax_Main:n4,i4',
        'MathJax_Math:n4,i4',
        'MathJax_Size1:n4',
        'MathJax_Size2:n4',
        'MathJax_Size3:n4',
        'MathJax_Size4:n4',
    ];

    const testStrings = {
        'MathJax_Size1': '()[]',
        'MathJax_Size2': '()[]',
        'MathJax_Size3': '()[]',
        'MathJax_Size4': '()[]',
    };

    if (!mathjaxPromise) {
        mathjaxPromise = waitForFonts(families, testStrings);
    }
    return mathjaxPromise;
};

module.exports = {
    waitForKatexFonts,
    waitForMathjaxFonts,
};
