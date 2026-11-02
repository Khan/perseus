import fs from "node:fs/promises";

import type {ItemFileReader} from "../../ports/item-file-reader";

/** Reads item files from the local disk; relative paths are from the cwd. */
export const nodeItemFileReader: ItemFileReader = {
    read: (filePath) => fs.readFile(filePath, "utf8"),
};
