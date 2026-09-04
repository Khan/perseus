import {number, object, optional, string} from "../general-purpose-parsers";

const answerTileSchema = {
    id: string,
    content: string,
    label: string,
    imageHeight: optional(number),
};

/**
 * Parses one tile in a Drag And Drop widget's choice bank.
 *
 * Shared, like `PerseusAnswerTile`. A widget that adds a field of its own
 * should export the schema above and spread it, rather than restate these.
 */
export const parseAnswerTile = object(answerTileSchema);
