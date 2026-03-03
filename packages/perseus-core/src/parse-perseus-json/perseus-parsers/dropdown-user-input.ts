import {number, looseObject} from "../general-purpose-parsers";

export const parseDropdownUserInput = looseObject({
    value: number,
});
