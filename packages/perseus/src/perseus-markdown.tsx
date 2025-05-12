import {pureMarkdownRules} from "@khanacademy/pure-markdown";
import SimpleMarkdown from "@khanacademy/simple-markdown";
import * as React from "react";
import _ from "underscore";

import Lint from "./components/lint";
import {getDependencies} from "./dependencies";

const rules = {
    ...pureMarkdownRules,

    // NOTE: basically ignored by JIPT. wraps everything at the outer layer
    columns: {
        ...pureMarkdownRules.columns,
        react: (node, output, state) => {
            return (
                <div className="perseus-two-columns" key={state.key}>
                    <div className="perseus-column">
                        <div className="perseus-column-content">
                            {output(node.col1, state)}
                        </div>
                    </div>
                    <div className="perseus-column">
                        <div className="perseus-column-content">
                            {output(node.col2, state)}
                        </div>
                    </div>
                </div>
            );
        },
    },
    // Match paragraphs consisting solely of crowdin IDs
    // (they look roughly like crwdns9238932:0), which means that
    // crowdin is going to take the DOM node that ID is rendered into
    // and count it as the top-level translation node. They mutate this
    // node, so we need to make sure it is an outer node, not an inner
    // span. So here we parse this separately and just output the
    // raw string, which becomes the body of the <QuestionParagraph>
    // created by the Renderer.
    // This currently (2015-09-01) affects only articles, since
    // for exercises the renderer just renders the crowdin id to the
    // renderer div.
    crowdinId: {
        ...pureMarkdownRules.crowdinId,
        react: (node, output, state) => node.id,
    },
    // Ensure that the table is focusable in sequential keyboard navigation
    // when rendered on mobile in a modal. Specifically this is needed for
    // Android Talkback, to enable reading/navigating tables with the swipe
    // left/right gesture. Note, setting `tabindex` doesn't appear required for
    // iOS 14.4, in order for VoiceOver to work.
    table: {
        ...pureMarkdownRules.table,
        react: function (node, output, state) {
            const table = SimpleMarkdown.defaultRules.table.react(
                node,
                output,
                state,
            );

            if (!state.isMobile) {
                return table;
            }

            return React.cloneElement(table, {tabIndex: 0});
        },
    },
    // This is pretty much horrible, but we have a regex here to capture an
    // entire table + a title. capture[1] is the title. capture[2] of the
    // regex is a copy of the simple-markdown nptable regex. Then we turn
    // our capture[2] into tableCapture[0], and any further captures in
    // our table regex into tableCapture[1..], and we pass tableCapture to
    // our nptable regex
    titledTable: {
        ...pureMarkdownRules.titledTable,
        react: (node, output, state) => {
            let contents;
            if (!node.table) {
                contents = "//invalid table//";
            } else if (node.table.type === "lint") {
                // The `table` in this node is actually a `lint` node,
                // not the expected `table` node. This is due to the linter
                // implementation "reparenting" the `table` node, see
                // perseus-linter/src/index.js
                if (node.table.content?.type === "table") {
                    // And the `content` of this lint node is the `table` node
                    // which we actually want to render. Thus, we perform
                    // surgery on the node to form the desired shape, so that
                    // we can render a `lint` node which will then recursively
                    // render the correctly shaped `titledTable` node.
                    contents = rules.lint.react(
                        {
                            ...node.table,
                            content: {
                                ...node,
                                table: node.table.content,
                            },
                        },
                        output,
                        {
                            ...state,
                            // Recursively render the `titledTable` node without
                            // the wrapper div, as we'll be wrapping `contents`
                            // ourselves below.
                            unwrapTitledTableContents: true,
                        },
                    );
                } else {
                    // We know `node.table` is actually a `lint` node, but we
                    // don't know how to handle its `content`. Let the lint
                    // node renderer figure it out.
                    contents = rules.lint.react(node.table, output, state);
                }
            } else {
                const tableOutput = SimpleMarkdown.defaultRules.table.react(
                    node.table,
                    output,
                    state,
                );

                const caption = (
                    <caption key="caption" className="perseus-table-title">
                        {output(node.title, state)}
                    </caption>
                );

                // Splice the caption into the table's children with the
                // caption as the first child.
                // @ts-expect-error - TS2769 - No overload matches this call.
                contents = React.cloneElement(tableOutput, null, [
                    caption,
                    ...tableOutput.props.children,
                ]);
            }

            if (state.unwrapTitledTableContents) {
                return contents;
            }

            // Note: if the DOM structure changes, edit the Zoomable wrapper
            // in src/renderer.jsx.
            return (
                <div className="perseus-titled-table" key={state.key}>
                    {contents}
                </div>
            );
        },
    },
    widget: {
        ...pureMarkdownRules.widget,
        react: (node, output, state) => {
            // The actual output is handled in the renderer, where
            // we know the current widget props/state. This is
            // just a stub for testing.
            return <em key={state.key}>{`[Widget: ${node.id}]`}</em>;
        },
    },
    blockMath: {
        ...pureMarkdownRules.blockMath,
        react: (node, output, state) => {
            const {TeX} = getDependencies();
            // The actual output is handled in the renderer, because
            // it needs to pass in an `onRender` callback prop. This
            // is just a stub for testing.
            return <TeX key={state.key}>{node.content}</TeX>;
        },
    },
    math: {
        ...pureMarkdownRules.math,
        react: (node, output, state) => {
            const {TeX} = getDependencies();
            // The actual output is handled in the renderer, because
            // it needs to pass in an `onRender` callback prop. This
            // is just a stub for testing.
            return <TeX key={state.key}>{node.content}</TeX>;
        },
    },
    unescapedDollar: {
        ...pureMarkdownRules.unescapedDollar,
        react: (node, output, state) => {
            // Unescaped dollar signs render correctly, but result in
            // untranslatable text after the i18n python linter flags it
            return "$";
        },
    },
    // Extend the SimpleMarkdown link parser to make the link open in a new
    // window and handle reverse tabnapping phishing attacks
    link: {
        ...pureMarkdownRules.link,
        react: function (node, output, state) {
            const link = SimpleMarkdown.defaultRules.link.react(
                node,
                output,
                state,
            );

            const href = link.props.href;
            let rel = null;
            // The href prop should always be here, but just in case somehow the article's
            // link was not put together properly, let's make sure it's there so we
            // don't break the entire page.
            const isKAUrl = href
                ? href.match(/https?:\/\/[^/]*khanacademy.org|^\//)
                : false;
            if (!isKAUrl) {
                // Prevents "reverse tabnabbing" phishing attacks
                // @ts-expect-error - TS2322 - Type '"noopener noreferrer"' is not assignable to type 'null'.
                rel = "noopener noreferrer";
            }

            const newProps = {
                ...link.props,
                target: "_blank",
                href,
                rel,
            } as const;

            if (state.baseElements && state.baseElements.Link) {
                return state.baseElements.Link(newProps);
            }
            return React.cloneElement(link, newProps);
        },
    },
    codeBlock: {
        ...pureMarkdownRules.codeBlock,
        react: (node, output, state) => {
            // ideally this should be a different rule, with only an
            // output function, but right now that breaks the parser.
            if (node.lang === "alt") {
                return (
                    <div
                        key={state.key}
                        className="perseus-markdown-alt perseus-sr-only"
                    >
                        {output(node.content, state)}
                    </div>
                );
            }
            return SimpleMarkdown.defaultRules.codeBlock.react(
                node,
                output,
                state,
            );
        },
    },
    // The lint rule never actually matches anything.
    // We check for lint after parsing, and, if we find any, we
    // transform the tree to add lint nodes. This rule is here
    // just for the react() function
    lint: {
        ...pureMarkdownRules.lint,
        react: (node, output, state) => {
            return (
                <Lint
                    message={node.message}
                    ruleName={node.ruleName}
                    inline={isInline(node.content)}
                    blockHighlight={node.blockHighlight}
                    insideTable={node.insideTable}
                    severity={node.severity}
                >
                    {output(node.content, state)}
                </Lint>
            );
        },
    },
} as const;

// Return true if the specified parse tree node represents inline content
// and false otherwise. We need this so that lint nodes can figure out whether
// they should behave as an inline wrapper or a block wrapper
function isInline(node: any) {
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
const parse = (source: string, state: any): any => {
    const paragraphedSource = source + "\n\n";

    return builtParser(paragraphedSource, {
        ...state,
        inline: false,
    });
};
const inlineParser = (source: string, state: any): any => {
    return builtParser(source, {
        ...state,
        inline: true,
    });
};

/**
 * Traverse all of the nodes in the Perseus Markdown AST. The callback is
 * called for each node in the AST.
 */
const traverseContent = (ast: any, cb: (arg1: any) => unknown) => {
    if (_.isArray(ast)) {
        _.each(ast, (node) => traverseContent(node, cb));
    } else if (_.isObject(ast)) {
        cb(ast);
        if (ast.type === "table") {
            traverseContent(ast.header, cb);
            traverseContent(ast.cells, cb);
        } else if (ast.type === "list") {
            traverseContent(ast.items, cb);
        } else if (ast.type === "titledTable") {
            traverseContent(ast.table, cb);
        } else if (ast.type === "columns") {
            traverseContent(ast.col1, cb);
            traverseContent(ast.col2, cb);
        } else if (_.isArray(ast.content)) {
            traverseContent(ast.content, cb);
        }
    }
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
    ruleOutput: SimpleMarkdown.ruleOutput(rules, "react") as any,
    basicOutput: SimpleMarkdown.reactFor(
        SimpleMarkdown.ruleOutput(rules, "react"),
    ) as any,
    sanitizeUrl: SimpleMarkdown.sanitizeUrl,
};
