import {
    constant,
    object,
    number,
    boolean,
    optional,
    nullable,
    pair,
    pipeParsers,
    union,
    enumeration,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

const emptyStringToNull = pipeParsers(constant("")).then(
    convert(() => null),
).parser;

const parseLabel = nullable(union(number).or(emptyStringToNull).parser);

export const parseNumberLineWidget = parseWidget(
    constant("number-line"),
    object({
        range: pair(number, number),
        labelRange: pair(parseLabel, parseLabel),
        labelStyle: enumeration("decimal", "improper", "mixed", "non-reduced"),
        labelTicks: boolean,
        // NOTE(matthewcurtis): I copied the default isTickCtrl from
        // number-line.tsx. See the parse-perseus-json/README.md for
        // an explanation of why we want to duplicate the default here.
        isTickCtrl: defaulted(boolean, () => false),
        isInequality: defaulted(boolean, () => false),
        divisionRange: pair(number, number),
        numDivisions: optional(nullable(number)),
        // NOTE(benchristel): I copied the default snapDivisions from
        // number-line.tsx. See the parse-perseus-json/README.md for
        // an explanation of why we want to duplicate the default here.
        snapDivisions: defaulted(number, () => 2),
        tickStep: optional(nullable(number)),
        correctRel: defaulted(
            optional(enumeration("eq", "lt", "gt", "le", "ge")),
            // Convert null to undefined:
            () => undefined,
        ),
        correctX: defaulted(nullable(number), () => null),
        initialX: optional(nullable(number)),
        showTooltips: optional(boolean),
    }),
);
