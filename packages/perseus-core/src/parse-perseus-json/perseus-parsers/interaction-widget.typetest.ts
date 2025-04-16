import { InteractionWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseInteractionWidget } from "./interaction-widget";

type Parsed = ParsedValue<typeof parseInteractionWidget>;

summon<Parsed>() satisfies InteractionWidget;
summon<InteractionWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<InteractionWidget>;
