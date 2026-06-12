import SimpleMarkdown from "@khanacademy/simple-markdown";

import {pureMarkdownRules} from "./rules";
import {pureMarkdownRules as rulesWithRendererUpgrade} from "./rules.new";

export {traverseContent} from "./traversal";
export {libVersion} from "./version";

export {pureMarkdownRules};
export {rulesWithRendererUpgrade};

// @ts-expect-error - TS2345 - Argument of type '{ readonly columns: { readonly order: -2; readonly match: any; readonly parse: (capture: any, parse: any, state: any) => any; }; readonly crowdinId: { readonly order: -1; readonly match: (source: any, state: any, prevCapture: any) => any; readonly parse: (capture: any, parse: any, state: any) => any; }; ... 34 more ...' is not assignable to parameter of type 'ParserRules'.
const builtParser = SimpleMarkdown.parserFor(pureMarkdownRules);
const builtParserWithRendererUpgrade = SimpleMarkdown.parserFor(
    // @ts-expect-error - TS2345 - Argument of type '{ readonly columns: { readonly order: -2; readonly match: any; readonly parse: (capture: any, parse: any, state: any) => any; }; readonly crowdinId: { readonly order: -1; readonly match: (source: any, state: any, prevCapture: any) => any; readonly parse: (capture: any, parse: any, state: any) => any; }; ... 34 more ...' is not assignable to parameter of type 'ParserRules'.
    rulesWithRendererUpgrade,
);
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
 */
// TODO: The return type should be Array<SingleASTNode> but that breaks the
// perseus-linter's types, so leaving it as `any` for now.
export function parse(source: string, state?: any): any {
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
}
