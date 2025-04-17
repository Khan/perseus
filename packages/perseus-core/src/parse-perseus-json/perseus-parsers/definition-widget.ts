import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseDefinitionWidget = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
        static: defaulted(boolean, () => false),
    }),
);
