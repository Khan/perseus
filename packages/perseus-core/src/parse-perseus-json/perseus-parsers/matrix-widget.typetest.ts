import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMatrixWidget} from "./matrix-widget";
import type {MatrixWidget} from "../../data-schema";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMatrixWidget>;

summon<Parsed>() satisfies MatrixWidget;
summon<MatrixWidget>() satisfies Parsed;

// The `RecursiveRequired` test ensures that any new optional properties added
// to the types in data-schema.ts are also added to the parser.
summon<RecursiveRequired<Parsed>>() satisfies RecursiveRequired<MatrixWidget>;
