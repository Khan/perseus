/** One module of the Graffiti library's API, as its type definitions. */
export type GraffitiTypesModule = {
    /** Its path in the library, such as `shapes/arc`. */
    module: string;
    /** Its declarations. */
    text: string;
};

/**
 * The Graffiti library's API, read from the type definitions it ships, so a
 * reference built from it matches the library the scripts run with.
 */
export interface GraffitiTypesSource {
    /** The modules the library's entry point exports from, in its order. */
    read(): Promise<GraffitiTypesModule[]>;
}
