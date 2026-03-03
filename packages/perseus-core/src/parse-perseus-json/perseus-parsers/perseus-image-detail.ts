import {number, looseObject} from "../general-purpose-parsers";

export const parsePerseusImageDetail = looseObject({
    width: number,
    height: number,
});
