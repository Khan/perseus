import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parsePhetSimulationWidget = parseWidget(
    constant("phet-simulation"),
    object({
        url: string,
        description: string,
    }),
    // The embedded simulation is never scored, so `static` has no answer to
    // reveal.
    {supportsStatic: false},
);
