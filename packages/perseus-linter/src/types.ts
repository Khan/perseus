/**
 * The shape of the linter context object that is passed through the
 * tree with additional information about what we are checking.
 */
export type LinterContextProps = {
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
};
