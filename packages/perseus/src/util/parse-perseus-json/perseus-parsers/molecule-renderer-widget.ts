import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {MoleculeRendererWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseMoleculeRendererWidget: Parser<MoleculeRendererWidget> =
    parseWidget(
        constant("molecule-renderer"),
        object({
            widgetId: string,
            rotationAngle: optional(number),
            smiles: optional(string),
        }),
    );
