import {convertInputNumberOptionsToNumericInput} from "../../widgets/input-number/to-numeric-input";
import {
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    string,
    union,
    array,
    nullable,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {singleton} from "../general-purpose-parsers/singleton";

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {ParsedValue, Parser} from "../parser-types";

const booleanToZero: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue === "boolean") {
        return ctx.success(0);
    }
    return ctx.failure("boolean", rawValue);
};

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

export const parseInputNumberWidgetV1 = parseWidgetWithVersion(
    object({major: constant(1), minor: number}),
    constant("input-number"),
    object({
        size: enumeration("normal", "small"),
        coefficient: constant(false),
        answers: singleton(
            object({
                value: nullable(number),
                status: constant("correct"),
                message: constant(""),
                answerForms: array(parseMathFormat),
                strict: constant(true),
                maxError: optional(number),
                simplify: enumeration("required", "enforced", "optional"),
            }),
        ),
    }),
);

function migrateV0ToV1(
    v0: ParsedValue<typeof parseInputNumberWidgetV0>,
): ParsedValue<typeof parseInputNumberWidgetV1> {
    const v1Options = convertInputNumberOptionsToNumericInput(v0.options);
    return {
        ...v0,
        version: {major: 1, minor: 0},
        options: v1Options,
    };
}

export const parseInputNumberWidgetV0 = parseWidgetWithVersion(
    object({major: constant(0), minor: number}),
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
            union(number).or(string).or(booleanToZero).parser,
            () => 0,
        ),
    }),
);

export const parseInputNumberWidget = versionedWidgetOptions(
    1,
    parseInputNumberWidgetV1,
).withMigrationFrom(0, parseInputNumberWidgetV0, migrateV0ToV1).parser;
