import * as React from "react";

type LoadingContextValue = {
    onRendered: (isRendered: boolean) => void;
};

const defaultLoadingContext: LoadingContextValue = {
    onRendered: () => {},
};

/**
 * Signals that a Perseus item has finished rendering, including the content
 * that renders asynchronously: images, math, and zoomable content.
 *
 * Consumers of Perseus provide this context, and ServerItemRenderer consumes
 * it, so callers don't have to thread it through their own component tree.
 *
 * `onRendered` is called at most once per item, and only ever with `true`.
 * There is no signal for "not rendered yet"; the absence of the call is the
 * signal.
 *
 * @example
 * ```tsx
 * <LoadingContext.Provider
 *     value={{onRendered: () => reportItemInteractive()}}
 * >
 *     <ServerItemRenderer item={item} dependencies={dependencies} />
 * </LoadingContext.Provider>
 * ```
 */
// Internally, this context's signal is produced by the ServerItemRenderer by
// its render tree in an AssetContext and then notifying the LoadingContext
// when all reported assets report being loaded.
// No other renderers (as of July 2026) integrate with this LoadingContext.
const LoadingContext: React.Context<LoadingContextValue> = React.createContext(
    defaultLoadingContext,
);

export default LoadingContext;
