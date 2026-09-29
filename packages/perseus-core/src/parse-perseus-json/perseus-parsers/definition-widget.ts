import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseDefinitionWidget = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
    }),
    // Definitions take no user input, so `static` has no answer to reveal.
    {supportsStatic: false},
);
