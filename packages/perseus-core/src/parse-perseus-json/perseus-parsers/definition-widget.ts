import {boolean, constant, looseObject, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseDefinitionWidget = parseWidget(
    constant("definition"),
    looseObject({
        togglePrompt: string,
        definition: string,
        static: defaulted(boolean, () => false),
    }),
);
