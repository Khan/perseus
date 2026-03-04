import {number, strictObject} from "../general-purpose-parsers";

export const parsePerseusImageDetail = strictObject({
    width: number,
    height: number,
});
