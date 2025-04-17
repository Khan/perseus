import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePerseusImageBackground} from "./perseus-image-background";
import type {PerseusImageBackground} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePerseusImageBackground>;

summon<Parsed>() satisfies PerseusImageBackground;
summon<PerseusImageBackground>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusImageBackground>;
