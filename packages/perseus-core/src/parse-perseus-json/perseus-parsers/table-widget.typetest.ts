import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseTableWidget} from "./table-widget";
import type {TableWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseTableWidget>;

summon<Parsed>() satisfies TableWidget;
summon<TableWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<TableWidget>;
