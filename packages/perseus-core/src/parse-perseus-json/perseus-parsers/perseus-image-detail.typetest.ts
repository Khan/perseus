import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePerseusImageDetail} from "./perseus-image-detail";
import type {PerseusImageDetail} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePerseusImageDetail>;

summon<Parsed>() satisfies PerseusImageDetail;
summon<PerseusImageDetail>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusImageDetail>;
