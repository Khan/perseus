import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {PhetSimulationWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePhetSimulationWidget: Parser<PhetSimulationWidget> =
    parseWidget(
        constant("phet-simulation"),
        object({
            url: string,
            description: string,
        }),
    );
