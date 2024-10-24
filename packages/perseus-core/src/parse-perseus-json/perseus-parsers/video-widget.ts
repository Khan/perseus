import type {VideoWidget} from "../../data-schema";
import {
    boolean,
    constant,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseVideoWidget: Parser<VideoWidget> = parseWidget(
    constant("video"),
    object({
        location: string,
        static: optional(boolean),
    }),
);
