import {boolean, constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {DefinitionWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseDefinitionWidget: Parser<DefinitionWidget> = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
        static: boolean,
    }),
);
