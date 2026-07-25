import * as React from "react";

type AssetContextValue = {
    /**
     * A dictionary of asset statuses, keyed by asset key.
     */
    assetStatuses: {
        [assetKey: string]: boolean;
    };
    /**
     * Reports whether the asset identified by `assetKey` has fully rendered.
     *
     * Any component that isn't fully rendered on its initial render must call
     * `setAssetStatus(key, false)` in its constructor to register itself, then
     * `setAssetStatus(key, true)` once it has settled. Registering before mount
     * is what lets consumers know the full set of assets to wait for.
     */
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

const defaultAssetContext: AssetContextValue = {
    assetStatuses: {},
    setAssetStatus: () => {},
};

/**
 * A React context for keeping track of whether a component is fully loaded.
 * This is how components that take extra rendering passes before they settle
 * let the renderers know they're not done yet.
 */
const assetContext: React.Context<AssetContextValue> =
    React.createContext(defaultAssetContext);

export default assetContext;
