/* eslint-disable no-useless-escape */
/**
 * The Selector class implements a CSS-like system for matching nodes in a
 * parse tree based on the structure of the tree. Create a Selector object by
 * calling the static Selector.parse() method on a string that describes the
 * tree structure you want to match. For example, if you want to find text
 * nodes that are direct children of paragraph nodes that immediately follow
 * heading nodes, you could create an appropriate selector like this:
 *
 *   selector = Selector.parse("heading + paragraph > text");
 *
 * Recall from the TreeTransformer class, that we consider any object with a
 * string-valued `type` property to be a tree node. The words "heading",
 * "paragraph" and "text" in the selector string above specify node types and
 * will match nodes in a parse tree that have `type` properties with those
 * values.
 *
 * Selectors are designed for use during tree traversals done with the
 * TreeTransformer traverse() method. To test whether the node currently being
 * traversed matches a selector, simply pass the TraversalState object to the
 * match() method of the Selector object. If the node does not match the
 * selector, match() returns null. If it does match, then match() returns an
 * array of nodes that match the selector. In the example above the first
 * element of the array would be the node the heading node, the second would
 * be the paragraph node that follows it, and the third would be the text node
 * that is a child of the paragraph.  The last element of a returned array of
 * nodes is always equal to the current node of the tree traversal.
 *
 * Code that uses a selector might look like this:
 *
 *   matchingNodes = selector.match(state);
 *   if (matchingNodes) {
 *       let heading = matchingNodes[0];
 *       let text = matchingNodes[2];
 *       // do something with those nodes
 *   }
 *
 * The Selector.parse() method recognizes a grammar that is similar to CSS
 * selectors:
 *
 * selector := treeSelector (, treeSelector)*
 *
 *    A selector is one or more comma-separated treeSelectors. A node matches
 *    the selector if it matches any of the treeSelectors.
 *
 * treeSelector := (treeSelector combinator)? nodeSelector
 *
 *    A treeSelector is a nodeSelector optionally preceeded by a combinator
 *    and another tree selector. The tree selector matches if the current node
 *    matches the node selector and a sibling or ancestor (depending on the
 *    combinator) of the current node matches the optional treeSelector.
 *
 * combinator := ' ' | '>' | '+' | '~'   // standard CSS3 combinators
 *
 *    A combinator is a space or punctuation character that specifies the
 *    relationship between two nodeSelectors. A space between two
 *    nodeSelectors means that the first selector much match an ancestor of
 *    the node that matches the second selector. A '>' character means that
 *    the first selector must match the parent of the node matched by the
 *    second. The '~' combinator means that the first selector must match a
 *    previous sibling of the node matched by the second. And the '+' selector
 *    means that first selector must match the immediate previous sibling of
 *    the node that matched the second.
 *
 * nodeSelector := <IDENTIFIER> | '*'
 *
 *    A nodeSelector is simply an identifier (a letter followed by any number
 *    of letters, digits, hypens, and underscores) or the wildcard asterisk
 *    character. A wildcard node selector matches any node. An identifier
 *    selector matches any node that has a `type` property whose value matches
 *    the identifier.
 *
 * If you call Selector.parse() on a string that does not match this grammar,
 * it will throw an exception
 *
 * Implementation Note: this file exports a very simple Selector class but all
 * the actual work is done in various internal classes. The Parser class
 * parses the string representation of a selector into a parse tree that
 * consists of instances of various subclasses of the Selector class. It is
 * these subclasses that implement the selector matching logic, often
 * depending on features of the TraversalState object from the TreeTransformer
 * traversal.
 */

import {Errors, PerseusError} from "@khanacademy/perseus-core";

import type {TreeNode, TraversalState} from "./tree-transformer";

/**
 * This is the base class for all Selector types. The key method that all
 * selector subclasses must implement is match(). It takes a TraversalState
 * object (from a TreeTransformer traversal) and tests whether the selector
 * matches at the current node. See the comment at the start of this file for
 * more details on the match() method.
 */
export default class Selector {
    static parse(selectorText: string): Selector {
        return new Parser(selectorText).parse();
    }

    /**
     * Return an array of the nodes that matched or null if no match.
     * This is the base class so we just throw an exception. All Selector
     * subclasses must provide an implementation of this method.
     */
    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        throw new PerseusError(
            "Selector subclasses must implement match()",
            Errors.NotAllowed,
        );
    }

    /**
     * Selector subclasses all define a toString() method primarily
     * because it makes it easy to write parser tests.
     */
    toString(): string {
        return "Unknown selector class";
    }
}

