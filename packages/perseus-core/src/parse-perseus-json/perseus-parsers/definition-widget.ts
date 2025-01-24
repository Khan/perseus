import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {DefinitionWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseDefinitionWidget: Parser<DefinitionWidget> = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
        static: defaulted(boolean, () => false),
    }),
);
