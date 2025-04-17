import {
    constant,
    object,
    string,
    boolean,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseVideoWidget = parseWidget(
    constant("video"),
    object({
        location: string,
        static: optional(boolean),
    }),
);
