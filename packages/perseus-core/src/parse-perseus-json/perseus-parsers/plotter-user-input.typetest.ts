import {summon} from "../general-purpose-parsers/test-helpers";

import type {parsePlotterUserInput} from "./plotter-user-input";
import type {PerseusPlotterUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parsePlotterUserInput>;

summon<Parsed>() satisfies PerseusPlotterUserInput;
summon<PerseusPlotterUserInput>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusPlotterUserInput>;
