import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseGradedGroupSetWidget} from "./graded-group-set-widget";
import type {GradedGroupSetWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseGradedGroupSetWidget>;

summon<Parsed>() satisfies GradedGroupSetWidget;
summon<GradedGroupSetWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<GradedGroupSetWidget>;
