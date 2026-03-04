import {
    constant,
    strictObject,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseMoleculeRendererWidget = parseWidget(
    constant("molecule-renderer"),
    strictObject({
        widgetId: string,
        rotationAngle: optional(number),
        smiles: optional(string),
    }),
);
