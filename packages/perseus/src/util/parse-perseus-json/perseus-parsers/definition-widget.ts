import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {object} from "../general-purpose-parsers/object";
import {string} from "../general-purpose-parsers/string";

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
