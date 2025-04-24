import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseExpressionWidget} from "./expression-widget";
import type {ExpressionWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseExpressionWidget>;

summon<Parsed>() satisfies ExpressionWidget;
summon<ExpressionWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<ExpressionWidget>;
