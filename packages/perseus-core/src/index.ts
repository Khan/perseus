export type {PerseusAnalyticsEvent, AnalyticsEventHandlerFn} from "./analytics";
export type {
    KEScore,
    KeypadContextRendererInterface,
    RendererInterface,
} from "./types";
export type {ErrorKind} from "./error/errors";

// Careful, `version.ts` uses this function so it _must_ be imported above it
export {addLibraryVersionToPerseusDebug} from "./utils/add-library-version-to-perseus-debug";

export {libVersion} from "./version";

export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";

export * from "./data-schema";

export {pluck, mapObject} from "./utils/objective_";
