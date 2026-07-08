import {any, object, optional, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parsePerseusAnswerArea} from "./perseus-answer-area";
import {parseWidgetsMap} from "./widgets-map";

export const parsePerseusArticleSection = object({
    content: defaulted(string, () => ""),
    widgets: defaulted(parseWidgetsMap, () => ({})),
    images: parseImages,
    // deprecated
    metadata: any,
    answerArea: optional(parsePerseusAnswerArea),
});
