import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {MoleculeRendererWidget} from "@khanacademy/perseus-core";

export const parseMoleculeRendererWidget: Parser<MoleculeRendererWidget> =
    parseWidget(
        constant("molecule-renderer"),
        object({
            widgetId: string,
            rotationAngle: optional(number),
            smiles: optional(string),
        }),
    );
