/** @jsx React.DOM */

/**
 * Simple-Markdown
 * ===============
 *
 * Simple-Markdown's primary goal is to be easy to adapt. It aims
 * to be compliant with John Gruber's [Markdown Syntax page][1],
 * but compatiblity with other markdown implementations' edge-cases
 * will be sacrificed where it conflicts with simplicity or
 * extensibility.
 *
 * If your goal is to simply embed a standard markdown implementation
 * in your website, simple-markdown is probably not the best library
 * for you (although it should work). But if you have struggled to
 * customize an existing library to meet your needs, simple-markdown
 * might be able to help.
 *
 * Many of the regexes and original logic has been adapted from
 * the wonderful [marked.js](https://github.com/chjj/marked)
 *
 * LICENSE (MIT):
 * New code copyright (c) 2014 Khan Academy.
 *
 * Portions adapted from marked.js copyright (c) 2011-2014
 * Christopher Jeffrey (https://github.com/chjj/).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Load dependencies from the global namespace or require them
var find = (globalName) => {
    if (typeof window !== "undefined" && window[globalName]) {
        return window[globalName];
    } else if (typeof global !== "undefined" && global[globalName]) {
        return global[globalName];
    } else {
        return undefined;
    }
};

var _ = find("_") || require("underscore");
var React = find("React") || require("react");

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
                    var parsed = rule.parse(capture, nestedParse, state);
                    // We maintain the same object here so that rules can
                    // store references to the objects they return and
                    // modify them later. (oops sorry! but this adds a lot
                    // of power--see reflinks.)
                    // We also let rules override the default type of
                    // their parsed node if they would like to, so that
                    // there can be a single output function for all links,
                    // even if there are several rules to parse them.
                    if (parsed.type == null) {
                        parsed.type = ruleType;
                    }
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

// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
var LIST_BULLET = "(?:[*+-]|\\d+\\.)";
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
var LIST_ITEM_PREFIX = "( *)(" + LIST_BULLET + ") ";
var LIST_ITEM_PREFIX_R = new RegExp("^" + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
var LIST_ITEM_R = new RegExp(
    LIST_ITEM_PREFIX +
    "[^\\n]*(?:\\n" +
    "(?!\\1" + LIST_BULLET + " )[^\\n]*)*",
    "gm"
);
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
var LIST_BLOCK_END_R = /\n{2,}$/;
// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
var LIST_IS_MULTI_PARAGRAPH_R = /\n{2,}./;

var TABLES = (() => {
    // predefine regexes so we don't have to create them inside functions
    // sure, regex literals should be fast, even inside functions, but they
    // aren't in all browsers.
    var TABLE_HEADER_TRIM = /^ *| *\| *$/g;
    var TABLE_ALIGN_TRIM = /^ *|\| *$/g;

    var TABLE_CELLS_TRIM = /(?: *\| *)?\n$/;
    var NPTABLE_CELLS_TRIM = /\n$/;
    var PLAIN_TABLE_ROW_TRIM = /^ *\| *| *\| *$/g;
    var TABLE_ROW_SPLIT = / *\| */;

    var TABLE_RIGHT_ALIGN = /^ *-+: *$/;
    var TABLE_CENTER_ALIGN = /^ *:-+: *$/;
    var TABLE_LEFT_ALIGN = /^ *:-+ *$/;

    var parseTableAlignCapture = (alignCapture) => {
        if (TABLE_RIGHT_ALIGN.test(alignCapture)) {
            return "right";
        } else if (TABLE_CENTER_ALIGN.test(alignCapture)) {
            return "center";
        } else if (TABLE_LEFT_ALIGN.test(alignCapture)) {
            return "left";
        } else {
            return null;
        }
    };

    var parseTableHeader = (capture, parse, state) => {
        var headerText = capture[1]
            .replace(TABLE_HEADER_TRIM, "")
            .split(TABLE_ROW_SPLIT);
        return _.map(headerText, (text) => parse(text, state));
    };

    var parseTableAlign = (capture, parse, state) => {
        var alignText = capture[2]
            .replace(TABLE_ALIGN_TRIM, "")
            .split(TABLE_ROW_SPLIT);

        return _.map(alignText, parseTableAlignCapture);
    };

    var parseTableCells = (capture, parse, state) => {
        var rowsText = capture[3]
            .replace(TABLE_CELLS_TRIM, "")
            .split("\n");

        return _.map(rowsText, (rowText) => {
            var cellText = rowText
                .replace(PLAIN_TABLE_ROW_TRIM, "")
                .split(TABLE_ROW_SPLIT);
            return _.map(cellText, (text) => parse(text, state));
        });
    };

    var parseNpTableCells = (capture, parse, state) => {
        var rowsText = capture[3]
            .replace(NPTABLE_CELLS_TRIM, "")
            .split("\n");

        return _.map(rowsText, (rowText) => {
            var cellText = rowText.split(TABLE_ROW_SPLIT);
            return _.map(cellText, (text) => parse(text, state));
        });
    };

    var parseTable = (capture, parse, state) => {
        var header = parseTableHeader(capture, parse, state);
        var align = parseTableAlign(capture, parse, state);
        var cells = parseTableCells(capture, parse, state);

        return {
            type: "table",
            header: header,
            align: align,
            cells: cells
        };
    };

    var parseNpTable = (capture, parse, state) => {
        var header = parseTableHeader(capture, parse, state);
        var align = parseTableAlign(capture, parse, state);
        var cells = parseNpTableCells(capture, parse, state);

        return {
            type: "table",
            header: header,
            align: align,
            cells: cells
        };
    };

    return {
        parseTable: parseTable,
        parseNpTable: parseNpTable
    };
})();

var LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*";
var LINK_HREF_AND_TITLE =
        "\\s*<?([^\\s]*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";

var parseRef = (capture, state, refNode) => {
    var ref = (capture[2] || capture[1])
        .replace(/\s+/g, ' ')
        .toLowerCase();

    // We store information about previously seen defs on
    // state._defs (_ to deconflict with client-defined
    // state). If the def for this reflink/refimage has
    // already been seen, we can use its target/source
    // and title here:
    if (state._defs && state._defs[ref]) {
        _.extend(refNode, state._defs[ref]);
    }

    // In case we haven't seen our def yet (or if someone
    // overwrites that def later on), we add this node
    // to the list of ref nodes for that def. Then, when
    // we find the def, we can modify this link/image AST
    // node :).
    // I'm sorry.
    state._refs = state._refs || {};
    state._refs[ref] = state._refs[ref] || [];
    state._refs[ref].push(refNode);

    return refNode;
};

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
    nptable: {
        regex: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        parse: TABLES.parseNpTable
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
    hr: {
        regex: /^( *[-*_]){3,} *\n+/,
        parse: () => ({}),
        output: () => <hr />
    },
    codeBlock: {
        regex: /^(?:    [^\n]+\n*)+\n{2,}/,
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
    blockQuote: {
        regex: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        parse: (capture, parse, state) => {
            content = capture[0].replace(/^ *> ?/gm, '');
            return {
                content: parse(content, state)
            };
        },
        output: (node, output) => {
            return <blockquote>{output(node.content)}</blockquote>;
        }
    },
    list: {
        regex: new RegExp(
            "^( *)(" + LIST_BULLET + ") " +
            "[\\s\\S]+?(?:\n{2,}(?! )" +
            "(?!\\1" + LIST_BULLET + " )\\n*" +
            // the \\s*$ here is so that we can parse the inside of nested
            // lists, where our content might end before we receive two `\n`s
            "|\\s*$)"
        ),
        parse: (capture, parse, state) => {
            var bullet = capture[2];
            var ordered = bullet.length > 1;
            var items = capture[0].match(LIST_ITEM_R);

            var lastItemWasAParagraph = false;
            var itemContent = _.map(items, (item, i) => {
                // We need to see how far indented this item is:
                var space = LIST_ITEM_PREFIX_R.exec(item)[0].length;
                // And then we construct a regex to "unindent" the subsequent
                // lines of the items by that amount:
                var spaceRegex = new RegExp("^ {1," + space + "}", "gm");

                // Before processing the item, we need a couple things
                var content = (item + "\n")
                         // remove indents on trailing lines:
                        .replace(spaceRegex, '')
                         // remove the bullet:
                        .replace(LIST_ITEM_PREFIX_R, '');

                // Handling "loose" lists, like:
                //
                //  * this is wrapped in a paragraph
                //
                //  * as is this
                //
                //  * as is this
                if (i === items.length - 2) {
                    // We keep track of whether the second to last item is a
                    // block based on whether it ends in two+ newlines...
                    lastItemWasAParagraph =
                            content.search(LIST_BLOCK_END_R) >= 0;
                } else if (i === items.length - 1) {
                    // ...and we consider the last element to be block or not
                    // a block based on that state in the second-to-last item
                    // (or if it has two newlines in its contents)
                    if (!lastItemWasAParagraph &&
                            content.search(LIST_IS_MULTI_PARAGRAPH_R) === -1) {
                        content = content.replace(LIST_BLOCK_END_R, '');
                    }
                }

                return parse(content, state);
            });

            return {
                ordered: ordered,
                items: itemContent
            };
        },
        output: (node, output) => {
            var listWrapper = node.ordered ? React.DOM.ol : React.DOM.ul;
            return <listWrapper>
                {_.map(node.items, (item) => {
                    return <li>{output(item)}</li>;
                })}
            </listWrapper>;
        }
    },
    def: {
        regex: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *\n+/,
        parse: (capture, parse, state) => {
            var def = capture[1]
                .replace(/\s+/g, ' ')
                .toLowerCase();
            var target = capture[2];
            var title = capture[3];
            var defAttrs = {
                target: target,
                title: title
            };

            // Look for previous links/images using this def
            // If any links/images using this def have already been declared,
            // they will have added themselves to the state._refs[def] list
            // (_ to deconflict with client-defined state). We look through
            // that list of reflinks for this def, and modify those AST nodes
            // with our newly found information now.
            // Sorry :(.
            if (state._refs && state._refs[def]) {
                _.each(state._refs[def], (link) => {
                    _.extend(link, defAttrs);
                });
            }

            // Add this def to our map of defs for any future links/images
            // In case we haven't found any or all of the refs referring to
            // this def yet, we add our def to the table of known defs, so
            // that future reflinks can modify themselves appropriately with
            // this information.
            state._defs = state._defs || {};
            state._defs[def] = defAttrs;

            // return the relevant parsed information
            // for debugging only.
            return _.extend({
                def: def
            }, defAttrs);
        },
        output: () => null
    },
    table: {
        regex: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
        parse: TABLES.parseTable,
        output: (node, output) => {
            var getStyle = (colIndex) => {
                return node.align[colIndex] == null ? {} : {
                    textAlign: node.align[colIndex]
                };
            };

            var headers = _.map(node.header, (content, i) => {
                return <th style={getStyle(i)}>
                    {output(content)}
                </th>;
            });

            var rows = _.map(node.cells, (row, r) => {
                return <tr>
                    {_.map(row, (content, c) => {
                        return <td style={getStyle(c)}>
                            {output(content)}
                        </td>;
                    })}
                </tr>;
            });
            
            return <table>
                {headers}
                {rows}
            </table>;
        }
    },
    newline: {
        regex: /^\n+/,
        parse: ignoreCapture,
        output: (node, output) => " "
    },
    paragraph: {
        regex: /^((?:[^\n]|\n[^\n])+)\n\n+/,
        parse: parseCapture,
        output: (node, output) => {
            return <div className="paragraph">{output(node.content)}</div>;
        }
    },
    escape: {
        // We don't allow escaping numbers, letters, or spaces here so that
        // backslashes used in plain text still get rendered. But allowing
        // escaping anything else provides a very flexible escape mechanism,
        // regardless of how this grammar is extended.
        regex: /^\\([^0-9A-Za-z\s])/,
        parse: (capture, parse, state) => {
            return {
                type: "text",
                content: capture[1]
            };
        }
    },
    autolink: {
        regex: /^<([^ >]+:\/[^ >]+)>/,
        parse: (capture, parse, state) => {
            return {
                type: "link",
                content: [{
                    type: "text",
                    content: capture[1]
                }],
                // TODO: sanitize this
                target: capture[1]
            };
        }
    },
    mailto: {
        regex: /^<([^ >]+@[^ >]+)>/,
        parse: (capture, parse, state) => {
            var address;
            // Check for a `mailto:` already existing in the link:
            if (capture[1].substring(0, 7) === "mailto:") {
                address = capture[1].substring(7);
            } else {
                address = capture[1];
            }
            return {
                type: "link",
                content: [{
                    type: "text",
                    content: address
                }],
                // TODO: sanitize this
                target: "mailto:" + address
            };
        }
    },
    url: {
        regex: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        parse: (capture, parse, state) => {
            return {
                type: "link",
                content: [{
                    type: "text",
                    content: capture[1]
                }],
                // TODO: sanitize this
                target: capture[1]
            };
        }
    },
    link: {
        regex: new RegExp(
            "^\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)"
        ),
        parse: (capture, parse, state) => {
            var link ={
                content: parse(capture[1]),
                // TODO: sanitize this
                target: capture[2],
                title: capture[3]
            };
            return link;
        },
        output: (node, output) => {
            return React.DOM.a({
                href: node.target,
                title: node.title
            }, output(node.content));
        }
    },
    image: {
        regex: new RegExp(
            "^!\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)"
        ),
        parse: (capture, parse, state) => {
            var image = {
                alt: capture[1],
                // TODO: sanitize this
                target: capture[2],
                title: capture[3]
            };
            return image;
        },
        output: (node, output) => {
            return <img
                src={node.target}
                alt={node.alt}
                title={node.title}/>;
        }
    },
    reflink: {
        regex: new RegExp(
            // The first [part] of the link
            "^\\[(" + LINK_INSIDE + ")\\]" +
            // The [ref] target of the link
            "\\s*\\[([^\\]]*)\\]"
        ),
        parse: (capture, parse, state) => {
            return parseRef(capture, state, {
                type: "link",
                content: parse(capture[1], state)
            });
        }
    },
    refimage: {
        regex: new RegExp(
            // The first [part] of the link
            "^!\\[(" + LINK_INSIDE + ")\\]" +
            // The [ref] target of the link
            "\\s*\\[([^\\]]*)\\]"
        ),
        parse: (capture, parse, state) => {
            return parseRef(capture, state, {
                type: "image",
                alt: capture[1]
            });
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
    del: {
        regex: /^~~(?=\S)([\s\S]*?\S)~~/,
        parse: parseCapture,
        output: (node, output) => {
            return <del>{output(node.content)}</del>;
        }
    },
    inlineCode: {
        regex: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        parse: (capture, parse, state) => {
            return {
                content: capture[2]
            };
        },
        output: (node, output) => {
            return <code>{node.content}</code>;
        }
    },
    br: {
        regex: /^ {2,}\n/,
        parse: () => ({}),
        output: () => <br />
    },
    text: {
        // Here we look for anything followed by non-symbols,
        // double newlines, or double-space-newlines
        // We break on any symbol characters so that this grammar
        // is easy to extend without needing to modify this regex
        regex: /^[\s\S]+?(?=[^0-9A-Za-z\s\u00ff-\uffff]|\n\n| {2,}\n|$)/,
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

var SimpleMarkdown = {
    parserFor: parserFor,
    outputFor: outputFor,
    defaultRules: defaultRules,
    defaultPriorities: defaultPriorities,
    ruleOutput: ruleOutput,
    defaultParse: defaultParse,
    defaultOutput: defaultOutput
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = SimpleMarkdown;
} else if (typeof global !== "undefined") {
    global.SimpleMarkdown = SimpleMarkdown;
} else {
    window.SimpleMarkdown = SimpleMarkdown;
}

