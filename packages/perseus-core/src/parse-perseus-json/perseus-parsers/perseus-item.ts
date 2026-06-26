import {array, object} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseHint} from "./hint";
import {makePerseusAnswerAreaParser} from "./perseus-answer-area";
import {parsePerseusRenderer} from "./perseus-renderer";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusItem} from "../../data-schema";
import type {Parser} from "../parser-types";

export type PerseusItemParserFlags = {
    desmosCalculator: boolean;
};

export function makePerseusItemParser(
    flags: PerseusItemParserFlags,
): Parser<PerseusItem> {
    return object({
        question: parsePerseusRenderer,
        hints: defaulted(array(parseHint), () => []),
        answerArea: makePerseusAnswerAreaParser(flags.desmosCalculator),
    });
}
