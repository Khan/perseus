import {
    constant,
    object,
    array,
    number,
    string,
    boolean,
    optional,
    nullable,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {NumberLineWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseNumberLineWidget: Parser<NumberLineWidget> = parseWidget(
    constant("number-line"),
    object({
        range: array(number),
        labelRange: array(nullable(number)),
        labelStyle: string,
        labelTicks: boolean,
        isTickCtrl: optional(nullable(boolean)),
        divisionRange: array(number),
        numDivisions: optional(nullable(number)),
        snapDivisions: number,
        tickStep: optional(nullable(number)),
        correctRel: optional(nullable(string)),
        correctX: number,
        initialX: optional(nullable(number)),
        showTooltip: optional(boolean),
        static: boolean,
    }),
);
