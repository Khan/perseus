import type {DefinitionWidget} from "../../data-schema";
import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseDefinitionWidget: Parser<DefinitionWidget> = parseWidget(
    constant("definition"),
    object({
        togglePrompt: string,
        definition: string,
        static: defaulted(boolean, () => false),
    }),
);
