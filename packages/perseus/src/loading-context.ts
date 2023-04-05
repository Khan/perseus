/**
 * A React context for signaling when all of the components in a Perseus
 * renderer is fully rendered.  This means that all images and math have
 * finished loading/rendering.
 *
 * Currently only used by ServerItemRender to indicate when the question
 * renderer is fully rendered.
 */
import * as React from "react";

type Context = {
    onRendered: (isRendered: boolean) => void;
};

const defaultContext: Context = {
    onRendered: (isRendered: boolean) => {},
};

const context: React.Context<Context> = React.createContext(defaultContext);

export default context;
