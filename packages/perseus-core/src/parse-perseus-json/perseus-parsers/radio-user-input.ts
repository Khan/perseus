import {array, boolean, object} from "../general-purpose-parsers";

export const parseRadioUserInput = object({
    choicesSelected: array(boolean),
});
