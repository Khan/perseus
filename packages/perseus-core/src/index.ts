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
export type {FunctionTypeMappingKeys} from "./utils/grapher-util";
export type {Coords} from "./utils/grapher-types";

// Careful, `version.ts` uses this function so it _must_ be imported above it
export {addLibraryVersionToPerseusDebug} from "./utils/add-library-version-to-perseus-debug";
export {default as getMatrixSize} from "./utils/get-matrix-size";
export {default as getDecimalSeparator} from "./utils/get-decimal-separator";
export {approximateEqual, approximateDeepEqual} from "./utils/equality";
export {
    getWidgetIdsFromContent,
    getWidgetIdsFromContentByType,
} from "./utils/widget-id-utils";
export {default as deepClone} from "./utils/deep-clone";
export * as GrapherUtil from "./utils/grapher-util";

export {libVersion} from "./version";

export {Errors} from "./error/errors";
export {PerseusError} from "./error/perseus-error";

export * from "./data-schema";

export {pluck, mapObject} from "./utils/objective_";

export {default as expressionLogic} from "./widgets/expression";
export type {ExpressionDefaultWidgetOptions} from "./widgets/expression";
export {default as passageLogic} from "./widgets/passage";
export type {PassageDefaultWidgetOptions} from "./widgets/passage";
export {default as passageRefLogic} from "./widgets/passage-ref";
export type {PassageRefDefaultWidgetOptions} from "./widgets/passage-ref";
export {default as passageRefTargetLogic} from "./widgets/passage-ref-target";
export type {PassageRefTargetDefaultWidgetOptions} from "./widgets/passage-ref-target";

export type * from "./widgets/logic-export.types";