/**
 * This class implements a parser for the selector grammar. Pass the source
 * text to the Parser() constructor, and then call the parse() method to
 * obtain a corresponding Selector object. parse() throws an exception
 * if there are syntax errors in the selector.
 *
 * This class is not exported, and you don't need to use it directly.
 * Instead call the static Selector.parse() method.
 */
class Parser {
    static TOKENS: RegExp; // We do lexing with a simple regular expression
    tokens: ReadonlyArray<string>; // The array of tokens
    tokenIndex: number; // Which token in the array we're looking at now

    constructor(s: string) {
        // Normalize whitespace:
        // - remove leading and trailing whitespace
        // - replace runs of whitespace with single space characters
        s = s.trim().replace(/\s+/g, " ");
        // Convert the string to an array of tokens. Note that the TOKENS
        // pattern ignores spaces that do not appear before identifiers
        // or the * wildcard.
        this.tokens = s.match(Parser.TOKENS) || [];
        this.tokenIndex = 0;
    }

    // Return the next token or the empty string if there are no more
    nextToken(): string {
        return this.tokens[this.tokenIndex] || "";
    }

    // Increment the token index to "consume" the token we were looking at
    // and move on to the next one.
    consume(): void {
        this.tokenIndex++;
    }

    // Return true if the current token is an identifier or false otherwise
    isIdentifier(): boolean {
        // The Parser.TOKENS regexp ensures that we only have to check
        // the first character of a token to know what kind of token it is.
        const c = this.tokens[this.tokenIndex][0];
        return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    }

    // Consume space tokens until the next token is not a space.
    skipSpace(): void {
        while (this.nextToken() === " ") {
            this.consume();
        }
    }

    // Parse a comma-separated sequence of tree selectors. This is the
    // entry point for the Parser class and the only method that clients
    // ever need to call.
    parse(): Selector {
        // We expect at least one tree selector
        const ts = this.parseTreeSelector();

        // Now see what's next
        let token = this.nextToken();

        // If there is no next token then we're done parsing and can return
        // the tree selector object we got above
        if (!token) {
            return ts;
        }

        // Otherwise, there is more go come and we're going to need a
        // list of tree selectors
        const treeSelectors = [ts];
        while (token) {
            // The only character we allow after a tree selector is a comma
            if (token === ",") {
                this.consume();
            } else {
                throw new ParseError("Expected comma");
            }

            // And if we saw a comma, then it must be followed by another
            // tree selector
            treeSelectors.push(this.parseTreeSelector());
            token = this.nextToken();
        }

        // If we parsed more than one tree selector, return them in a
        // SelectorList object.
        return new SelectorList(treeSelectors);
    }

    // Parse a sequence of node selectors linked together with
    // hierarchy combinators: space, >, + and ~.
    parseTreeSelector(): Selector {
        this.skipSpace(); // Ignore space after a comma, for example

        // A tree selector must begin with a node selector
        let ns: Selector = this.parseNodeSelector();

        for (;;) {
            // Now check the next token. If there is none, or if it is a
            // comma, then we're done with the treeSelector. Otherwise
            // we expect a combinator followed by another node selector.
            // If we don't see a combinator, we throw an error. If we
            // do see a combinator and another node selector then we
            // combine the current node selector with the new node selector
            // using a Selector subclass that depends on the combinator.
            const token = this.nextToken();

            if (!token || token === ",") {
                break;
            } else if (token === " ") {
                this.consume();
                ns = new AncestorCombinator(ns, this.parseNodeSelector());
            } else if (token === ">") {
                this.consume();
                ns = new ParentCombinator(ns, this.parseNodeSelector());
            } else if (token === "+") {
                this.consume();
                ns = new PreviousCombinator(ns, this.parseNodeSelector());
            } else if (token === "~") {
                this.consume();
                ns = new SiblingCombinator(ns, this.parseNodeSelector());
            } else {
                throw new ParseError("Unexpected token: " + token);
            }
        }

        return ns;
    }

    // Parse a single node selector.
    // For now, this is just a node type or a wildcard.
    parseNodeSelector(): Selector {
        // First, skip any whitespace
        this.skipSpace();

        const t = this.nextToken();
        if (t === "*") {
            this.consume();
            return new AnyNode();
        }
        if (this.isIdentifier()) {
            this.consume();
            return new TypeSelector(t);
        }

        throw new ParseError("Expected node type");
    }
}

