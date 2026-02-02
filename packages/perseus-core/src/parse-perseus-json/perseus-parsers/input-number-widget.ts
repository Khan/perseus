import {
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

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";

const booleanToString: Parser<string> = (rawValue, ctx) => {
    if (typeof rawValue === "boolean") {
        return ctx.success(String(rawValue));
    }
    return ctx.failure("boolean", rawValue);
};

export const parseInputNumberWidget = parseWidget(
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
        customKeypad: optional(boolean),
    }),
);
