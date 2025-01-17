export type {PerseusAnalyticsEvent, AnalyticsEventHandlerFn} from "./analytics";
export type {
    KEScore,
    KeypadContextRendererInterface,
    RendererInterface,
    MarkerType,
    InteractiveMarkerType,
    Relationship,
} from "./types";
export type {ErrorKind} from "./error/errors";

// Careful, `version.ts` uses this function so it _must_ be imported above it
export {addLibraryVersionToPerseusDebug} from "./utils/add-library-version-to-perseus-debug";
export {default as getMatrixSize} from "./utils/get-matrix-size";
export {default as getDecimalSeparator} from "./utils/get-decimal-separator";

export {libVersion} from "./version";

export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";

export * from "./data-schema";

export {pluck, mapObject} from "./utils/objective_";
