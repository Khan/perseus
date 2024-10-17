import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {enumeration} from "../general-purpose-parsers/enumeration";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {string} from "../general-purpose-parsers/string";

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
    considered: enumeration(["correct", "wrong", "ungraded"] as const),
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
            enumeration([
                "basic",
                "basic+div",
                "trig",
                "prealgebra",
                "logarithms",
                "basic relations",
                "advanced relations",
            ] as const),
        ),
        buttonsVisible: optional(
            enumeration(["always", "never", "focused"] as const),
        ),
    }),
);
