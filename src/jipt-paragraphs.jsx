/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Paragraph parsing/splitting for article jipt i18n
 */

const SimpleMarkdown = require("simple-markdown");

const arrayRules = {
    paragraph: {
        match: SimpleMarkdown.defaultRules.paragraph.match,
        order: 1,
        parse: (capture, state, parse) => capture[1],
    },
};

const builtArrayParser = SimpleMarkdown.parserFor(arrayRules);

// This should just return an array of strings! magick!
const parseToArray = (source) => {
    // Remove any leading newlines to avoid splitting weirdness
    // (simple-markdown has the `newline` rule for this, and i have
    // no idea how this will handle leading newlines without that rule),
    // and add \n\n to let it parse at a block/paragraph level
    const paragraphedSource = source.replace(/^\n\s*\n/, '') + "\n\n";
    return builtArrayParser(paragraphedSource, { inline: false });
};

const joinFromArray = (paragraphs) => paragraphs.join("\n\n");

module.exports = {
    parseToArray: parseToArray,
    joinFromArray: joinFromArray,
};
