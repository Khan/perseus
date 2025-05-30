import {
    object,
    number,
    array,
    boolean,
    optional,
    enumeration,
} from "../general-purpose-parsers";

export const parseNumberLineUserInput = object({
    isTickCrtl: optional(boolean),
    numLinePosition: number,
    rel: enumeration("eq", "lt", "gt", "le", "ge"),
    numDivisions: number,
    divisionRange: array(number),
});
