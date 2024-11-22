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

import {parseWidget} from "./widget";

import type {InputNumberWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseInputNumberWidget: Parser<InputNumberWidget> = parseWidget(
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
        value: union(number).or(string).parser,
        customKeypad: optional(boolean),
    }),
);
