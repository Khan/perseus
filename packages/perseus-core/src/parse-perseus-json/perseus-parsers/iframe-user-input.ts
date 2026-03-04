import {
    enumeration,
    nullable,
    strictObject,
    optional,
    string,
} from "../general-purpose-parsers";

export const parseIFrameUserInput = strictObject({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: optional(nullable(string)),
});
