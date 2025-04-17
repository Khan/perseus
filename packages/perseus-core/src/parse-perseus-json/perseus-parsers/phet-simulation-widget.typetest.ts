import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePhetSimulationWidget} from "./phet-simulation-widget";
import type {PhetSimulationWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePhetSimulationWidget>;

summon<Parsed>() satisfies PhetSimulationWidget;
summon<PhetSimulationWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PhetSimulationWidget>;
