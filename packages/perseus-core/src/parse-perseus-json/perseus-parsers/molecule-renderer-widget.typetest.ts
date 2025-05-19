import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMoleculeRendererWidget} from "./molecule-renderer-widget";
import type {MoleculeRendererWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMoleculeRendererWidget>;

summon<Parsed>() satisfies MoleculeRendererWidget;
summon<MoleculeRendererWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<MoleculeRendererWidget>;
