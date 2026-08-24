import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseVideoWidget = parseWidget(
    constant("video"),
    object({
        location: string,
    }),
);
