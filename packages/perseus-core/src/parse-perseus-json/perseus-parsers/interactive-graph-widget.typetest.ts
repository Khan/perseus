import { InteractiveGraphWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseInteractiveGraphWidget } from "./interactive-graph-widget";

type Parsed = ParsedValue<typeof parseInteractiveGraphWidget>;

summon<Parsed>() satisfies InteractiveGraphWidget;
summon<InteractiveGraphWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<InteractiveGraphWidget>;
