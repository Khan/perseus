import * as React from "react";

type AssetContextValue = {
    /**
     * Reports whether the asset identified by `assetKey` has fully rendered.
     *
     * Any component that isn't fully rendered on its initial render must call
     * `setAssetStatus(key, false)` in its constructor to register itself, then
     * `setAssetStatus(key, true)` once it has settled.
     */
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

const defaultAssetContext: AssetContextValue = {
    setAssetStatus: () => {},
};

/**
 * An internal React context for keeping track of whether a component is fully
 * loaded. This is how components that take extra rendering passes before they
 * settle let the renderers know they're not done yet.
 *
 * This context is closely related to the LoadingContext, which external
 * consumers provide so Perseus can notify them once assets have settled.
 *
 * The context carries only `setAssetStatus` because reporting is all assets
 * ever do with it. The record of who has settled belongs to whoever is waiting
 * on it, so each provider keeps its own and decides what "done" means — one
 * fires a callback for its host app, another exposes a predicate for a test to
 * poll. Publishing the record back through the context would just be a copy
 * nobody reads.
 *
 * Providing this context means taking on the bookkeeping for it:
 *
 * - Record each `assetKey` and its status. Keys are opaque strings, unique per
 *   asset instance; don't infer anything from them.
 * - Treat "nothing registered" as settled. Content with no async assets never
 *   calls `setAssetStatus` at all, so an empty record means there's nothing to
 *   wait for — not that we're still waiting.
 * - Consider everything settled only when every recorded status is `true`.
 * - Expect registrations during the render pass, since assets register as early
 *   as in their constructors. A provider that keeps statuses in React state
 *   won't see them until a later pass, which is too late to stop it reporting
 *   that rendering has finished. Keep them somewhere synchronously readable.
 * - Report completion at most once, if you report it at all. Statuses only
 *   ever move from `false` to `true` and are never removed, so a settled tree
 *   can un-settle when new content registers.
 *
 * Two gaps to be aware of: an asset that unmounts before it settles stays
 * unsettled forever (there's no way to unregister), and an asset that
 * registers on a later render pass can register after a provider has already
 * decided everything was done.
 */
const assetContext: React.Context<AssetContextValue> =
    React.createContext(defaultAssetContext);

export default assetContext;
