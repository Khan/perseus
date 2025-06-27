import {
    constant,
    object,
    array,
    number,
    string,
    boolean,
    optional,
    nullable,
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

export const parseNumberLineWidget = parseWidget(
    constant("number-line"),
    object({
        // TODO(LEMS-3081): change `range` to `pair(number, number)` and update the related types
        // in data-schema.ts and number-line.tsx.
        range: array(number),
        labelRange: array(nullable(union(number).or(emptyStringToNull).parser)),
        labelStyle: string,
        labelTicks: boolean,
        isTickCtrl: optional(nullable(boolean)),
        isInequality: defaulted(boolean, () => false),
        divisionRange: array(number),
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
        static: defaulted(boolean, () => false),
    }),
);
