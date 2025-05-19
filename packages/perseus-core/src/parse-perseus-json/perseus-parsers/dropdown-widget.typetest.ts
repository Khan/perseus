import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseDropdownWidget} from "./dropdown-widget";
import type {DropdownWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseDropdownWidget>;

summon<Parsed>() satisfies DropdownWidget;
summon<DropdownWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<DropdownWidget>;
