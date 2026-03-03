import {
    constant,
    looseObject,
    string,
    number,
    optional,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseMoleculeRendererWidget = parseWidget(
    constant("molecule-renderer"),
    looseObject({
        widgetId: string,
        rotationAngle: optional(number),
        smiles: optional(string),
    }),
);
