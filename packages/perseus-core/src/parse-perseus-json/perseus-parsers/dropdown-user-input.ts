import {number, strictObject} from "../general-purpose-parsers";

export const parseDropdownUserInput = strictObject({
    value: number,
});
