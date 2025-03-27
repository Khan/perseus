import type {PhetSimulationWidget} from "../../data-schema";
import {constant, object, string} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parsePhetSimulationWidget: Parser<PhetSimulationWidget> =
    parseWidget(
        constant("phet-simulation"),
        object({
            url: string,
            description: string,
        }),
    );
