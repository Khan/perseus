import {array, string, looseObject} from "../general-purpose-parsers";

export const parseMatrixUserInput = looseObject({
    answers: array(array(string)),
});
