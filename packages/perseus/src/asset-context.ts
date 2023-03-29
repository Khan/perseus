/**
 * A React context for keeping track of whether an component is fully
 * loaded.  This is used to know when SvgImage and (Zoomable)TeX are finished
 * renderering.
 */

import * as React from "react";

type Context = {
    // A dictionary of asset statues.  See server-item-renderer.jsx for
    // an example of its definition.
    assetStatuses: {
        [assetKey: string]: boolean;
    };
    // setAssetStatus(key, false) must be called in the constructor of
    // any component which isn't fully rendered on initial render.  This
    // adds the asset key to asssetStatuses, see server-item-renderer.jsx.
    // setAssetStatus(key, true) must be called when the component has
    // fully rendered itself.  See svg-image.jsx and tex.jsx.
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

const defaultContext: Context = {
    assetStatuses: {},
    setAssetStatus: (assetKey: string, loaded: boolean) => {},
};

const context: React.Context<Context> = React.createContext(defaultContext);

export default context;
