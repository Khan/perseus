/**
 * Paragraph parsing/splitting for article jipt i18n
 */

import SimpleMarkdown from "@khanacademy/simple-markdown";

import type {ParserRules} from "@khanacademy/simple-markdown";

const arrayRules: ParserRules = {
    fence: {
        match: SimpleMarkdown.defaultRules.fence.match,
        order: 1,
        parse: (capture, state, parse) => ({
            type: "codeBlock",
            lang: capture[2] || undefined,
            content: capture[3],
        }),
    },
    paragraph: {
        match: SimpleMarkdown.defaultRules.paragraph.match,
        order: 2,
        parse: (capture, state, parse) => ({
            content: capture[1],
        }),
    },
};

const builtArrayParser: ReturnType<typeof SimpleMarkdown.parserFor> =
    SimpleMarkdown.parserFor(arrayRules);

// This should just return an array of strings! magick!
const parseToArray = (source: string): Array<string> => {
    // Remove any leading newlines to avoid splitting weirdness
    // (simple-markdown has the `newline` rule for this, and i have
    // no idea how this will handle leading newlines without that rule),
    // and add \n\n to let it parse at a block/paragraph level
    const paragraphedSource = source.replace(/^\n\s*\n/, "") + "\n\n";
    return builtArrayParser(paragraphedSource, {inline: false}).map((c) => {
        return c["content"];
    });
};

const joinFromArray = (paragraphs: ReadonlyArray<string>): string =>
    paragraphs.join("\n\n");

export default {
    parseToArray: parseToArray,
    joinFromArray: joinFromArray,
};
