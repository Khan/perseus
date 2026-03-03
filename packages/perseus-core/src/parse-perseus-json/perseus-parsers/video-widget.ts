import {
    constant,
    looseObject,
    string,
    boolean,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseVideoWidget = parseWidget(
    constant("video"),
    looseObject({
        location: string,
        static: optional(boolean),
    }),
);
