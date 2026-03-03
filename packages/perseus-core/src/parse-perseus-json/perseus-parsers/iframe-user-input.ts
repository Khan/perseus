import {
    enumeration,
    nullable,
    looseObject,
    optional,
    string,
} from "../general-purpose-parsers";

export const parseIFrameUserInput = looseObject({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: optional(nullable(string)),
});
