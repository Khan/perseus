import {createWidgetCatalog} from "../domain/items/widgets";
import {createSchemaIndex} from "../domain/schema/schema-index";

import type {WidgetCatalog} from "../domain/items/widgets";
import type {SchemaIndex} from "../domain/schema/schema-index";
import type {SchemaSource} from "../ports/schema-source";

/** The schema index and widget catalog, built on first use. */
export interface Catalog {
    schema(): SchemaIndex;
    widgets(): WidgetCatalog;
}

/**
 * Reading and parsing perseus-core's type definitions takes a moment, so it
 * happens on the first tool call that needs it rather than at startup.
 */
export function createCatalog(source: SchemaSource): Catalog {
    let schema: SchemaIndex | undefined;
    let widgets: WidgetCatalog | undefined;
    const getSchema = () =>
        (schema ??= createSchemaIndex({
            dataSchema: source.dataSchema(),
            validationTypes: source.validationTypes(),
        }));
    return {
        schema: getSchema,
        widgets: () => (widgets ??= createWidgetCatalog(getSchema())),
    };
}
