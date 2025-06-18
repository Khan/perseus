import {object, number, enumeration} from "../general-purpose-parsers";

export const parseNumberLineUserInput = object({
    numLinePosition: number,
    rel: enumeration("eq", "lt", "gt", "le", "ge"),
    numDivisions: number,
});
