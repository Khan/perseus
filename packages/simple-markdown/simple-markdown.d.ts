/**
 * Typings are current as of simple-markdown 0.3.1.
 */

import "node";
import * as React from "react";

export as namespace SimpleMarkdown;

//
// INTERFACES & TYPES
//

export interface Capture extends Array<string> {
    index?: number,
    input?: string,
}
type Attr = string | number | boolean | null | undefined;
export type TableAlignment = "right" | "center" | "left" | null;

export interface SingleASTNode {
    type: string,
    [prop: string]: any,
}

export interface UnTypedASTNode {
    [prop: string]: any
}

export type ASTNode = SingleASTNode | Array<SingleASTNode>;

export interface State {
    key?: string | number | undefined;
    inline?: boolean | undefined;
    [prop: string]: any,
}
export type OptionalState = State | null | undefined;

export type ReactElement = React.ReactElement<any>;
export type ReactElements = React.ReactNode;

export interface MatchFunction {
    (source: string, state: State, prevCapture: string): Capture | null,
    regex?: RegExp,
}

export type Parser = (
    source: string,
    state?: OptionalState,
) => Array<SingleASTNode>;

export type ParseFunction = (
    capture: Capture,
    nestedParse: Parser,
    state: State,
) => (UnTypedASTNode | ASTNode);

export type SingleNodeParseFunction = (
    capture: Capture,
    nestedParse: Parser,
    state: State,
) => UnTypedASTNode;

export type Output<Result> = (
    node: ASTNode,
    state?: OptionalState
) => Result;

export type RefiningNodeOutput<Input, Result extends Input> = (
    node: SingleASTNode,
    nestedOutput: Output<Input>,
    state: State
) => Result;

export type NodeOutput<Result> = RefiningNodeOutput<Result, Result>;

export type ArrayNodeOutput<Result> = (
    node: Array<SingleASTNode>,
    nestedOutput: Output<Result>,
    state: State
) => Result;

export type ReactOutput = Output<ReactElements>;
export type ReactNodeOutput = NodeOutput<ReactElements>;
export type HtmlOutput = Output<string>;
export type HtmlNodeOutput = NodeOutput<string>;

export interface ParserRule {
    readonly order: number,
    readonly match: MatchFunction,
    readonly quality?: (capture: Capture, state: State, prevCapture: string) => number,
    readonly parse: ParseFunction,
}

export interface SingleNodeParserRule extends ParserRule {
    readonly order: number,
    readonly match: MatchFunction,
    readonly quality?: (capture: Capture, state: State, prevCapture: string) => number,
    readonly parse: SingleNodeParseFunction,
}

export interface ReactOutputRule {
    // we allow null because some rules are never output results, and that's
    // legal as long as no parsers return an AST node matching that rule.
    // We don't use ? because this makes it be explicitly defined as either
    // a valid function or null, so it can't be forgotten.
    readonly react: ReactNodeOutput | null,
}

export interface HtmlOutputRule {
    readonly html: HtmlNodeOutput | null,
}

export interface ArrayRule {
    readonly react?: ArrayNodeOutput<ReactElements>,
    readonly html?: ArrayNodeOutput<string>,
    readonly [other: string]: ArrayNodeOutput<any> | undefined,
}
export interface ReactArrayRule extends ArrayRule {
    readonly react: ArrayNodeOutput<ReactElements>,
    readonly html?: ArrayNodeOutput<string>,
    readonly [other: string]: ArrayNodeOutput<any> | undefined,
}
export interface HtmlArrayRule extends ArrayRule {
    readonly react?: ArrayNodeOutput<ReactElements>,
    readonly html: ArrayNodeOutput<string>,
    readonly [other: string]: ArrayNodeOutput<any> | undefined,
}
export interface DefaultArrayRule extends ArrayRule {
    readonly react: ArrayNodeOutput<ReactElements>,
    readonly html: ArrayNodeOutput<string>
}

export interface ParserRules {
    readonly Array?: ArrayRule,
    readonly [type: string]: ParserRule | /* only for Array: */ ArrayRule | undefined,
}

export interface OutputRules<Rule> {
    readonly Array?: ArrayRule,
    readonly [type: string]: Rule | /* only for Array: */ ArrayRule | undefined,
}
export interface Rules<OutputRule> {
    readonly Array?: ArrayRule,
    readonly [type: string]: ParserRule & OutputRule | /* only for Array: */ ArrayRule | undefined,
}
export interface ReactRules {
    readonly Array?: ReactArrayRule,
    readonly [type: string]: ParserRule & ReactOutputRule | ReactArrayRule | undefined,
}
export interface HtmlRules {
    readonly Array?: HtmlArrayRule,
    readonly [type: string]: ParserRule & HtmlOutputRule | HtmlArrayRule | undefined,
}

