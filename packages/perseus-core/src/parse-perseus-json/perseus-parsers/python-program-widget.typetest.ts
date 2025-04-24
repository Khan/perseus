import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePythonProgramWidget} from "./python-program-widget";
import type {PythonProgramWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePythonProgramWidget>;

summon<Parsed>() satisfies PythonProgramWidget;
summon<PythonProgramWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PythonProgramWidget>;
