/** @jsx React.DOM */
var _ = require("underscore");

/**
 * Creates a parser for a given set of rules, with the precedence
 * specified as a list of rules.
 *
 * @rules: an object containing rule type -> {regex, parse} objects
 * @ruleList: an array of rule types, specifying the precedence rules
 *   are evaluated in (earlier in the array is higher precendence)
 *
 * @returns The resulting parse function, with the following parameters:
 *   @source: the input source string to be parsed
 *   @state: an optional object to be threaded through parse
 *     calls. Allows clients to add stateful operations to
 *     parsing, such as keeping track of how many levels deep
 *     some nesting is. For an example use-case, see passage-ref
 *     parsing in src/widgets/passage/passage-markdown.jsx
 */
var parserFor = (rules, ruleList) => {
    var nestedParse = (source, state) => {
        var result = [];
        state = state || {};
        while (source) {
            var i = 0;
            while (i < ruleList.length) {
                var ruleType = ruleList[i];
                var rule = rules[ruleType];
                var capture = rule.regex.exec(source);
                if (capture) {
                    source = source.substring(capture[0].length);
                    var parsed = _.extend(
                        {type: ruleType},
                        rule.parse(capture, nestedParse, state)
                    );
                    result.push(parsed);
                    break;
                }
                i++;
            }
            if (i === rules.length) {
                throw new Error(
                    "could not find rule to match content: " + source
                );
            }
        }
        return result;
    };
    return nestedParse;
};

var outputFor = (outputFunc) => {
    var nestedOutput = (ast) => {
        if (_.isArray(ast)) {
            return _.map(ast, nestedOutput);
        } else {
            return outputFunc(ast, nestedOutput);
        }
    };
    return nestedOutput;
};

var parseCapture = (capture, parse, state) => {
    return {
        content: parse(capture[1], state)
    };
};
var ignoreCapture = () => ({});

var defaultRules = {
    heading: {
        regex: /^ *(#{1,6}) *([^\n]+?) *#* *\n+/,
        parse: (capture, parse, state) => {
            return {
                level: capture[1].length,
                content: parse(capture[2], state)
            };
        },
        output: (node, output) => {
            return React.DOM["h" + node.level](
                null,
                output(node.content)
            );
        }
    },
    lheading: {
        regex: /^([^\n]+)\n *(=|-){3,} *\n+/,
        parse: (capture, parse, state) => {
            return {
                type: "heading",
                level: capture[2] === '=' ? 1 : 2,
                content: parse(capture[1], state)
            };
        }
    },
    codeBlock: {
        regex: /^(?:    [^\n]+\n*)+\n\n/,
        parse: (capture, parse, state) => {
            var content = capture[0]
                .replace(/^    /gm, '')
                .replace(/\n+$/, '');
            return {
                content: content
            };
        },
        output: (node, output) => {
            return <pre><code>{node.content}</code></pre>;
        }
    },
    paragraph: {
        regex: /^((?:[^\n]|\n[^\n])+)\n\n+/,
        parse: parseCapture,
        output: (node, output) => {
            return <div className="paragraph">{output(node.content)}</div>;
        }
    },
    strong: {
        regex: /^\*\*([\s\S]+?)\*\*(?!\*)/,
        parse: parseCapture,
        output: (node, output) => {
            return <strong>{output(node.content)}</strong>;
        }
    },
    u: {
        regex: /^__([\s\S]+?)__(?!_)/,
        parse: parseCapture,
        output: (node, output) => {
            return <u>{output(node.content)}</u>;
        }
    },
    em: {
        regex: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        parse: (capture, parse, state) => {
            return {
                content: parse(capture[2] || capture[1], state)
            };
        },
        output: (node, output) => {
            return <em>{output(node.content)}</em>;
        }
    },
    newline: {
        regex: /^\n+/,
        parse: ignoreCapture,
        output: (node, output) => " "
    },
    text: {
        // This is finicky since it relies on not matching _ and *
        // If people add other rules like {{refs}}, this will need
        // to be changed/replaced.
        regex: /^[\s\S]+?(?=[\\<!\[_*`\n]| {2,}\n|$)/,
        parse: (capture, parse, state) => {
            return {
                content: capture[0]
            };
        },
        output: (node, output) => {
            return node.content;
        }
    }
};

var defaultPriorities = Object.keys(defaultRules);

var ruleOutput = (rules) => {
    var nestedRuleOutput = (ast, outputFunc) => {
        return rules[ast.type].output(ast, outputFunc);
    };
    return nestedRuleOutput;
};

var defaultParse = parserFor(defaultRules, defaultPriorities);
var defaultOutput = outputFor(ruleOutput(defaultRules));

module.exports = {
    parserFor: parserFor,
    outputFor: outputFor,
    defaultRules: defaultRules,
    defaultPriorities: defaultPriorities,
    ruleOutput: ruleOutput,
    defaultParse: defaultParse,
    defaultOutput: defaultOutput
};
