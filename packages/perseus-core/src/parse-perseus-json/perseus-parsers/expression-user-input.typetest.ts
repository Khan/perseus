import {summon} from "../general-purpose-parsers/test-helpers";

import type {parseExpressionUserInput} from "./expression-user-input";
import type {PerseusExpressionUserInput} from "../../validation.types";
import type {ParsedValue} from "../parser-types";

summon<
    ParsedValue<typeof parseExpressionUserInput>
>() satisfies PerseusExpressionUserInput;
