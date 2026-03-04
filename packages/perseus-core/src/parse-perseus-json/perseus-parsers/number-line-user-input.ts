import {strictObject, number, enumeration} from "../general-purpose-parsers";

export const parseNumberLineUserInput = strictObject({
    numLinePosition: number,
    rel: enumeration("eq", "lt", "gt", "le", "ge"),
    numDivisions: number,
});
