import {
    enumeration,
    nullable,
    object,
    string,
} from "../general-purpose-parsers";

export const parseIFrameUserInput = object({
    status: enumeration("correct", "incorrect", "incomplete"),
    message: nullable(string),
});
