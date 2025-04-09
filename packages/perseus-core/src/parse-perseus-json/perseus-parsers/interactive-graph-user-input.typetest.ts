import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseInteractiveGraphUserInput} from "./interactive-graph-user-input";
import type {PerseusInteractiveGraphUserInput} from "../../validation.types";
import type {ParsedValue} from "../parser-types";

summon<
    ParsedValue<typeof parseInteractiveGraphUserInput>
>() satisfies PerseusInteractiveGraphUserInput;

