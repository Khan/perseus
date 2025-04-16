import { PassageWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parsePassageWidget } from "./passage-widget";

type Parsed = ParsedValue<typeof parsePassageWidget>;

summon<Parsed>() satisfies PassageWidget;
summon<PassageWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PassageWidget>;
