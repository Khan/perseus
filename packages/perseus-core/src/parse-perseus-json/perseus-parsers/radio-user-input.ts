import {array, strictObject, string} from "../general-purpose-parsers";

export const parseRadioUserInput = strictObject({
    selectedChoiceIds: array(string),
});
