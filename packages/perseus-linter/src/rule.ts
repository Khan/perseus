/**
 * The Rule class represents a Perseus lint rule. A Rule instance has a check()
 * method that takes the same (node, state, content) arguments that a
 * TreeTransformer traversal callback function does. Call the check() method
 * during a tree traversal to determine whether the current node of the tree
 * violates the rule. If there is no violation, then check() returns
 * null. Otherwise, it returns an object that includes the name of the rule,
 * an error message, and the start and end positions within the node's content
 * string of the lint.
 *
 * A Perseus lint rule consists of a name, a severity, a selector, a pattern
 * (RegExp) and two functions. The check() method uses the selector, pattern,
 * and functions as follows:
 *
 * - First, when determining which rules to apply to a particular piece of
 *   content, each rule can specify an optional function provided in the fifth
 *   parameter to evaluate whether or not we should be applying this rule.
 *   If the function returns false, we don't use the rule on this content.
 *
 * - Next, check() tests whether the node currently being traversed matches
 *   the selector. If it does not, then the rule does not apply at this node
 *   and there is no lint and check() returns null.
 *
 * - If the selector matched, then check() tests the text content of the node
 *   (and its children) against the pattern. If the pattern does not match,
 *   then there is no lint, and check() returns null.
 *
 * - If both the selector and pattern match, then check() calls the function
 *   passing the TraversalState object, the content string for the node, the
 *   array of nodes returned by the selector match, and the array of strings
 *   returned by the pattern match. This function can use these arguments to
 *   implement any kind of lint detection logic it wants. If it determines
 *   that there is no lint, then it should return null. Otherwise, it should
 *   return an error message as a string, or an object with `message`, `start`
 *   and `end` properties. The start and end properties are numbers that mark
 *   the beginning and end of the problematic content. Note that these numbers
 *   are relative to the content string passed to the traversal callback, not
 *   to the entire string that was used to generate the parse tree in the
 *   first place. TODO(davidflanagan): modify the simple-markdown library to
 *   have an option to add the text offset of each node to the parse
 *   tree. This will allows us to pinpoint lint errors within a long string
 *   of markdown text.
 *
 * - If the function returns null, then check() returns null. Otherwise,
 *   check() returns an object with `rule`, `message`, `start` and `end`
 *   properties. The value of the `rule` property is the name of the rule,
 *   which is useful for error reporting purposes.
 *
 * The name, severity, selector, pattern and function arguments to the Rule()
 * constructor are optional, but you may not omit both the selector and the
 * pattern. If you do not specify a selector, a default selector that matches
 * any node of type "text" will be used. If you do not specify a pattern, then
 * any node that matches the selector will be assumed to match the pattern as
 * well. If you don't pass a function as the fourth argument to the Rule()
 * constructor, then you must pass an error message string instead. If you do
 * this, you'll get a default function that unconditionally returns an object
 * that includes the error message and the start and end indexes of the
 * portion of the content string that matched the pattern. If you don't pass a
 * function in the fifth parameter, the rule will be applied in any context.
 *
 * One of the design goals of this Rule class is to allow simple lint rules to
 * be described in JSON files without any JavaScript code. So in addition to
 * the Rule() constructor, the class also defines a Rule.makeRule() factory
 * method. This method takes a single object as its argument and expects the
 * object to have four string properties. The `name` property is passed as the
 * first argument to the Rule() construtctor.  The optional `selector`
 * property, if specified, is passed to Selector.parse() and the resulting
 * Selector object is used as the second argument to Rule().  The optional
 * `pattern` property is converted to a RegExp before being passed as the
 * third argument to Rule(). (See Rule.makePattern() for details on the string
 * to RegExp conversion). Finally, the `message` property specifies an error
 * message that is passed as the final argument to Rule(). You can also use a
 * real RegExp as the value of the `pattern` property or define a custom lint
 * function on the `lint` property instead of setting the `message`
 * property. Doing either of these things means that your rule description can
 * no longer be saved in a JSON file, however.
 *
 * For example, here are two lint rules defined with Rule.makeRule():
 *
 *    let nestedLists = Rule.makeRule({
 *        name: "nested-lists",
 *        selector: "list list",
 *        message: `Nested lists:
 *    nested lists are hard to read on mobile devices;
 *    do not use additional indentation.`,
 *    });
 *
 *    let longParagraph = Rule.makeRule({
 *        name: "long-paragraph",
 *        selector: "paragraph",
 *        pattern: /^.{501,}/,
 *        lint: function(state, content, nodes, match) {
 *            return `Paragraph too long:
 *    This paragraph is ${content.length} characters long.
 *    Shorten it to 500 characters or fewer.`;
 *        },
 *    });
 *
 * Certain advanced lint rules need additional information about the content
 * being linted in order to detect lint. For example, a rule to check for
 * whitespace at the start and end of the URL for an image can't use the
 * information in the node or content arguments because the markdown parser
 * strips leading and trailing whitespace when parsing. (Nevertheless, these
 * spaces have been a practical problem for our content translation process so
 * in order to check for them, a lint rule needs access to the original
 * unparsed source text. Similarly, there are various lint rules that check
 * widget usage. For example, it is easy to write a lint rule to ensure that
 * images have alt text for images encoded in markdown. But when images are
 * added to our content via an image widget we also want to be able to check
 * for alt text. In order to do this, the lint rule needs to be able to look
 * widgets up by name in the widgets object associated with the parse tree.
 *
 * In order to support advanced linting rules like these, the check() method
 * takes a context object as its optional fourth argument, and passes this
 * object on to the lint function of each rule. Rules that require extra
 * context should not assume that they will always get it, and should verify
 * that the necessary context has been supplied before using it. Currently the
 * "content" property of the context object is the unparsed source text if
 * available, and the "widgets" property of the context object is the widget
 * object associated with that content string in the JSON object that defines
 * the Perseus article or exercise that is being linted.
 */

