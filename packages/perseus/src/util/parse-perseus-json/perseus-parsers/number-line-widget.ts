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
import {defaulted} from "../general-purpose-parsers/defaulted";

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
        // NOTE(benchristel): I copied the default snapDivisions from
        // number-line.tsx. See the parse-perseus-json/README.md for
        // an explanation of why we want to duplicate the default here.
        snapDivisions: defaulted(number, () => 2),
        tickStep: optional(nullable(number)),
        correctRel: optional(nullable(string)),
        correctX: number,
        initialX: optional(nullable(number)),
        showTooltip: optional(boolean),
        static: boolean,
    }),
);
