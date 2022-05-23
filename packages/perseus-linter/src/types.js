// @flow

export type LinterContextProps = {
    contentType: string,
    highlightLint: boolean,
    paths: $ReadOnlyArray<string>,
    stack: $ReadOnlyArray<string>,
    // additional properties can be added to the context by widgets
    ...
};
