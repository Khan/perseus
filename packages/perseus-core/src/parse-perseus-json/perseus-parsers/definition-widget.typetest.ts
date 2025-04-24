import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseDefinitionWidget} from "./definition-widget";
import type {DefinitionWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseDefinitionWidget>;

summon<Parsed>() satisfies DefinitionWidget;
summon<DefinitionWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<DefinitionWidget>;
