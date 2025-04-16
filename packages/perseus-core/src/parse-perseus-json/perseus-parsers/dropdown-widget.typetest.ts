import { DropdownWidget } from "../../data-schema";
import { RecursiveRequired, summon } from "../general-purpose-parsers/test-helpers";
import { ParsedValue } from "../parser-types";
import { parseDropdownWidget } from "./dropdown-widget";

type Parsed = ParsedValue<typeof parseDropdownWidget>;

summon<Parsed>() satisfies DropdownWidget;
summon<DropdownWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<DropdownWidget>;
