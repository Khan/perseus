import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseSorterWidget} from "./sorter-widget";
import type {SorterWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseSorterWidget>;

summon<Parsed>() satisfies SorterWidget;
summon<SorterWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<SorterWidget>;
