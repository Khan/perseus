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

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {ParsedValue} from "../parser-types";

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

const parseNumericInputAnswers = array(
    object({
        message: defaulted(string, () => ""),
        // TODO(benchristel): value should never be null or undefined,
        // but we have some content where it is anyway. If we backfill
        // the data, simplify this.
        value: optional(nullable(number)),
        status: string,
        answerForms: defaulted(
            optional(array(parseMathFormat)),
            () => undefined,
        ),
        strict: defaulted(boolean, () => false),
        maxError: optional(nullable(number)),
        // TODO(benchristel): simplify should never be a boolean, but we
        // have some content where it is anyway. If we ever backfill
        // the data, we should simplify `simplify`.
        simplify: parseSimplify,
    }),
);

const version1 = object({major: constant(1), minor: number});
const parseNumericInputWidgetV1 = parseWidgetWithVersion(
    version1,
    constant("numeric-input"),
    object({
        answers: parseNumericInputAnswers,
        labelText: optional(string),
        size: string,
        coefficient: defaulted(boolean, () => false),
        textAlign: defaulted(
            enumeration("start", "end", "center"),
            () => "start" as const,
        ),
    }),
);

const version0 = optional(object({major: constant(0), minor: number}));
const parseNumericInputWidgetV0 = parseWidgetWithVersion(
    version0,
    constant("numeric-input"),
    object({
        answers: parseNumericInputAnswers,
        labelText: optional(string),
        size: string,
        coefficient: defaulted(boolean, () => false),
        rightAlign: optional(boolean),
    }),
);

function migrateV0ToV1(
    widget: ParsedValue<typeof parseNumericInputWidgetV0>,
): ParsedValue<typeof parseNumericInputWidgetV1> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: {
            ...options,
            textAlign: options.rightAlign ? "end" : "start",
        },
    };
}

export const parseNumericInputWidget = versionedWidgetOptions(
    1,
    parseNumericInputWidgetV1,
).withMigrationFrom(0, parseNumericInputWidgetV0, migrateV0ToV1).parser;
