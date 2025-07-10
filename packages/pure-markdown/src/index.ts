/**
 * Contains markdown related functions in pure javascript,
 * extracted from perseus-markdown.jsx
 * Note that this file may be used in stand alone nodejs, thus
 * do not import anything from Perseus
 */
export {libVersion} from "./version";

export {traverseContent} from "./traversal";

import SimpleMarkdown from "@khanacademy/simple-markdown";

const rWidgetRule = /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/;

/**
 * This match function matches math in `$`s, such as:
 *
 * $y = x + 1$
 *
 * It functions roughly like the following regex:
 * /\$([^\$]*)\$/
 *
 * Unfortunately, math may have other `$`s inside it, as
 * long as they are inside `{` braces `}`, mostly for
 * `\text{ $math$ }`.
 *
 * To parse this, we can't use a regex, since we
 * should support arbitrary nesting (even though
 * MathJax actually only supports two levels of nesting
 * here, which we *could* parse with a regex).
 *
 * Non-regex matchers like this are now a first-class
 * concept in simple-markdown. Yay!
 *
 * This can also match block-math, which is math alone in a paragraph.
 */
const mathMatcher = (source: any, state: any, isBlock: boolean) => {
    const length = source.length;
    let index = 0;

    // When looking for blocks, skip over leading spaces
    if (isBlock) {
        if (state.inline) {
            return null;
        }
        while (index < length && source[index] === " ") {
            index++;
        }
    }

    // Our source must start with a "$"
    if (!(index < length && source[index] === "$")) {
        return null;
    }

    index++;
    const startIndex = index;
    let braceLevel = 0;

    // Loop through the source, looking for a closing '$'
    // closing '$'s only count if they are not escaped with
    // a `\`, and we are not in nested `{}` braces.
    while (index < length) {
        const character = source[index];

        if (character === "\\") {
            // Consume both the `\` and the escaped char as a single
            // token.
            // This is so that the second `$` in `$\\$` closes
            // the math expression, since the first `\` is escaping
            // the second `\`, but the second `\` is not escaping
            // the second `$`.
            // This also handles the case of escaping `$`s or
            // braces `\{`
            index++;
        } else if (braceLevel <= 0 && character === "$") {
            let endIndex = index + 1;
            if (isBlock) {
                // Look for two trailing newlines after the closing `$`
                const match = /^(?: *\n){2,}/.exec(source.slice(endIndex));
                // @ts-expect-error - TS2322 - Type 'number | null' is not assignable to type 'number'.
                endIndex = match ? endIndex + match[0].length : null;
            }

            // Return an array that looks like the results of a
            // regex's .exec function:
            // capture[0] is the whole string
            // capture[1] is the first "paren" match, which is the
            //   content of the math here, as if we wrote the regex
            //   /\$([^\$]*)\$/
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (endIndex) {
                return [
                    source.substring(0, endIndex),
                    source.substring(startIndex, index),
                ];
            }
            return null;
        } else if (character === "{") {
            braceLevel++;
        } else if (character === "}") {
            braceLevel--;
        } else if (character === "\n" && source[index - 1] === "\n") {
            // This is a weird case we supported in the old
            // math implementation--double newlines break
            // math. I'm preserving it for now because content
            // creators might have questions with single '$'s
            // in paragraphs...
            return null;
        }

        index++;
    }

    // we didn't find a closing `$`
    return null;
};
const mathMatch = (source: any, state: any): any =>
    mathMatcher(source, state, false);
const blockMathMatch = (source: any, state: any): any =>
    mathMatcher(source, state, true);

const TITLED_TABLE_REGEX = new RegExp(
    "^\\|\\| +(.*) +\\|\\| *\\n" +
        "(" +
        // The simple-markdown nptable regex, without
        // the leading `^`
        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
        SimpleMarkdown.defaultRules.nptable.match.regex.source.substring(1) +
        ")",
);

const crowdinJiptMatcher = SimpleMarkdown.blockRegex(/^(crwdns.*)\n\s*\n/);

