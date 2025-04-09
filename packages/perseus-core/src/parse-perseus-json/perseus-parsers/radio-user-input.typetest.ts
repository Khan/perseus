import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseRadioUserInput} from "./radio-user-input";
import type {PerseusRadioUserInput} from "../../validation.types";
import type {ParsedValue} from "../parser-types";

summon<
    ParsedValue<typeof parseRadioUserInput>
>() satisfies PerseusRadioUserInput;
