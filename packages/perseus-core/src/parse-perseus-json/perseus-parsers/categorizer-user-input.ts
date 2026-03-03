import {
    strictObject,
    array,
    number,
    optional,
    nullable,
} from "../general-purpose-parsers";

export const parseCategorizerUserInput = strictObject({
    values: array(optional(nullable(number))),
});
