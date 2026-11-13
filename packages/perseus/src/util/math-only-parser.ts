import {pureMarkdownRules} from "@khanacademy/pure-markdown";
import SimpleMarkdown from "@khanacademy/simple-markdown";

/**
 * Parse a string of text and math into a list of objects with type and content
 *
 * Example: "Pi is about $\frac{22}{7}$" ==>
 *    [
 *      {type: "text", content: "Pi is about "},
 *      {type: "math", content: "\\frac{22}{7}"},
 *    ]
 */
export const mathOnlyParser = SimpleMarkdown.parserFor(
    {
        math: {
            ...pureMarkdownRules.math,
            order: 0,
        },
        text: {
            order: 1,
            match: SimpleMarkdown.anyScopeRegex(/^([^$\\{}]+)/),
            parse: (capture) => ({content: capture[0]}),
        },
        specialCharacter: {
            order: 2,
            match: SimpleMarkdown.anyScopeRegex(/^(\\[\S\s]|\$|\\$|{|})/),
            parse: (capture) => ({content: capture[0]}),
        },
    },
    {inline: true},
);

/**
 * Replace all text outside of the $ TeX blocks with `\\text{...}`
 * This way, the entire resulting string can be rendered within <TeX>
 * and the text outside of the $ blocks will be non-TeX text.
 */
export function replaceOutsideTeX(mathString: string) {
    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const parsed = mathOnlyParser(mathString);

    let result = "";

    for (const piece of parsed) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        piece.type === "math"
            ? (result += "$" + piece.content + "$")
            : piece.type === "specialCharacter"
              ? (result += escapeIfUnescaped(piece.content))
              : (result += piece.content);
    }

    return `\\text{${result}}`;
}

function escapeIfUnescaped(character: string) {
    if (character.length === 1) {
        return "\\" + character;
    } else {
        return character;
    }
}
