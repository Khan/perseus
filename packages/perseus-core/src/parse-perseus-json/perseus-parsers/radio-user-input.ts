import {array, boolean, object, string} from "../general-purpose-parsers";

// create parser for UserSelectedChoices
const userSelectedChoicesParser = object({
    id: string,
    selected: boolean,
});


export const parseRadioUserInput = object({
    choicesSelected: array(userSelectedChoicesParser),
});