import {Errors, PerseusError} from "@khanacademy/perseus-core";

import Selector from "./selector";

import type {TraversalState, TreeNode} from "./tree-transformer";

export type MakeRuleOptions = {
    name: string;
    pattern?: RegExp;
    severity?: number;
    selector?: string;
    locale?: string;
    message?: string;
    lint?: (
        state: TraversalState,
        content: string,
        nodes: any,
        match: any,
        context: LintRuleContextObject,
    ) => LintTesterReturnType;
    applies?: AppliesTester;
};

// This represents the type returned by String.match(). It is an
// array of strings, but also has index:number and input:string properties.
// TypeScript doesn't handle it well, so we punt and just use any.
type PatternMatchType = any;

export type LinterWarning = {
    rule: string;
    message: string;
    start: number;
    end: number;
    target?: string;
    severity?: number;
    metadata?: Record<string, any>;
};

// This is the return type of the check() method of a Rule object
export type RuleCheckReturnType = LinterWarning | null | undefined;

// This is the return type of the lint detection function passed as the 4th
// argument to the Rule() constructor. It can return null or a string or an
// object containing a string and two numbers.
// prettier-ignore
// (prettier formats this in a way that ka-lint does not like)
type LintTesterReturnType = string | {
    message: string,
    start: number,
    end: number
    metadata?:Record<string,any>
} | null | undefined;

type LintRuleContextObject =
    | {
          content: string;
          contentType: "article" | "exercise";
          stack: string[];
          widgets: any[];
      }
    | null
    | undefined;

// This is the type of the lint detection function that the Rule() constructor
// expects as its fourth argument. It is passed the TraversalState object and
// content string that were passed to check(), and is also passed the array of
// nodes returned by the selector match and the array of strings returned by
// the pattern match. It should return null if no lint is detected or an
// error message or an object contining an error message.
type LintTester = (
    state: TraversalState,
    content: string,
    selectorMatch: ReadonlyArray<TreeNode>,
    patternMatch: PatternMatchType,
    context: LintRuleContextObject,
) => LintTesterReturnType;

// An optional check to verify whether or not a particular rule should
// be checked by context. For example, some rules only apply in exercises,
// and should never be applied to articles. Defaults to true, so if we
// omit the applies function in a rule, it'll be tested everywhere.
type AppliesTester = (context: LintRuleContextObject) => boolean;

/**
 * A Rule object describes a Perseus lint rule. See the comment at the top of
 * this file for detailed description.
 */
export default class Rule {
    name: string; // The name of the rule
    severity: number; // The severity of the rule
    selector: Selector; // The specified selector or the DEFAULT_SELECTOR
    pattern: RegExp | null | undefined; // A regular expression if one was specified
    lint: LintTester; // The lint-testing function or a default
    applies: AppliesTester; // Checks to see if we should apply a rule or not
    message: string | null | undefined; // The error message for use with the default function
    static DEFAULT_SELECTOR: Selector;

    // The comment at the top of this file has detailed docs for
    // this constructor and its arguments
    constructor(
        name: string | null | undefined,
        severity: number | null | undefined,
        selector: Selector | null | undefined,
        pattern: RegExp | null | undefined,
        lint: LintTester | string | undefined,
        applies: AppliesTester | undefined,
    ) {
        if (!selector && !pattern) {
            throw new PerseusError(
                "Lint rules must have a selector or pattern",
                Errors.InvalidInput,
                {metadata: {name}},
            );
        }

        this.name = name || "unnamed rule";
        this.severity = severity || Rule.Severity.BULK_WARNING;
        this.selector = selector || Rule.DEFAULT_SELECTOR;
        this.pattern = pattern || null;

        // If we're called with an error message instead of a function then
        // use a default function that will return the message.
        if (typeof lint === "function") {
            this.lint = lint;
            this.message = null;
        } else {
            this.lint = (...args) => this._defaultLintFunction(...args);
            this.message = lint;
        }

        this.applies =
            applies ||
            function () {
                return true;
            };
    }

    // A factory method for use with rules described in JSON files
    // See the documentation at the start of this file for details.
    static makeRule(options: MakeRuleOptions): Rule {
        return new Rule(
            options.name,
            options.severity,
            options.selector ? Selector.parse(options.selector) : null,
            Rule.makePattern(options.pattern),
            options.lint || options.message,
            options.applies,
        );
    }

