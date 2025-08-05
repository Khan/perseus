import {
    object,
    array,
    number,
    optional,
    nullable,
} from "../general-purpose-parsers";

export const parseCategorizerUserInput = object({
    values: array(optional(nullable(number))),
});
