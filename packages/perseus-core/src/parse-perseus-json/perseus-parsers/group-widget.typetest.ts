import { GroupWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseGroupWidget } from "./group-widget";

type Parsed = ParsedValue<typeof parseGroupWidget>;

summon<Parsed>() satisfies GroupWidget;
summon<GroupWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GroupWidget>;
