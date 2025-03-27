import type {MoleculeRendererWidget} from "../../data-schema";
import {
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseMoleculeRendererWidget: Parser<MoleculeRendererWidget> =
    parseWidget(
        constant("molecule-renderer"),
        object({
            widgetId: string,
            rotationAngle: optional(number),
            smiles: optional(string),
        }),
    );