// We break the input string into tokens with this regexp. Token types
// are identifiers, integers, punctuation and spaces. Note that spaces
// tokens are only returned when they appear before an identifier or
// wildcard token and are otherwise omitted.
Parser.TOKENS = /([a-zA-Z][\w-]*)|(\d+)|[^\s]|(\s(?=[a-zA-Z\*]))/g;

/**
 * This is a trivial Error subclass that the Parser uses to signal parse errors
 */
class ParseError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/**
 * This Selector subclass is a list of selectors. It matches a node if any of
 * the selectors on the list matches the node. It considers the selectors in
 * order, and returns the array of nodes returned by whichever one matches
 * first.
 */
class SelectorList extends Selector {
    selectors: ReadonlyArray<Selector>;

    constructor(selectors: ReadonlyArray<Selector>) {
        super();
        this.selectors = selectors;
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        for (let i = 0; i < this.selectors.length; i++) {
            const s = this.selectors[i];
            const result = s.match(state);
            if (result) {
                return result;
            }
        }
        return null;
    }

    toString(): string {
        let result = "";
        for (let i = 0; i < this.selectors.length; i++) {
            result += i > 0 ? ", " : "";
            result += this.selectors[i].toString();
        }
        return result;
    }
}

/**
 * This trivial Selector subclass implements the '*' wildcard and
 * matches any node.
 */
class AnyNode extends Selector {
    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        return [state.currentNode()];
    }

    toString(): string {
        return "*";
    }
}

/**
 * This selector subclass implements the <IDENTIFIER> part of the grammar.
 * it matches any node whose `type` property is a specified string
 */
class TypeSelector extends Selector {
    type: string;

    constructor(type: string) {
        super();
        this.type = type;
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        const node = state.currentNode();
        if (node.type === this.type) {
            return [node];
        }
        return null;
    }

    toString(): string {
        return this.type;
    }
}

/**
 * This selector subclass is the superclass of the classes that implement
 * matching for the four combinators. It defines left and right properties for
 * the two selectors that are to be combined, but does not define a match
 * method.
 */
class SelectorCombinator extends Selector {
    left: Selector;
    right: Selector;

    constructor(left: Selector, right: Selector) {
        super();
        this.left = left;
        this.right = right;
    }
}

/**
 * This Selector subclass implements the space combinator. It matches if the
 * right selector matches the current node and the left selector matches some
 * ancestor of the current node.
 */
class AncestorCombinator extends SelectorCombinator {
    constructor(left: Selector, right: Selector) {
        super(left, right);
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        const rightResult = this.right.match(state);
        if (rightResult) {
            state = state.clone();
            while (state.hasParent()) {
                state.goToParent();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString(): string {
        return this.left.toString() + " " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the > combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * the parent of the current node.
 */
class ParentCombinator extends SelectorCombinator {
    constructor(left: Selector, right: Selector) {
        super(left, right);
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        const rightResult = this.right.match(state);
        if (rightResult) {
            if (state.hasParent()) {
                state = state.clone();
                state.goToParent();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString(): string {
        return this.left.toString() + " > " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the + combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * the immediate previous sibling of the current node.
 */
class PreviousCombinator extends SelectorCombinator {
    constructor(left: Selector, right: Selector) {
        super(left, right);
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        const rightResult = this.right.match(state);
        if (rightResult) {
            if (state.hasPreviousSibling()) {
                state = state.clone();
                state.goToPreviousSibling();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString(): string {
        return this.left.toString() + " + " + this.right.toString();
    }
}

/**
 * This Selector subclass implements the ~ combinator. It matches if the
 * right selector matches the current node and the left selector matches
 * any previous sibling of the current node.
 */
class SiblingCombinator extends SelectorCombinator {
    constructor(left: Selector, right: Selector) {
        super(left, right);
    }

    match(state: TraversalState): ReadonlyArray<TreeNode> | null | undefined {
        const rightResult = this.right.match(state);
        if (rightResult) {
            state = state.clone();
            while (state.hasPreviousSibling()) {
                state.goToPreviousSibling();
                const leftResult = this.left.match(state);
                if (leftResult) {
                    return leftResult.concat(rightResult);
                }
            }
        }
        return null;
    }

    toString(): string {
        return this.left.toString() + " ~ " + this.right.toString();
    }
}
