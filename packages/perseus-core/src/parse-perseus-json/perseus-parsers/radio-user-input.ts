import {array, looseObject, string} from "../general-purpose-parsers";

export const parseRadioUserInput = looseObject({
    selectedChoiceIds: array(string),
});
