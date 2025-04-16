import { PhetSimulationWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parsePhetSimulationWidget } from "./phet-simulation-widget";

type Parsed = ParsedValue<typeof parsePhetSimulationWidget>;

summon<Parsed>() satisfies PhetSimulationWidget;
summon<PhetSimulationWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PhetSimulationWidget>;
