import {
    constant,
    object,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseMoleculeRendererWidget = parseWidget(
    constant("molecule-renderer"),
    object({
        widgetId: string,
        rotationAngle: optional(number),
        smiles: optional(string),
    }),
);
