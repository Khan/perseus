import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGroupWidget} from "./group-widget";
import type {GroupWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGroupWidget>;

summon<Parsed>() satisfies GroupWidget;
summon<GroupWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GroupWidget>;
