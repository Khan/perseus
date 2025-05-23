import {array, number, object} from "../general-purpose-parsers";

export const parseMatrixUserInput = object({
    answers: array(array(number)),
});
