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

import type {Parser} from "../parser-types";
import type {NumericInputWidget} from "@khanacademy/perseus-core";

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

const parseSimplify = enumeration(
    "required",
    "correct",
    "enforced",
    "optional",
);

export const parseNumericInputWidget: Parser<NumericInputWidget> = parseWidget(
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
                answerForms: optional(array(parseMathFormat)),
                strict: boolean,
                maxError: optional(nullable(number)),
                // TODO(benchristel): simplify should never be a boolean, but we
                // have some content where it is anyway. If we ever backfill
                // the data, we should simplify `simplify`.
                simplify: optional(
                    nullable(
                        union(parseSimplify).or(
                            pipeParsers(boolean).then(
                                convert((value) => {
                                    if (typeof value === "boolean") {
                                        return value ? "required" : "optional";
                                    }
                                    return value;
                                }),
                            ).parser,
                        ).parser,
                    ),
                ),
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
