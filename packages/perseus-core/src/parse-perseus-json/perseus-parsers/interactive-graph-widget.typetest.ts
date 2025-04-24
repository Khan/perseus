import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseInteractiveGraphWidget} from "./interactive-graph-widget";
import type {InteractiveGraphWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseInteractiveGraphWidget>;

summon<Parsed>() satisfies InteractiveGraphWidget;
summon<InteractiveGraphWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<InteractiveGraphWidget>;
