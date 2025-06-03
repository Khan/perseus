import {array, string} from "../general-purpose-parsers";

export const parseTableUserInput = array(array(string));
