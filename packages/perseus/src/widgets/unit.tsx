// TODO(joel): teach KAS how to accept an answer only if it's expressed in
// terms of a certain type.
// TODO(joel): Allow sigfigs within a range rather than an exact expected
// value?
import * as KAS from "@khanacademy/kas";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
// eslint-disable-next-line import/no-extraneous-dependencies
import lens from "hubble";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import * as Changeable from "../mixins/changeable";
import {ClassNames as ApiClassNames, ApiOptions} from "../perseus-api";
import {SignificantFigures, displaySigFigs} from "../sigfigs";

import type {
    APIOptions,
    ChangeHandler,
    FocusPath,
    WidgetExports,
} from "../types";

const ALL = "all";
const MAX_SIGFIGS = 10;

export const countSigfigs = function (value: string): number {
    return new SignificantFigures(value).sigFigs;
};

export const sigfigPrint = function (num: number, sigfigs: number): string {
    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
};

type Rubric =
    | {
          value: string;
          sigfigs: number;
          accepting: "all";
      }
    | {
          value: string;
          sigfigs: number;
          accepting: "some";
          acceptingUnits: ReadonlyArray<string>;
      };

type ValidationResult =
    | {
          type: "points";
          earned: 1 | 0;
          message: string | null | undefined;
          total: number;
      }
    | {
          type: "invalid";
          message: string | null | undefined;
      };

type Props = {
    apiOptions: APIOptions;
    onChange: ChangeHandler;
    value: string;
    onBlur: (arg1: FocusPath) => unknown;
    onFocus: (arg1: FocusPath) => unknown;
};

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    value: Props["value"];
};

/* I just wrote this, but it's old by analogy to `OldExpression`, in that it's
 * the version that non-mathquill platforms get stuck with. Constructed with an
 * <input>, a parser, popsicle sticks, and glue.
 *
 * In the same way as OldExpression, this parses continuously as you type, then
 * shows and hides an error buddy. The error message is only shown after a
 * rolling two second delay, but hidden immediately on further typing.
 */
export class OldUnitInput extends React.Component<Props> {
    _errorTimeout: number | null | undefined;

    static defaultProps: DefaultProps = {
        apiOptions: ApiOptions.defaults,
        value: "",
    };

