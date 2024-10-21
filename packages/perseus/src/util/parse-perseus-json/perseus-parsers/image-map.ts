import {
    defaulted,
    number,
    object,
    record,
    string,
} from "../general-purpose-parsers";

export const imageMap = defaulted(
    record(
        string,
        object({
            width: number,
            height: number,
        }),
    ),
    () => ({}),
);
