import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseDefinitionWidget = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
    }),
);
