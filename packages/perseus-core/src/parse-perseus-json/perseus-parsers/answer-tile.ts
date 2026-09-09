import {number, object, optional, string} from "../general-purpose-parsers";

// NOTE: A widget whose tiles carry a field of their own should export
// this schema and spread it, rather than restate these fields.
const answerTileSchema = {
    id: string,
    content: string,
    label: string,
    imageHeight: optional(number),
};

/**
 * Parses one tile in a Drag And Drop widget's choice bank. Shared across the
 * widget family, like `PerseusAnswerTile`.
 */
export const parseAnswerTile = object(answerTileSchema);
