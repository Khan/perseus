import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGrapherWidget} from "./grapher-widget";
import type {GrapherWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGrapherWidget>;

summon<Parsed>() satisfies GrapherWidget;
summon<GrapherWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GrapherWidget>;
