import {array, enumeration} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

const parseLegacyButtonSet = enumeration(
    "basic",
    "basic+div",
    "trig",
    "prealgebra",
    "logarithms",
    "basic relations",
    "advanced relations",
    "scientific",
);

export const parseLegacyButtonSets = defaulted(
    array(parseLegacyButtonSet),
    // NOTE(benchristel): I copied the default buttonSets from
    // expression.tsx. See the parse-perseus-json/README.md for
    // an explanation of why we want to duplicate the default here.
    () => [
        "basic" as const,
        "trig" as const,
        "prealgebra" as const,
        "logarithms" as const,
    ],
);
