import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {
    ExpressionWidget,
    PerseusExpressionAnswerForm,
} from "../../../perseus-types";
import type {ParsedValue, Parser} from "../parser-types";

const parsePossiblyInvalidAnswerForm = object({
    // `value` is the possibly invalid part of this. It should always be a
    // string, but some answer forms don't have it. The Expression widget
    // ignores invalid values, so we can safely filter them out during parsing.
    value: optional(string),
    form: defaulted(boolean, () => false),
    simplify: defaulted(boolean, () => false),
    considered: enumeration("correct", "wrong", "ungraded"),
    key: pipeParsers(optional(union(string).or(number).parser)).then(
        (key, ctx) => ctx.success(String(key)),
    ).parser,
});

function removeInvalidAnswerForms(
    possiblyInvalid: Array<ParsedValue<typeof parsePossiblyInvalidAnswerForm>>,
): PerseusExpressionAnswerForm[] {
    const valid: PerseusExpressionAnswerForm[] = [];
    for (const answerForm of possiblyInvalid) {
        const {value} = answerForm;
        if (value != null) {
            // Copying the object seems to be needed to make TypeScript happy
            valid.push({...answerForm, value});
        }
    }
    return valid;
}

const version1 = object({major: constant(1), minor: number});
const parseExpressionWidgetV1: Parser<ExpressionWidget> =
    parseWidgetWithVersion(
        version1,
        constant("expression"),
        object({
            answerForms: pipeParsers(
                array(parsePossiblyInvalidAnswerForm),
            ).then(convert(removeInvalidAnswerForms)).parser,
            functions: array(string),
            times: boolean,
            visibleLabel: optional(string),
            ariaLabel: optional(string),
            buttonSets: array(
                enumeration(
                    "basic",
                    "basic+div",
                    "trig",
                    "prealgebra",
                    "logarithms",
                    "basic relations",
                    "advanced relations",
                ),
            ),
            buttonsVisible: optional(enumeration("always", "never", "focused")),
        }),
    );

const version0 = optional(object({major: constant(0), minor: number}));
const parseExpressionWidgetV0 = parseWidgetWithVersion(
    version0,
    constant("expression"),
    object({
        functions: array(string),
        times: boolean,
        visibleLabel: optional(string),
        ariaLabel: optional(string),
        form: boolean,
        simplify: boolean,
        value: string,
        buttonSets: array(
            enumeration(
                "basic",
                "basic+div",
                "trig",
                "prealgebra",
                "logarithms",
                "basic relations",
                "advanced relations",
            ),
        ),
        buttonsVisible: optional(enumeration("always", "never", "focused")),
    }),
);

function migrateV0ToV1(
    widget: ParsedValue<typeof parseExpressionWidgetV0>,
): ExpressionWidget {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: {
            times: options.times,
            buttonSets: options.buttonSets,
            functions: options.functions,
            buttonsVisible: options.buttonsVisible,
            visibleLabel: options.visibleLabel,
            ariaLabel: options.ariaLabel,

            answerForms: [
                {
                    considered: "correct",
                    form: options.form,
                    simplify: options.simplify,
                    value: options.value,
                },
            ],
        },
    };
}

export const parseExpressionWidget: Parser<ExpressionWidget> =
    versionedWidgetOptions(parseExpressionWidgetV1).withMigrationFrom(
        parseExpressionWidgetV0,
        migrateV0ToV1,
    ).parser;
