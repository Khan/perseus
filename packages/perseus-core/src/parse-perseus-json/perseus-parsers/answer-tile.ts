import {number, optional, string} from "../general-purpose-parsers";

/**
 * The fields of one tile in a Drag And Drop widget's choice bank. Shared
 * across the widget family, like `PerseusAnswerTile`. A widget builds its
 * tile parser with `object({...answerTileSchema, ...})`, adding any fields
 * of its own, rather than restating these.
 */
export const answerTileSchema = {
    id: string,
    content: string,
    label: string,
    imageHeight: optional(number),
};
