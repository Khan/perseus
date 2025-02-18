import {deriveAnswerForms} from "../../widgets/numeric-input/util";
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

import type {NumericInputWidget} from "../../data-schema";
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

const parseSimplify = enumeration(
    "required",
    "correct",
    "enforced",
    "optional",
);

const version1 = object({major: constant(1), minor: number});
const parseNumericInputWidgetV1: Parser<NumericInputWidget> =
    parseWidgetWithVersion(
        version1,
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
                                            return value
                                                ? "required"
                                                : "optional";
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
            fullAnswerForms: optional(
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

const version0 = optional(object({major: constant(0), minor: number}));
const parseNumericInputWidgetV0: Parser<NumericInputWidget> =
    parseWidgetWithVersion(
        version0,
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
                                            return value
                                                ? "required"
                                                : "optional";
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

function migrateV0ToV1(
    widget: ParsedValue<typeof parseNumericInputWidgetV0>,
): NumericInputWidget {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: {
            ...options,
            fullAnswerForms: deriveAnswerForms(options),
        },
    };
}

export const parseNumericInputWidget: Parser<NumericInputWidget> =
    versionedWidgetOptions(1, parseNumericInputWidgetV1).withMigrationFrom(
        0,
        parseNumericInputWidgetV0,
        migrateV0ToV1,
    ).parser;
