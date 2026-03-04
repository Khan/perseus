import {
    enumeration,
    nullable,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

export const parseIFrameUserInput = object({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: optional(nullable(string)),
});
