import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {
    ExpressionWidget,
    PerseusExpressionAnswerForm,
} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const parseAnswerForm: Parser<PerseusExpressionAnswerForm> = object({
    value: string,
    form: boolean,
    simplify: boolean,
    considered: enumeration("correct", "wrong", "ungraded"),
    key: optional(string),
});

export const parseExpressionWidget: Parser<ExpressionWidget> = parseWidget(
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
