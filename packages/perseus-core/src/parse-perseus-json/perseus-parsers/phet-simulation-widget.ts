import {constant, strictObject, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePhetSimulationWidget = parseWidget(
    constant("phet-simulation"),
    strictObject({
        url: string,
        description: string,
    }),
);
