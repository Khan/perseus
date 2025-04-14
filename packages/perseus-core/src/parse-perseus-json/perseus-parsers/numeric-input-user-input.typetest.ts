import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseNumericInputUserInput} from "./numeric-input-user-input";
import type {PerseusNumericInputUserInput} from "../../validation.types";
import type {ParsedValue} from "../parser-types";

summon<
    ParsedValue<typeof parseNumericInputUserInput>
>() satisfies PerseusNumericInputUserInput;
