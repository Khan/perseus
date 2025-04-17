import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseImageWidget} from "./image-widget";
import type {ImageWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseImageWidget>;

summon<Parsed>() satisfies ImageWidget;
summon<ImageWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<ImageWidget>;
