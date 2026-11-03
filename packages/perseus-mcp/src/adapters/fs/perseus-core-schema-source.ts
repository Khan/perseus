import fs from "node:fs";
import path from "node:path";

import type {SchemaSource} from "../../ports/schema-source";

// The server runs from this monorepo's sources, so perseus-core's are next
// door.
const perseusCoreSrc = path.resolve(
    import.meta.dirname,
    "../../../../perseus-core/src",
);

/** Reads perseus-core's type definitions from its source files, once each. */
export function createPerseusCoreSchemaSource(): SchemaSource {
    const read = (file: string) => {
        let text: string | undefined;
        return () =>
            (text ??= fs.readFileSync(path.join(perseusCoreSrc, file), "utf8"));
    };
    return {
        dataSchema: read("data-schema.ts"),
        validationTypes: read("validation.types.ts"),
    };
}
