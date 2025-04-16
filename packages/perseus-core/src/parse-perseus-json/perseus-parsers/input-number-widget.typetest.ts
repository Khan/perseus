import { InputNumberWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseInputNumberWidget } from "./input-number-widget";

type Parsed = ParsedValue<typeof parseInputNumberWidget>;

summon<Parsed>() satisfies InputNumberWidget;
summon<InputNumberWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<InputNumberWidget>;