    static validate(userInput: string, rubric: Rubric): ValidationResult {
        const answer = KAS.unitParse(rubric.value).expr;
        const guess = KAS.unitParse(userInput);
        if (!guess.parsed) {
            return {
                type: "invalid",
                message: i18n._("I couldn't understand those units."),
            };
        }

        // Note: we check sigfigs, then numerical correctness, then units, so
        // the most significant things come last, that way the user will see
        // the most important message.
        let message = null;

        // did the user specify the right number of sigfigs?
        // TODO(joel) - add a grading mode where the wrong number of sigfigs
        // isn't marked wrong
        const sigfigs = rubric.sigfigs;
        const sigfigsCorrect = countSigfigs(guess.coefficient) === sigfigs;
        if (!sigfigsCorrect) {
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
            message = i18n._("Check your significant figures.");
        }

        // now we need to check that the answer is correct to the precision we
        // require.
        let numericallyCorrect;
        try {
            const x = new KAS.Var("x");
            const equality = new KAS.Eq(
                answer.simplify(),
                "=",
                new KAS.Mul(x, guess.expr.simplify()),
            );

            const conversion = equality.solveLinearEquationForVariable(x);

            // Make sure the conversion factor between the user's input answer
            // and the canonical answer is 1, to sigfig places.
            // TODO(joel) is this sound?
            numericallyCorrect =
                Number(conversion.eval()).toPrecision(sigfigs) ===
                Number(1).toPrecision(sigfigs);
        } catch (e: any) {
            numericallyCorrect = false;
        }

        if (!numericallyCorrect) {
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
            message = i18n._("That answer is numerically incorrect.");
        }

        let kasCorrect;
        const guessUnit = primUnits(guess.expr.simplify());
        const answerUnit = primUnits(answer.simplify());

        if (rubric.accepting === ALL) {
            // We're accepting all units - KAS does the hard work of figuring
            // out if the user's unit is equivalent to the author's unit.
            kasCorrect = KAS.compare(guessUnit, answerUnit).equal;
        } else {
            // Are any of the accepted units the same as what the user entered?
            kasCorrect = _(rubric.acceptingUnits).any((unit) => {
                const thisAnswerUnit = primUnits(
                    KAS.unitParse(unit).unit.simplify(),
                );
                return KAS.compare(
                    thisAnswerUnit,
                    guessUnit,
                    // TODO(joel) - make this work as intended.
                    // { form: true }
                ).equal;
            });
        }
        if (!kasCorrect) {
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
            message = i18n._("Check your units.");
        }

        const correct = kasCorrect && numericallyCorrect && sigfigsCorrect;

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message,
        };
    }

    componentDidUpdate() {
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        // @ts-expect-error - TS2769 - No overload matches this call.
        clearTimeout(this._errorTimeout);
        if (KAS.unitParse(this.props.value).parsed) {
            this._hideError();
        } else {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            // @ts-expect-error - TS2322 - Type 'Timeout' is not assignable to type 'number'.
            this._errorTimeout = setTimeout(this._showError, 2000);
        }
    }

    componentWillUnmount() {
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        // @ts-expect-error - TS2769 - No overload matches this call.
        clearTimeout(this._errorTimeout);
    }

    _showError: () => void = () => {
        if (this.props.value === "") {
            return;
        }

        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $error = $(ReactDOM.findDOMNode(this.refs.error));
        // @ts-expect-error - TS2339 - Property 'is' does not exist on type 'JQueryStatic'.
        if (!$error.is(":visible")) {
            $error
                // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                .css({top: 50, opacity: 0.1})
                .show()
                .animate({top: 0, opacity: 1.0}, 300);
        }
    };

    _hideError: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call.
        const $error = $(ReactDOM.findDOMNode(this.refs.error));
        // @ts-expect-error - TS2339 - Property 'is' does not exist on type 'JQueryStatic'.
        if ($error.is(":visible")) {
            // @ts-expect-error - TS2339 - Property 'animate' does not exist on type 'JQueryStatic'.
            $error.animate({top: 50, opacity: 0.1}, 300, function () {
                // eslint-disable-next-line @babel/no-invalid-this
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                // eslint-disable-next-line @babel/no-invalid-this
                $(this).hide();
            });
        }
    };

    change: (...args: ReadonlyArray<any>) => any | null | undefined = (
        ...args
    ) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly any[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    handleBlur: () => void = () => {
        this.props.onBlur([]);
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        // @ts-expect-error - TS2769 - No overload matches this call.
        clearTimeout(this._errorTimeout);
        if (!KAS.unitParse(this.props.value).parsed) {
            this._showError();
        }
    };

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        this._hideError();
        this.props.onChange({value: event.target.value});
    };

    simpleValidate: (
        rubric: Rubric,
        onInputError?: () => unknown,
    ) => ValidationResult = (rubric: Rubric, onInputError?: () => unknown) => {
        onInputError = onInputError || function () {};
        return OldUnitInput.validate(this.getUserInput(), rubric);
    };

    getUserInput: () => string = () => {
        return this.props.value;
    };

    // begin mobile stuff

    getInputPaths: () => ReadonlyArray<ReadonlyArray<any>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    };

    focusInputPath: (inputPath: FocusPath) => void = (inputPath: FocusPath) => {
        // eslint-disable-next-line react/no-string-refs
        const input = ReactDOM.findDOMNode(this.refs.input);
        if (input) {
            /**
             * TODO(somewhatabstract, JIRA-XXXX):
             * Change to using a ref callback so that focus() can be
             * accessed.
             */
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'Element | Text'.
            input.focus();
        }
    };

    handleFocus: () => void = () => {
        this.props.onFocus([]);
    };

    blurInputPath: (inputPath: FocusPath) => void = (inputPath: FocusPath) => {
        // eslint-disable-next-line react/no-string-refs
        const input = ReactDOM.findDOMNode(this.refs.input);
        if (input) {
            /**
             * TODO(somewhatabstract, JIRA-XXXX):
             * Change to using a ref callback so that focus() can be
             * accessed.
             */
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'Element | Text'.
            input.blur();
        }
    };

    setInputValue: (
        path: FocusPath,
        newValue: string,
        cb: () => unknown,
    ) => void = (path: FocusPath, newValue: string, cb: () => unknown) => {
        this.props.onChange(
            {
                value: newValue,
            },
            cb,
        );
    };

    getDOMNodeForPath: () => null | Element | Text = () => {
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs.input);
    };

    getGrammarTypeForPath: (inputPath: FocusPath) => string = (
        inputPath: FocusPath,
    ) => {
        return "unit";
    };

    // end mobile stuff

    // TODO(joel) think about showing the error buddy
    render(): React.ReactNode {
        return (
            <div className="old-unit-input">
                <input
                    onChange={this.handleChange}
                    ref="input" // eslint-disable-line react/no-string-refs
                    className={ApiClassNames.INTERACTIVE}
                    value={this.props.value}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {/* eslint-disable-next-line react/no-string-refs */}
                <div ref="error" className="error" style={{display: "none"}}>
                    {i18n._("I don't understand that")}
                </div>
            </div>
        );
    }
}

// Extract the primitive units from a unit expression. This first simplifies
// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
const primUnits = function (expr) {
    return expr.simplify().asMul().partition()[1].flatten().simplify();
};

export default {
    name: "unit-input",
    displayName: "Unit input",
    defaultAlignment: "inline-block",
    widget: OldUnitInput,
    transform: (x: any): any => lens(x).del(["value"]).freeze(),
    version: {major: 0, minor: 1},
    hidden: true,
} as WidgetExports<typeof OldUnitInput>;
