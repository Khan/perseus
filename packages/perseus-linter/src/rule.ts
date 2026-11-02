/**
 * The Rule class represents a Perseus lint rule. A Rule instance has a check()
 * method that takes the same (node, state, content) arguments that a
 * TreeTransformer traversal callback function does. Call the check() method
 * during a tree traversal to determine whether the current node of the tree
 * violates the rule. If there is a violation, check() returns an array of
 * issues. Each issue is an object that includes the name of the rule,
 * an error message, and the start and end positions of the lint within the
 * node's content string. If there are no violations of the rule, check()
 * returns an empty array.
 *
 * A Rule is typically defined in terms of a name, a selector, a pattern
 * (RegExp) and a linting function. Use the `Rule.makeRule()` or
 * `Rule.makeWidgetRule()` static methods to create rules.
 *
 * Rules only apply to nodes matching both the selector and the RegExp pattern.
 * If check() is called with a non-matching node, then the linting function is
 * not called, and check() returns an empty array.
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

import {Severity} from "./lint";
import Selector from "./selector";

import type {Lint} from "./lint";
import type {TraversalState, TreeNode} from "./tree-transformer";
import type {PerseusWidgetTypes} from "@khanacademy/perseus-core";

export type MakeRuleOptions = {
    name: string;
    pattern?: RegExp;
    selector?: string;
    locale?: string;
    lint: LintTester;
};

export type MakeWidgetRuleOptions<
    TWidgetType extends keyof PerseusWidgetTypes,
> = {
    name: string;
    widgetType: TWidgetType;
    lint: (
        widgetInfo: PerseusWidgetTypes[TWidgetType],
        // TODO(benchristel): type context properly, here and everywhere it's
        //  used in the perseus-linter package.
        context: any,
    ) => undefined | Lint | Lint[];
};

export type MakeLintFunctionOptions = {
    message: string;
    severity: number;
};

// This represents the type returned by String.match(). It is an
// array of strings, but also has index:number and input:string properties.
// TypeScript doesn't handle it well, so we punt and just use any.
type PatternMatchType = any;

export type LinterIssue = {
    rule: string;
    message: string;
    start: number;
    end: number;
    target?: string;
    severity: number;
    metadata?: Record<string, any>;
};

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
) => Lint | Lint[] | undefined;

/**
 * A Rule object describes a Perseus lint rule. See the comment at the top of
 * this file for detailed description.
 */
export default class Rule {
    name: string; // The name of the rule
    selector: Selector; // The specified selector or the DEFAULT_SELECTOR
    pattern: RegExp | null | undefined; // A regular expression if one was specified
    lint: LintTester; // The lint-testing function or a default
    static DEFAULT_SELECTOR: Selector;

    // The comment at the top of this file has detailed docs for
    // this constructor and its arguments
    constructor(
        name: string | null | undefined,
        selector: Selector | null | undefined,
        pattern: RegExp | null | undefined,
        lint: LintTester,
    ) {
        if (!selector && !pattern) {
            throw new PerseusError(
                "Lint rules must have a selector or pattern",
                Errors.InvalidInput,
                {metadata: {name}},
            );
        }

        this.name = name || "unnamed rule";
        this.selector = selector || Rule.DEFAULT_SELECTOR;
        this.pattern = pattern || null;
        this.lint = lint;
    }

    // A factory method for use with rules described in JSON files
    // See the documentation at the start of this file for details.
    static makeRule(options: MakeRuleOptions): Rule {
        return new Rule(
            options.name,
            options.selector ? Selector.parse(options.selector) : null,
            Rule.makePattern(options.pattern),
            options.lint,
        );
    }

    static makeWidgetRule<TWidgetType extends keyof PerseusWidgetTypes>(
        options: MakeWidgetRuleOptions<TWidgetType>,
    ): Rule {
        return new Rule(
            options.name,
            Selector.parse("widget"),
            null,
            (state, content, nodes, match, context) => {
                // Only apply widget rules if the widget has the correct type.
                if (state.currentNode().widgetType !== options.widgetType) {
                    return;
                }

                const widgetId = state.currentNode().id;
                if (!widgetId) {
                    return;
                }

                const widgetInfo = context?.widgets?.[widgetId];
                if (!widgetInfo) {
                    return;
                }

                return [options.lint(widgetInfo, context) ?? []]
                    .flat()
                    .map((lint) => ({
                        ...lint,
                        message: `${widgetId}: ${lint.message}`,
                    }));
            },
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
    ): LinterIssue[] {
        // Define some helper functions. These have to be inside the check
        // method because they need to close over both the `content` parameter
        // and the `this` binding.
        const toLinterIssue = (error: Lint): LinterIssue => {
            // If the error has no location data, we default the location to
            // the entire content string.
            const {location = {start: 0, end: content.length}} = error;
            return {
                rule: this.name,
                severity: error.severity,
                message: error.message,
                metadata: error.metadata,
                ...location,
            };
        };

        const toLinterIssues = (
            rawLintOutput: undefined | Lint | Lint[],
        ): LinterIssue[] => {
            if (rawLintOutput == null) {
                return [];
            }
            if (Array.isArray(rawLintOutput)) {
                return rawLintOutput.map(toLinterIssue);
            }
            return [toLinterIssue(rawLintOutput)];
        };

        // First, see if we match the selector.
        // If no selector was passed to the constructor, we use a
        // default selector that matches text nodes.
        const selectorMatch = this.selector.match(traversalState);

        // If the selector did not match, then we're done
        if (!selectorMatch) {
            return [];
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
            return [];
        }

        try {
            // If we get here, then the selector and pattern have matched
            // so now we call the lint function to see if there is lint.
            return toLinterIssues(
                this.lint(
                    traversalState,
                    content,
                    selectorMatch,
                    patternMatch,
                    context,
                ),
            );
        } catch (e: any) {
            // If the lint function threw an exception we handle that as
            // a special type of lint. We want the user to see the lint
            // warning in this case (even though it is out of their control)
            // so that the bug gets reported. Otherwise we'd never know that
            // a rule was failing.
            return [
                {
                    rule: "lint-rule-failure",
                    severity: Rule.Severity.ERROR,
                    message: `Exception in rule ${this.name}: ${e.message}
Stack trace:
${e.stack}`,
                    start: 0,
                    end: content.length,
                },
            ];
        }
    }

    /**
     * Create a linter function from a message.
     */
    static makeLintFunction({
        message,
        severity,
    }: MakeLintFunctionOptions): LintTester {
        return (
            state: TraversalState,
            content: string,
            selectorMatch: ReadonlyArray<TreeNode>,
            patternMatch: PatternMatchType,
            context: LintRuleContextObject,
        ) => {
            return {
                message,
                severity,
                location: {
                    start: patternMatch.index,
                    end: patternMatch.index + patternMatch[0].length,
                },
            };
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
            // eslint-disable-next-line no-restricted-syntax
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
        ERROR: number;
        GUIDELINE: number;
        WARNING: number;
    } = Severity;
}

Rule.DEFAULT_SELECTOR = Selector.parse("text");
