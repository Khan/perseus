import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseVideoWidget} from "./video-widget";
import type {VideoWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseVideoWidget>;

summon<Parsed>() satisfies VideoWidget;
summon<VideoWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<VideoWidget>;
