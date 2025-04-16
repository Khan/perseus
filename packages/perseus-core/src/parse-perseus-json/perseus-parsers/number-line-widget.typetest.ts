import { NumberLineWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseNumberLineWidget } from "./number-line-widget";

type Parsed = ParsedValue<typeof parseNumberLineWidget>;

summon<Parsed>() satisfies NumberLineWidget;
summon<NumberLineWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<NumberLineWidget>;
