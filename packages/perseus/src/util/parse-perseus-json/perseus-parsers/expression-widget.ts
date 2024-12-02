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

import {parseWidgetWithVersion} from "./widget";

import type {
    ExpressionWidget,
    PerseusExpressionAnswerForm,
} from "../../../perseus-types";
import type {
    ParseContext,
    ParsedValue,
    Parser,
    ParseResult,
} from "../parser-types";

const parseAnswerForm: Parser<PerseusExpressionAnswerForm> = object({
    value: string,
    form: boolean,
    simplify: boolean,
    considered: enumeration("correct", "wrong", "ungraded"),
    key: pipeParsers(optional(union(string).or(number).parser)).then(
        (key, ctx) => ctx.success(String(key)),
    ).parser,
});

const parseExpressionWidgetV1: Parser<ExpressionWidget> =
    parseWidgetWithVersion(
        object({major: constant(1), minor: number}),
        constant("expression"),
        object({
            answerForms: array(parseAnswerForm),
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

const parseExpressionWidgetV0 = parseWidgetWithVersion(
    optional(object({major: constant(0), minor: number})),
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
    ctx: ParseContext,
): ParseResult<ExpressionWidget> {
    const {options} = widget;
    return ctx.success({
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
    });
}

export const parseExpressionWidget: Parser<ExpressionWidget> = union(
    parseExpressionWidgetV1,
).or(pipeParsers(parseExpressionWidgetV0).then(migrateV0ToV1).parser).parser;
