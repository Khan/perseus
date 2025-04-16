import { GrapherWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseGrapherWidget } from "./grapher-widget";

type Parsed = ParsedValue<typeof parseGrapherWidget>;

summon<Parsed>() satisfies GrapherWidget;
summon<GrapherWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GrapherWidget>;
