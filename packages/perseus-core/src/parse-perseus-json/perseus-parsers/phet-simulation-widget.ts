import {constant, looseObject, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePhetSimulationWidget = parseWidget(
    constant("phet-simulation"),
    looseObject({
        url: string,
        description: string,
    }),
);