    // Check the node n to see if it violates this lint rule.  A return value
    // of false means there is no lint.  A returned object indicates a lint
    // error. See the documentation at the top of this file for details.
    check(
        node: TreeNode,
        traversalState: TraversalState,
        content: string,
        context: LintRuleContextObject,
    ): RuleCheckReturnType {
        // First, see if we match the selector.
        // If no selector was passed to the constructor, we use a
        // default selector that matches text nodes.
        const selectorMatch = this.selector.match(traversalState);

        // If the selector did not match, then we're done
        if (!selectorMatch) {
            return null;
        }

        // If the selector matched, then see if the pattern matches
        let patternMatch;
        if (this.pattern) {
            patternMatch = content.match(this.pattern);
        } else {
            // If there is no pattern, then just match all of the content.
            // Use a fake RegExp match object to represent this default match.
            patternMatch = Rule.FakePatternMatch(content, content, 0);
        }

        // If there was a pattern and it didn't match, then we're done
        if (!patternMatch) {
            return null;
        }

        try {
            // If we get here, then the selector and pattern have matched
            // so now we call the lint function to see if there is lint.
            const error = this.lint(
                traversalState,
                content,
                selectorMatch,
                patternMatch,
                context,
            );

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!error) {
                return null; // No lint; we're done
            }
            if (typeof error === "string") {
                // If the lint function returned a string we assume it
                // applies to the entire content of the node and return it.
                return {
                    rule: this.name,
                    severity: this.severity,
                    message: error,
                    start: 0,
                    end: content.length,
                };
            }
            // If the lint function returned an object, then we just
            // add the rule name to the message, start and end.
            return {
                rule: this.name,
                severity: this.severity,
                message: error.message,
                start: error.start,
                end: error.end,
                metadata: error.metadata,
            };
        } catch (e: any) {
            // If the lint function threw an exception we handle that as
            // a special type of lint. We want the user to see the lint
            // warning in this case (even though it is out of their control)
            // so that the bug gets reported. Otherwise we'd never know that
            // a rule was failing.
            return {
                rule: "lint-rule-failure",
                message: `Exception in rule ${this.name}: ${e.message}
Stack trace:
${e.stack}`,
                start: 0,
                end: content.length,
            };
        }
    }

    // This internal method is the default lint function that we use when a
    // rule is defined without a function. This is useful for rules where the
    // selector and/or pattern match are enough to indicate lint. This
    // function unconditionally returns the error message that was passed in
    // place of a function, but also adds start and end properties that
    // specify which particular portion of the node content matched the
    // pattern.
    _defaultLintFunction(
        state: TraversalState,
        content: string,
        selectorMatch: ReadonlyArray<TreeNode>,
        patternMatch: PatternMatchType,
        context: LintRuleContextObject,
    ): {
        end: number;
        message: string;
        start: number;
    } {
        return {
            message: this.message || "",
            start: patternMatch.index,
            end: patternMatch.index + patternMatch[0].length,
        };
    }

    // The makeRule() factory function uses this static method to turn its
    // argument into a RegExp. If the argument is already a RegExp, we just
    // return it. Otherwise, we compile it into a RegExp and return that.
    // The reason this is necessary is that Rule.makeRule() is designed for
    // use with data from JSON files and JSON files can't include RegExp
    // literals. Strings passed to this function do not need to be delimited
    // with / characters unless you want to include flags for the RegExp.
    //
    // Examples:
    //
    //   input ""        ==> output null
    //   input /foo/     ==> output /foo/
    //   input "foo"     ==> output /foo/
    //   input "/foo/i"  ==> output /foo/i
    //
    static makePattern(
        pattern?: RegExp | string | null,
    ): RegExp | null | undefined {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!pattern) {
            return null;
        }
        if (pattern instanceof RegExp) {
            return pattern;
        }
        if (pattern[0] === "/") {
            const lastSlash = pattern.lastIndexOf("/");
            const expression = pattern.substring(1, lastSlash);
            const flags = pattern.substring(lastSlash + 1);
            // @ts-expect-error - TS2713 - Cannot access 'RegExp.flags' because 'RegExp' is a type, but not a namespace. Did you mean to retrieve the type of the property 'flags' in 'RegExp' with 'RegExp["flags"]'?
            return new RegExp(expression, flags as RegExp.flags);
        }
        return new RegExp(pattern);
    }

    // This static method returns an string array with index and input
    // properties added, in order to simulate the return value of the
    // String.match() method. We use it when a Rule has no pattern and we
    // want to simulate a match on the entire content string.
    static FakePatternMatch(
        input: string,
        match: string | null | undefined,
        index: number,
    ): PatternMatchType {
        const result: any = [match];
        result.index = index;
        result.input = input;
        return result;
    }

    static Severity: {
        BULK_WARNING: number;
        ERROR: number;
        GUIDELINE: number;
        WARNING: number;
    } = {
        ERROR: 1,
        WARNING: 2,
        GUIDELINE: 3,
        BULK_WARNING: 4,
    };
}

Rule.DEFAULT_SELECTOR = Selector.parse("text");
