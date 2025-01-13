import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {DefinitionWidget} from "@khanacademy/perseus-core";

export const parseDefinitionWidget: Parser<DefinitionWidget> = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
        static: defaulted(boolean, () => false),
    }),
);
