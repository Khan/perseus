import {traverseContent} from "@khanacademy/pure-markdown";
import SimpleMarkdown from "@khanacademy/simple-markdown";
import _ from "underscore";

import {rules} from "./perseus-markdown-rules";
import {rules as rulesWithRendererUpgrade} from "./perseus-markdown-rules.new";

// Return true if the specified parse tree node represents inline content
// and false otherwise. We need this so that lint nodes can figure out whether
// they should behave as an inline wrapper or a block wrapper
export function isInline(node: any) {
    // eslint-disable-next-line no-prototype-builtins
    return !!(node && node.type && inlineNodeTypes.hasOwnProperty(node.type));
}

const inlineNodeTypes = {
    text: true,
    math: true,
    unescapedDollar: true,
    link: true,
    img: true,
    strong: true,
    u: true,
    em: true,
    del: true,
    code: true,
} as const;

// @ts-expect-error - TS2345 - Argument of type '{ readonly columns: { readonly react: (node: any, output: any, state: any) => Element; readonly order: -2; readonly match: any; readonly parse: (capture: any, parse: any, state: any) => any; }; ... 35 more ...; readonly text: TextInOutRule; }' is not assignable to parameter of type 'ParserRules'.
const builtParser = SimpleMarkdown.parserFor(rules);
const builtParserWithRendererUpgrade = SimpleMarkdown.parserFor(
    // @ts-expect-error - TS2345 - Argument of type '{ readonly columns: { readonly react: (node: any, output: any, state: any) => Element; readonly order: -2; readonly match: any; readonly parse: (capture: any, parse: any, state: any) => any; }; ... 35 more ...; readonly text: TextInOutRule; }' is not assignable to parameter of type 'ParserRules'.
    rulesWithRendererUpgrade,
);
const parse = (source: string, state: any): any => {
    const paragraphedSource = source + "\n\n";
    const rendererFF = state.rendererFF;

    return rendererFF
        ? builtParserWithRendererUpgrade(paragraphedSource, {
              ...state,
              inline: false,
          })
        : builtParser(paragraphedSource, {
              ...state,
              inline: false,
          });
};
const inlineParser = (source: string, state: any): any => {
    const rendererFF = state.rendererFF;
    return rendererFF
        ? builtParserWithRendererUpgrade(source, {
              ...state,
              inline: true,
          })
        : builtParser(source, {
              ...state,
              inline: true,
          });
};

/**
 * Pull out text content from a Perseus Markdown AST.
 * Returns an array of strings.
 */
const getContent = (ast: any) => {
    // Simplify logic by dealing with a single AST node at a time
    if (_.isArray(ast)) {
        return _.flatten(_.map(ast, getContent));
    }

    // Base case: This is where we actually extract text content
    if (ast.content && _.isString(ast.content)) {
        // Collapse whitespace within content unless it is code
        if (ast.type.toLowerCase().indexOf("code") !== -1) {
            // In case this is the sole child of a paragraph,
            // prevent whitespace from being trimmed later
            return ["", ast.content, ""];
        }
        return [ast.content.replace(/\s+/g, " ")];
    }

    // Recurse through child AST nodes
    // Assumptions made:
    // 1) Child AST nodes are either direct properties or inside
    //    arbitrarily nested lists that are direct properties.
    // 2) Only AST nodes have a 'type' property.
    const children = _.chain(ast)
        .values()
        .flatten()
        .filter((object) => object != null && _.has(object, "type"))
        .value();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!children.length) {
        return [];
    }
    const nestedContent = getContent(children);
    if (ast.type === "paragraph" && nestedContent.length) {
        // Trim whitespace before or after a paragraph
        nestedContent[0] = nestedContent[0].replace(/^\s+/, "");
        const last = nestedContent.length - 1;
        nestedContent[last] = nestedContent[last].replace(/\s+$/, "");
    }
    return nestedContent;
};

/**
 * Count the number of characters in Perseus Markdown source.
 * Markdown markup and widget references are ignored.
 */
const characterCount = (source: string): number => {
    // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
    const ast = parse(source);
    const content = getContent(ast).join("");
    return content.length;
};

export default {
    characterCount: characterCount,
    traverseContent: traverseContent,
    parse: parse,
    parseInline: inlineParser,
    reactFor: SimpleMarkdown.reactFor,
    // eslint-disable-next-line no-restricted-syntax
    ruleOutput: SimpleMarkdown.ruleOutput(rules, "react") as any,
    // eslint-disable-next-line no-restricted-syntax
    basicOutput: SimpleMarkdown.reactFor(
        SimpleMarkdown.ruleOutput(rules, "react"),
    ) as any,
    sanitizeUrl: SimpleMarkdown.sanitizeUrl,
};
