/**
 * The text of perseus-core's own TypeScript type definitions, which widget
 * specs are read from. Reading the real source (rather than keeping a copy)
 * means the specs can never drift from the schema the parser checks against.
 */
export interface SchemaSource {
    /** The contents of perseus-core's `data-schema.ts`. */
    dataSchema(): string;
    /** The contents of perseus-core's `validation.types.ts`. */
    validationTypes(): string;
}
