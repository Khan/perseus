import fs from "node:fs";
import path from "node:path";

import type {SchemaSource} from "../../ports/schema-source";

/**
 * Reads perseus-core's type definitions, once each, from `typesDir` (see
 * `RuntimePaths`).
 */
export function createPerseusCoreSchemaSource(typesDir: string): SchemaSource {
    const read = (file: string) => {
        let text: string | undefined;
        return () =>
            (text ??= fs.readFileSync(path.join(typesDir, file), "utf8"));
    };
    return {
        dataSchema: read("data-schema.ts"),
        validationTypes: read("validation.types.ts"),
    };
}
