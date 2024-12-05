import {
    constant,
    object,
    array,
    string,
    number,
    optional,
    enumeration,
    boolean,
    nullable, union, pipeParsers,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {NumericInputWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import {convert} from "../general-purpose-parsers/convert";

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

export const parseNumericInputWidget: Parser<NumericInputWidget> = parseWidget(
    constant("numeric-input"),
    object({
        answers: array(
            object({
                message: string,
                value: optional(number),
                status: string,
                answerForms: optional(array(parseMathFormat)),
                strict: boolean,
                maxError: optional(nullable(number)),
                // TODO(benchristel): simplify should never be `true`, but we
                // have some content where it is anyway. If we ever backfill
                // the data, we should simplify `simplify`.
                simplify: optional(nullable(pipeParsers(union(string).or(constant(true)).parser).then(convert(String)).parser)),
            }),
        ),
        labelText: optional(string),
        size: string,
        coefficient: boolean,
        rightAlign: optional(boolean),
        static: defaulted(boolean, () => false),
        answerForms: optional(
            array(
                object({
                    name: parseMathFormat,
                    simplify: optional(
                        nullable(
                            enumeration(
                                "required",
                                "correct",
                                "enforced",
                                "optional",
                            ),
                        ),
                    ),
                }),
            ),
        ),
    }),
);
