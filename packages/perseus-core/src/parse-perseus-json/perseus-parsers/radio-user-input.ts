import {array, object, string} from "../general-purpose-parsers";

export const parseRadioUserInput = object({
    selectedChoiceIds: array(string),
});
