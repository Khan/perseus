import {array, object} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseHint} from "./hint";
import {parsePerseusAnswerArea} from "./perseus-answer-area";
import {parsePerseusRenderer} from "./perseus-renderer";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusItem} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: defaulted(array(parseHint), () => []),
    answerArea: parsePerseusAnswerArea,
});
