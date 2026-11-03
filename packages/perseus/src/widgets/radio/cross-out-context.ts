/**
 * A React context for the cross-out tool in multiple choice (Radio) widgets.
 *
 * Hosts wrap their renderer in its provider to turn cross-out on. Without a
 * provider, cross-out is off and Radio renders as it always has.
 */
import * as React from "react";

import type {CrossOutOptions} from "../../types";

const CrossOutContext: React.Context<CrossOutOptions | undefined> =
    React.createContext<CrossOutOptions | undefined>(undefined);

export default CrossOutContext;
