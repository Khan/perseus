import fs from "node:fs";
import path from "node:path";

import type {ExportFileWriter} from "../../ports/export-file-writer";

/** Writes exports to the local disk; relative paths are from the cwd. */
export const nodeExportFileWriter: ExportFileWriter = {
    exists: (filePath) => fs.existsSync(filePath),
    write(filePath, contents) {
        const file = path.resolve(filePath);
        fs.mkdirSync(path.dirname(file), {recursive: true});
        const tmp = `${file}.tmp`;
        fs.writeFileSync(tmp, contents);
        fs.renameSync(tmp, file);
        return file;
    },
};
