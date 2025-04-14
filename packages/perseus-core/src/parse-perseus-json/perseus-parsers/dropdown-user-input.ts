import {number, object} from "../general-purpose-parsers";

export const parseDropdownUserInput = object({
    value: number,
});
