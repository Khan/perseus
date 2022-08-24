// @flow
/**
 * A React context for ensuring there is one and only one definition showing at a time
 */

import * as React from "react";

type Context = {
    activeDefinitionId: ?string,
    setActiveDefinitionId: (string) => void,
};

const defaultContext: Context = {
    activeDefinitionId: null,
    setActiveDefinitionId: () => {},
};

const context: React.Context<Context> = React.createContext(defaultContext);

export default context;
