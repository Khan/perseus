import {
    enumeration,
    nullable,
    strictObject,
    string,
} from "../general-purpose-parsers";

export const parseCSProgramUserInput = strictObject({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: nullable(string),
});
