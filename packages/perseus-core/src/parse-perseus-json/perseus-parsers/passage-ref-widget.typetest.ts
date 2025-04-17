import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePassageRefWidget} from "./passage-ref-widget";
import type {PassageRefWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePassageRefWidget>;

summon<Parsed>() satisfies PassageRefWidget;
summon<PassageRefWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PassageRefWidget>;
