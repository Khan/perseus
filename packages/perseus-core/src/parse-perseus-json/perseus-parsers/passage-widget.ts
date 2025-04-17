import {constant, object, string, boolean} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parsePassageWidget = parseWidget(
    constant("passage"),
    object({
        footnotes: defaulted(string, () => ""),
        passageText: string,
        passageTitle: defaulted(string, () => ""),
        showLineNumbers: boolean,
        static: defaulted(boolean, () => false),
    }),
);
