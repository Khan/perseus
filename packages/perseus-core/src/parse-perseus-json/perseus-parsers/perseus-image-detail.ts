import {number, object} from "../general-purpose-parsers";

export const parsePerseusImageDetail = object({
    width: number,
    height: number,
});
