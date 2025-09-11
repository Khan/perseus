import {array, string, object} from "../general-purpose-parsers";

export const parseMatrixUserInput = object({
    answers: array(array(string)),
});
