import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseHint} from "./hint";
import type {Hint} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseHint>;

summon<Parsed>() satisfies Hint;
summon<Hint>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<Hint>;
