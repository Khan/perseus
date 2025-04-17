import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGradedGroupWidget} from "./graded-group-widget";
import type {GradedGroupWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGradedGroupWidget>;

summon<Parsed>() satisfies GradedGroupWidget;
summon<GradedGroupWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<GradedGroupWidget>;
