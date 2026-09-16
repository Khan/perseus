// Registry infrastructure for dependent Perseus packages. Keep this entry free
// of widget-logic imports so registration consumers do not depend on all logic.
export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";
export {default as Registry, resetRegistry} from "./utils/registry";
export {
    enterWidgetManifestContext,
    getWidgetManifest,
    getWidgetManifestScope,
    recordWidgetManifestEntry,
    resetWidgetManifests,
    withWidgetManifestContext,
} from "./utils/widget-manifest";
export type {
    WidgetManifest,
    WidgetManifestRegistry,
} from "./utils/widget-manifest";
export {
    isStrictRegistration,
    setStrictRegistration,
    strictGet,
    withStrictRegistration,
} from "./utils/strict-registry";
export * as CoreWidgetRegistry from "./widgets/core-widget-registry";
