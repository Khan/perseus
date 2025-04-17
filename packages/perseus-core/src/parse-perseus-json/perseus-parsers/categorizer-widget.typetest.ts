import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseCategorizerWidget} from "./categorizer-widget";
import type {CategorizerWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseCategorizerWidget>;

summon<Parsed>() satisfies CategorizerWidget;
summon<CategorizerWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<CategorizerWidget>;
