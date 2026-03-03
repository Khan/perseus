import {looseObject, number, enumeration} from "../general-purpose-parsers";

export const parseNumberLineUserInput = looseObject({
    numLinePosition: number,
    rel: enumeration("eq", "lt", "gt", "le", "ge"),
    numDivisions: number,
});
