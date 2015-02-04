var _ = require("underscore");

var SimpleMarkdown = require("simple-markdown");
var TeX = require("react-components/tex.jsx");
var Util = require("./util.js");

/**
 * This "regex" matches math in `$`s, such as:
 *
 * $y = x + 1$
 *
 * It functions roughly like the following real regex:
 * /\$([^\$]*)\$/
 *
 * Unfortunately, math may have other `$`s inside it, as
 * long as they are inside `{` braces `}`, mostly for
 * `\text{ $math$ }`.
 *
 * To parse this, we can't use a real regex, since we
 * should support arbitrary nesting (even though
 * MathJax actually only supports two levels of nesting
 * here, which we *could* parse with a regex).
 *
 * So instead, we make an object that pretends to be
 * a regex by having an `exec` method that parses the
 * `$` and `{}`s in mathy text.
 *
 * All simple-markdown relies on is the `exec` method of
 * the regex, so this is safe. ish.
 */
var fakeMathRegex = {
    exec: (source) => {
        var length = source.length;
        // our source must start with a "$"
        if (length === 0 || source[0] !== "$") {
            return null;
        }
        var index = 1;
        var braceLevel = 0;

        // Loop through the source, looking for a closing '$'
        // closing '$'s only count if they are not escaped with
        // a `\`, and we are not in nested `{}` braces.
        while (index < length) {
            var character = source[index];

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

            } else if (braceLevel <= 0 &&
                    character === "$") {
                
                // Return an array that looks like the results of a
                // regex's .exec function:
                // capture[0] is the whole string
                // capture[1] is the first "paren" match, which is the
                //   content of the math here, as if we wrote the regex
                //   /\$([^\$]*)\$/
                return [
                    source.substring(0, index + 1),
                    source.substring(1, index)
                ];

            } else if (character === "{") {
                braceLevel++;

            } else if (character === "}") {
                braceLevel--;

            } else if (character === "\n" &&
                    source[index - 1] === "\n") {
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
    }
};

var TITLED_TABLE_REGEX = new RegExp(
    "^\\|\\| +(.*) +\\|\\| *\\n" +
    "(" +
    // The simple-markdown nptable regex, without
    // the leading `^`
    SimpleMarkdown.defaultRules.nptable.regex.source.substring(1) +
    ")"
);

var rules = _.extend({}, SimpleMarkdown.defaultRules, {
    columns: {
        regex: /^([\s\S]*\n\n)={5,}\n\n([\s\S]*)/,
        parse: (capture, parse, state) => {
            return {
                col1: parse(capture[1], state),
                col2: parse(capture[2], state)
            };
        },
        output: (node, output) => {
            return <div className="perseus-two-columns">
                <div className="perseus-column">
                    {output(node.col1)}
                </div>
                <div className="perseus-column">
                    {output(node.col2)}
                </div>
            </div>;
        }
    },
    // This is pretty much horrible, but we have a regex here to capture an
    // entire table + a title. capture[1] is the title. capture[2] of the
    // regex is a copy of the simple-markdown nptable regex. Then we turn
    // our capture[2] into tableCapture[0], and any further captures in
    // our table regex into tableCapture[1..], and we pass tableCapture to
    // our nptable regex
    titledTable: {
        regex: TITLED_TABLE_REGEX,
        parse: (capture, parse, state) => {
            var title = parse(capture[1], state);

            // Remove our [0] and [1] captures, and pass the rest to
            // the nptable parser
            var tableCapture = _.rest(capture, 2);
            var table = SimpleMarkdown.defaultRules.nptable.parse(
                tableCapture,
                parse,
                state
            );
            return {
                title: title,
                table: table,
            };
        },
        output: (node, output) => {
            var tableOutput = node.table ?
                SimpleMarkdown.defaultRules.table.output(node.table, output) :
                "//invalid table//";
            return <div className="perseus-titled-table">
                <div className="perseus-table-title">
                    {output(node.title)}
                </div>
                <div>{tableOutput}</div>
            </div>;
        }
    },
    widget: {
        regex: Util.rWidgetRule,
        parse: (capture, parse, state) => {
            return {
                id: capture[1],
                widgetType: capture[2]
            };
        },
        output: (node, output) => {
            // The actual output is handled in the renderer, where
            // we know the current widget props/state. This is
            // just a stub for testing.
            return <em>[Widget: {node.id}]</em>;
        }
    },
    math: {
        regex: fakeMathRegex,
        parse: (capture, parse, state) => {
            return {
                content: capture[1]
            };
        },
        output: (node, output) => {
            // The actual output is handled in the renderer, because
            // it needs to pass in an `onRender` callback prop. This
            // is just a stub for testing.
            return <TeX>{node.content}</TeX>;
        }
    },
});

var linkRuleIndex = SimpleMarkdown.defaultPriorities.indexOf("link");
var tableRuleIndex = SimpleMarkdown.defaultPriorities.indexOf("table");
if (linkRuleIndex < 0 || tableRuleIndex < 0) {
    // assert that we found the positions in the priority list at
    // which to insert our rules.
    throw new Error(
        "could not find link/table rule in simple-markdown to place " +
        "perseus table, widget, and math rules before"
    );
}

var priorities = _.clone(SimpleMarkdown.defaultPriorities);
priorities.unshift("columns");
// Inject our block table rule before normal tables
priorities.splice(
    tableRuleIndex,
    0,
    "titledTable"
);
// Naively inject our inline rules before links so that our `[[`s take
// precedence
priorities.splice(
    linkRuleIndex,
    0,
    "widget",
    "math"
);

var builtParser = SimpleMarkdown.parserFor(rules, priorities);
var parse = (source) => {
    var paragraphedSource = source + "\n\n";
    return builtParser(paragraphedSource);
};

/**
 * Pull out text content from a Perseus Markdown AST.
 * Returns an array of strings. 
 */
var getContent = (ast) => {
    // Simplify logic by dealing with a single AST node at a time
    if (_.isArray(ast)) {
        return _.flatten(_.map(ast, getContent));
    }

    // Base case: This is where we actually extract text content
    if (ast.content && _.isString(ast.content)) {
        // Collapse whitespace within content unless it is code
        if (ast.type.toLowerCase().indexOf('code') !== -1) {
            // In case this is the sole child of a paragraph,
            // prevent whitespace from being trimmed later
            return ['', ast.content, ''];
        } else {
            return [ast.content.replace(/\s+/g, ' ')];
        }
    }

    // Recurse through child AST nodes
    // Assumptions made:
    // 1) Child AST nodes are either direct properties or inside
    //    arbitrarily nested lists that are direct properties.
    // 2) Only AST nodes have a 'type' property.
    var children = _.chain(ast)
        .values()
        .flatten()
        .filter((object) => object != null && _.has(object, 'type'))
        .value();

    if (!children.length) {
        return [];
    } else {
        var nestedContent = getContent(children);
        if (ast.type === 'paragraph' && nestedContent.length) {
            // Trim whitespace before or after a paragraph
            nestedContent[0] = nestedContent[0].replace(/^\s+/, '');
            var last = nestedContent.length - 1;
            nestedContent[last] = nestedContent[last].replace(/\s+$/, '');
        }
        return nestedContent;
    }
};

/**
 * Count the number of characters in Perseus Markdown source.
 * Markdown markup and widget references are ignored.
 */
var characterCount = (source) => {
    var ast = parse(source);
    var content = getContent(ast).join('');
    return content.length;
};

module.exports = {
    characterCount: characterCount,
    parse: parse,
    outputFor: SimpleMarkdown.outputFor,
    ruleOutput: SimpleMarkdown.ruleOutput(rules),
    testOutput: SimpleMarkdown.outputFor(SimpleMarkdown.ruleOutput(rules)),
    sanitizeUrl: SimpleMarkdown.sanitizeUrl,
};

