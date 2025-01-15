import {
    constant,
    object,
    string,
    boolean,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {VideoWidget} from "@khanacademy/perseus-core";

export const parseVideoWidget: Parser<VideoWidget> = parseWidget(
    constant("video"),
    object({
        location: string,
        static: optional(boolean),
    }),
);
