import {
    constant,
    object,
    string,
    boolean,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {VideoWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseVideoWidget: Parser<VideoWidget> = parseWidget(
    constant("video"),
    object({
        location: string,
        static: optional(boolean),
    }),
);
