import {object, array, number} from "../general-purpose-parsers";

export const parseCategorizerUserInput = object({
    values: array(number),
});
