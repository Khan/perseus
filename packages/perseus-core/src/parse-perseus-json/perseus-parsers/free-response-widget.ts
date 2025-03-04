import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {FreeResponseWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseFreeResponseWidget: Parser<FreeResponseWidget> = parseWidget(
    constant("free-response"),
    object({
        question: string,
    }),
);
