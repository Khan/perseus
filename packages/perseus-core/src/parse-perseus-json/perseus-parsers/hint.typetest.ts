import { Hint } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseHint } from "./hint";

type Parsed = ParsedValue<typeof parseHint>;

summon<Parsed>() satisfies Hint;
summon<Hint>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<Hint>;
