import { GradedGroupSetWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseGradedGroupSetWidget } from "./graded-group-set-widget";

type Parsed = ParsedValue<typeof parseGradedGroupSetWidget>;

summon<Parsed>() satisfies GradedGroupSetWidget;
summon<GradedGroupSetWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<GradedGroupSetWidget>;
