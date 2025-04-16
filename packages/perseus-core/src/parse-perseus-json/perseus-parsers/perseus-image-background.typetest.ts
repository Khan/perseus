import { PerseusImageBackground } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parsePerseusImageBackground } from "./perseus-image-background";

type Parsed = ParsedValue<typeof parsePerseusImageBackground>;

summon<Parsed>() satisfies PerseusImageBackground;
summon<PerseusImageBackground>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PerseusImageBackground>;
