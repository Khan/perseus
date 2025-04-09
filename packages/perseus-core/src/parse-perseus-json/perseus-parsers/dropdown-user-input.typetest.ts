import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseDropdownUserInput} from "./dropdown-user-input";
import type {PerseusDropdownUserInput} from "../../validation.types";
import type {ParsedValue} from "../parser-types";

summon<
    ParsedValue<typeof parseDropdownUserInput>
>() satisfies PerseusDropdownUserInput;
