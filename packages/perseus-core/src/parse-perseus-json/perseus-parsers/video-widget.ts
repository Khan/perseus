import {
    constant,
    strictObject,
    string,
    boolean,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseVideoWidget = parseWidget(
    constant("video"),
    strictObject({
        location: string,
        static: optional(boolean),
    }),
);
