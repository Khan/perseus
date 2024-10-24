import type {NumberLineWidget} from "../../data-schema";
import {
    array,
    boolean,
    constant,
    nullable,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

const emptyStringToNull = pipeParsers(constant("")).then(
    convert(() => null),
).parser;

export const parseNumberLineWidget: Parser<NumberLineWidget> = parseWidget(
    constant("number-line"),
    object({
        range: array(number),
        labelRange: array(nullable(union(number).or(emptyStringToNull).parser)),
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
        correctX: nullable(number),
        initialX: optional(nullable(number)),
        showTooltips: optional(boolean),
        static: defaulted(boolean, () => false),
    }),
);