export const pureMarkdownRules = {
    ...SimpleMarkdown.defaultRules,

    // NOTE: basically ignored by JIPT. wraps everything at the outer layer
    columns: {
        order: -2,
        match: SimpleMarkdown.blockRegex(
            /^([\s\S]*\n\n)={5,}\n\n([\s\S]*)/,
        ) as any,
        parse: (capture: any, parse: any, state: any): any => {
            return {
                col1: parse(capture[1], state),
                col2: parse(capture[2], state),
            };
        },
    },
    crowdinId: {
        order: -1,
        match: (source: any, state: any, prevCapture: any): any => {
            // Only match on the just-in-place translation site
            if (state.isJipt) {
                return crowdinJiptMatcher(source, state, prevCapture);
            }
            return null;
        },
        parse: (capture: any, parse: any, state: any): any => ({
            id: capture[1],
        }),
    },
    // This is pretty much horrible, but we have a regex here to capture an
    // entire table + a title. capture[1] is the title. capture[2] of the
    // regex is a copy of the simple-markdown nptable regex. Then we turn
    // our capture[2] into tableCapture[0], and any further captures in
    // our table regex into tableCapture[1..], and we pass tableCapture to
    // our nptable regex
    titledTable: {
        // process immediately before nptables
        order: SimpleMarkdown.defaultRules.nptable.order - 0.5,
        match: SimpleMarkdown.blockRegex(TITLED_TABLE_REGEX) as any,
        parse: (capture: any, parse: any, state: any): any => {
            const title = SimpleMarkdown.parseInline(parse, capture[1], state);

            // Remove our [0] and [1] captures, and pass the rest to
            // the nptable parser
            const tableCapture = capture.slice(2);
            const table = SimpleMarkdown.defaultRules.nptable.parse(
                tableCapture,
                parse,
                state,
            );
            return {
                title: title,
                table: table,
            };
        },
    },
    widget: {
        order: SimpleMarkdown.defaultRules.link.order - 0.75,
        match: SimpleMarkdown.inlineRegex(rWidgetRule) as any,
        parse: (capture: any, parse: any, state: any): any => {
            return {
                id: capture[1],
                widgetType: capture[2],
            };
        },
    },
    blockMath: {
        order: (SimpleMarkdown.defaultRules.codeBlock.order + 0.5) as any,
        match: blockMathMatch,
        parse: (capture: any, parse: any, state: any): any => {
            return {
                content: capture[1],
            };
        },
    },
    math: {
        order: SimpleMarkdown.defaultRules.link.order - 0.25,
        match: mathMatch,
        parse: (capture: any, parse: any, state: any): any => {
            return {
                content: capture[1],
            };
        },
    },
    unescapedDollar: {
        order: SimpleMarkdown.defaultRules.link.order - 0.24,
        match: SimpleMarkdown.inlineRegex(/^(?!\\)\$/) as any,
        parse: (capture: any, parse: any, state: any): any => {
            return {};
        },
    },
    fence: {
        ...SimpleMarkdown.defaultRules.fence,
        parse: (capture: any, parse: any, state: any): any => {
            const node = SimpleMarkdown.defaultRules.fence.parse(
                capture,
                parse,
                state,
            );

            // support screenreader-only text with ```alt
            if (node.lang === "alt") {
                return {
                    type: "codeBlock",
                    lang: "alt",
                    // default codeBlock parsing doesn't parse the contents.
                    // We need to parse the contents for things like table
                    // support :).
                    // The \n\n is because the inside of the codeblock might
                    // not end in double newlines for block rules, because
                    // ordinarily we don't parse this :).
                    content: parse(node.content + "\n\n", state),
                };
            }
            return node;
        },
    },
    blockQuote: {
        ...SimpleMarkdown.defaultRules.blockQuote,
        // Replace the less restrictive blockquote regex from SimpleMarkdown
        // with a more restrictive one. The only difference should be that
        //
        // > A blockquote
        //
        // > Another blockquote
        //
        // will now match as two different blockQuotes instead of a single
        // blockquote with some paragraph breaks in it.
        //
        // The main motivation for doing this is to provide better support for
        // translators translating blockquotes with multiple paragraphs in
        // them. When translating articles, we split up paragraphs, translate
        // them separately, and then recombine them. We do this so that
        // translators don't have to translate an entire article at a time,
        // they can instead translate paragraph-by-paragraph.That system
        // doesn't understand blockquotes, so it will split up blockquotes into
        // more than one paragraph. A way to solve this would be to make that
        // system understand blockquotes, but then translators would have to
        // translate an entire, multi-paragraph blockquote at a time. Instead,
        // we choose to modify our blockquote matching to split up
        // multi-paragraph blockquotes into multiple blockquotes.
        //
        // There is also precedence for doing this splitting up in other
        // libraries, for instance CommonMark also splits up blockquotes with
        // empty lines into multiple blockquotes:
        // https://spec.commonmark.org/0.28/#example-205
        match: SimpleMarkdown.blockRegex(
            /^ *>[^\n]+(\n( *>)?[^\n]+)*\n{2,}/,
        ) as any,
    },
    // The lint rule never actually matches anything.
    // We check for lint after parsing, and, if we find any, we
    // transform the tree to add lint nodes. This rule is here
    // just for the react() function
    lint: {
        order: 1000,
        match: (s: any): any => null,
        parse: (capture: any, parse: any, state: any): any => ({}),
    },
} as const;

// @ts-expect-error - TS2345 - Argument of type '{ readonly columns: { readonly order: -2; readonly match: any; readonly parse: (capture: any, parse: any, state: any) => any; }; readonly crowdinId: { readonly order: -1; readonly match: (source: any, state: any, prevCapture: any) => any; readonly parse: (capture: any, parse: any, state: any) => any; }; ... 34 more ...' is not assignable to parameter of type 'ParserRules'.
const builtParser = SimpleMarkdown.parserFor(pureMarkdownRules);

/**
 * Parses a **Perseus** Markdown string into an AST.
 *
 * Use this function when you have content that may contain Perseus-specific
 * Markdown including things like math (`$...$`), tables, and widgets (`[[☃
 * ...]]`).
 * @param source The Perseus Markdown string to parse.
 * @param state The state object to pass to the parser.
 * @returns The Abstract Syntax Tree (AST) of the parsed Markdown.
 *
 * @todo The return type should be Array<SingleASTNode> but that breaks the
 * perseus-linter's types, so leaving it as `any` for now.
 */
export function parse(source: string, state?: any): any {
    const paragraphedSource = source + "\n\n";

    return builtParser(paragraphedSource, {
        ...state,
        inline: false,
    });
}
