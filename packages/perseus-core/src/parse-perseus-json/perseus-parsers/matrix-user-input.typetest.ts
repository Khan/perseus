import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseMatrixUserInput} from "./matrix-user-input";
import type {PerseusMatrixUserInput} from "../../validation.types";
import type {RecursiveRequired} from "../general-purpose-parsers/test-helpers";
import type {ParsedValue} from "../parser-types";

type Parsed = ParsedValue<typeof parseMatrixUserInput>;

summon<Parsed>() satisfies PerseusMatrixUserInput;
summon<PerseusMatrixUserInput>() satisfies Parsed;

summon<
    RecursiveRequired<Parsed>
>() satisfies RecursiveRequired<PerseusMatrixUserInput>;