// We want to clarify our defaultRules types a little bit more so clients can
// reuse defaultRules built-ins. So we make some stronger guarantess when
// we can:
export interface NonNullReactOutputRule extends ReactOutputRule {
    readonly react: ReactNodeOutput,
}
export interface ElementReactOutputRule extends ReactOutputRule {
    readonly react: RefiningNodeOutput<ReactElements, ReactElement>,
}
export interface TextReactOutputRule extends ReactOutputRule {
    readonly react: RefiningNodeOutput<ReactElements, string>,
}
export interface NonNullHtmlOutputRule extends HtmlOutputRule {
    readonly html: HtmlNodeOutput,
}

export interface ReactMarkdownProps {
    source: string,
    [prop: string]: any,
}

export type DefaultInRule = SingleNodeParserRule & ReactOutputRule & HtmlOutputRule;
export type TextInOutRule = SingleNodeParserRule & TextReactOutputRule & NonNullHtmlOutputRule;
export type LenientInOutRule = SingleNodeParserRule & NonNullReactOutputRule & NonNullHtmlOutputRule;
export type DefaultInOutRule = SingleNodeParserRule & ElementReactOutputRule & NonNullHtmlOutputRule;

type DefaultRulesIndexer = ReactRules & HtmlRules;
export interface DefaultRules extends DefaultRulesIndexer {
    readonly Array: DefaultArrayRule,
    readonly heading: DefaultInOutRule,
    readonly nptable: DefaultInRule,
    readonly lheading: DefaultInRule,
    readonly hr: DefaultInOutRule,
    readonly codeBlock: DefaultInOutRule,
    readonly fence: DefaultInRule,
    readonly blockQuote: DefaultInOutRule,
    readonly list: DefaultInOutRule,
    readonly def: LenientInOutRule,
    readonly table: DefaultInOutRule,
    readonly tableSeparator: DefaultInRule,
    readonly newline: TextInOutRule,
    readonly paragraph: DefaultInOutRule,
    readonly escape: DefaultInRule,
    readonly autolink: DefaultInRule,
    readonly mailto: DefaultInRule,
    readonly url: DefaultInRule,
    readonly link: DefaultInOutRule,
    readonly image: DefaultInOutRule,
    readonly reflink: DefaultInRule,
    readonly refimage: DefaultInRule,
    readonly em: DefaultInOutRule,
    readonly strong: DefaultInOutRule,
    readonly u: DefaultInOutRule,
    readonly del: DefaultInOutRule,
    readonly inlineCode: DefaultInOutRule,
    readonly br: DefaultInOutRule,
    readonly text: TextInOutRule,
}

export interface RefNode {
    type: string,
    content?: ASTNode,
    target?: string,
    title?: string,
    alt?: string,
}


//
// EXPORTED FUNCTIONS
//

type OutputFor = <Rule extends Object, Type extends keyof Rule>(
    rules: SimpleMarkdown.OutputRules<Rule>,
    property: Type,
    defaultState?: OptionalState
) => Output<any>;

export const defaultRules: DefaultRules;
export const parserFor: (rules: ParserRules, defaultState?: OptionalState) => Parser;

export const outputFor: OutputFor;

export const inlineRegex: (regex: RegExp) => MatchFunction;
export const blockRegex: (regex: RegExp) => MatchFunction;
export const anyScopeRegex: (regex: RegExp) => MatchFunction;
export const parseInline: (parse: Parser, content: string, state: State) => ASTNode;
export const parseBlock: (parse: Parser, content: string, state: State) => ASTNode;

export const markdownToReact: (source: string, state?: OptionalState) => ReactElements;
export const markdownToHtml: (source: string, state?: OptionalState) => string;
export const ReactMarkdown: (props: { source: string, [prop: string]: any }) => ReactElement;

export const defaultRawParse: (source: string, state?: OptionalState) => Array<SingleASTNode>;
export const defaultBlockParse: (source: string, state?: OptionalState) => Array<SingleASTNode>;
export const defaultInlineParse: (source: string, state?: OptionalState) => Array<SingleASTNode>;
export const defaultImplicitParse: (source: string, state?: OptionalState) => Array<SingleASTNode>;

export const defaultReactOutput: ReactOutput;
export const defaultHtmlOutput: HtmlOutput;

export const preprocess: (source: string) => string;
export const sanitizeText: (text: Attr) => string;
export const sanitizeUrl: (url: string | null | undefined) => string | null;
export const unescapeUrl: (url: string) => string;
export const htmlTag: (tagName: string, content: string, attributes?: { [attr: string]: Attr }, isClosed?: boolean) => string;
export const reactElement: (type: string, key: string | null, props: { [prop: string]: any }) => ReactElement;
