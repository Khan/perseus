import {
    looseObject,
    array,
    number,
    optional,
    nullable,
} from "../general-purpose-parsers";

export const parseCategorizerUserInput = looseObject({
    values: array(optional(nullable(number))),
});
