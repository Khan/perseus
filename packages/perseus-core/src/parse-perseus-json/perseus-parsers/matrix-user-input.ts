import {array, string, strictObject} from "../general-purpose-parsers";

export const parseMatrixUserInput = strictObject({
    answers: array(array(string)),
});
