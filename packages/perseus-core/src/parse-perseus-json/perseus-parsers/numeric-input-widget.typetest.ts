import { NumericInputWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseNumericInputWidget } from "./numeric-input-widget";

type Parsed = ParsedValue<typeof parseNumericInputWidget>;

summon<Parsed>() satisfies NumericInputWidget;
summon<NumericInputWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<NumericInputWidget>;
