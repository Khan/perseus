import {convertInputNumberOptionsToNumericInput} from "../../widgets/input-number/to-numeric-input";
import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {ParsedValue, Parser} from "../parser-types";

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

const booleanToString: Parser<string> = (rawValue, ctx) => {
    if (typeof rawValue === "boolean") {
        return ctx.success(String(rawValue));
    }
    return ctx.failure("boolean", rawValue);
};

const version0 = optional(object({major: constant(0), minor: number}));
export const parseInputNumberWidgetV0 = parseWidgetWithVersion(
    version0,
    constant("input-number"),
    object({
        answerType: optional(
            enumeration(
                "number",
                "decimal",
                "integer",
                "rational",
                "improper",
                "mixed",
                "percent",
                "pi",
            ),
        ),
        inexact: optional(boolean),
        maxError: optional(union(number).or(string).parser),
        rightAlign: optional(boolean),
        simplify: enumeration("required", "optional", "enforced"),
        size: enumeration("normal", "small"),
        // TODO(benchristel): there are some content items where value is a
        // boolean, even though that makes no sense. We should figure out if
        // those content items are actually published anywhere, and consider
        // updating them.
        value: defaulted(
            union(number).or(string).or(booleanToString).parser,
            () => 0,
        ),
    }),
);

const version1 = object({major: constant(1), minor: number});
export const parseInputNumberWidgetV1 = parseWidgetWithVersion(
    version1,
    constant("input-number"),
    object({
        answers: array(
            object({
                message: defaulted(string, () => ""),
                value: number,
                status: string,
                answerForms: array(parseMathFormat),
                strict: defaulted(boolean, () => false),
                maxError: optional(number),
                simplify: enumeration("required", "optional", "enforced"),
            }),
        ),
        labelText: optional(string),
        size: string,
        coefficient: defaulted(boolean, () => false),
        rightAlign: optional(boolean),
    }),
);

function migrateV0ToV1(
    widget: ParsedValue<typeof parseInputNumberWidgetV0>,
): ParsedValue<typeof parseInputNumberWidgetV1> {
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: convertInputNumberOptionsToNumericInput(widget.options),
    };
}

export const parseInputNumberWidget = versionedWidgetOptions(
    1,
    parseInputNumberWidgetV1,
).withMigrationFrom(0, parseInputNumberWidgetV0, migrateV0ToV1).parser;
