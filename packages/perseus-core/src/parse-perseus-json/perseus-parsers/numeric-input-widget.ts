import {
    constant,
    object,
    array,
    string,
    number,
    optional,
    enumeration,
    boolean,
    nullable,
    union,
    pipeParsers,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

export const parseSimplify = pipeParsers(
    union(constant(null))
        .or(constant(undefined))
        .or(boolean)
        .or(constant("true"))
        .or(constant("required"))
        .or(constant("correct"))
        .or(constant("enforced"))
        .or(constant("optional"))
        .or(constant("accepted")).parser,
).then(convert(deprecatedSimplifyValuesToRequired)).parser;

function deprecatedSimplifyValuesToRequired(
    simplify:
        | null
        | undefined
        | boolean
        | "true"
        | "required"
        | "correct"
        | "enforced"
        | "optional"
        | "accepted",
): "enforced" | "required" | "optional" {
    switch (simplify) {
        case "enforced":
        case "required":
        case "optional":
            return simplify;
        // NOTE(benchristel): "accepted", "correct", "true", true, false,
        // undefined, and null are all treated the same as "required" during
        // scoring, so we convert them to "required" here to preserve
        // behavior. See the tests in score-numeric-input.test.ts.
        default:
            return "required";
    }
}

export const parseNumericInputWidget = parseWidget(
    constant("numeric-input"),
    object({
        answers: array(
            object({
                message: string,
                // TODO(benchristel): value should never be null or undefined,
                // but we have some content where it is anyway. If we backfill
                // the data, simplify this.
                value: optional(nullable(number)),
                status: string,
                answerForms: defaulted(
                    optional(array(parseMathFormat)),
                    () => undefined,
                ),
                strict: boolean,
                maxError: optional(nullable(number)),
                // TODO(benchristel): simplify should never be a boolean, but we
                // have some content where it is anyway. If we ever backfill
                // the data, we should simplify `simplify`.
                simplify: parseSimplify,
            }),
        ),
        labelText: optional(string),
        size: string,
        coefficient: defaulted(boolean, () => false),
        rightAlign: optional(boolean),
        static: defaulted(boolean, () => false),
        answerForms: optional(
            array(
                object({
                    name: parseMathFormat,
                    simplify: parseSimplify,
                }),
            ),
        ),
    }),
);
