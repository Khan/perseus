import { PerseusImageDetail } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parsePerseusImageDetail } from "./perseus-image-detail";

type Parsed = ParsedValue<typeof parsePerseusImageDetail>;

summon<Parsed>() satisfies PerseusImageDetail;
summon<PerseusImageDetail>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<PerseusImageDetail>;
