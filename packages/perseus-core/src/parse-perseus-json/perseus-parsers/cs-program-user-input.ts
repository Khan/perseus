import {
    enumeration,
    nullable,
    looseObject,
    string,
} from "../general-purpose-parsers";

export const parseCSProgramUserInput = looseObject({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: nullable(string),
});
