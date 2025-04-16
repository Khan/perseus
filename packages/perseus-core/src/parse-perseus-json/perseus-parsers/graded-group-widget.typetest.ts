import { GradedGroupWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseGradedGroupWidget } from "./graded-group-widget";

type Parsed = ParsedValue<typeof parseGradedGroupWidget>;

summon<Parsed>() satisfies GradedGroupWidget;
summon<GradedGroupWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GradedGroupWidget>;
