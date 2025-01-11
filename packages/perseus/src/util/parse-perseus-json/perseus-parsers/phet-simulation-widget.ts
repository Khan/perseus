import {constant, object, string} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {PhetSimulationWidget} from "@khanacademy/perseus-core";

export const parsePhetSimulationWidget: Parser<PhetSimulationWidget> =
    parseWidget(
        constant("phet-simulation"),
        object({
            url: string,
            description: string,
        }),
    );
