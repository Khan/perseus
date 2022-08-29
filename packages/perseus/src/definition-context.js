// @flow
/**
 * A React context for ensuring there is one and only one definition showing at a time
 */

import * as React from "react";

type DefintionContext = {|
    activeDefinitionId: ?string,
    setActiveDefinitionId: (?string) => void,
|};

const defaultContext: DefintionContext = {
    activeDefinitionId: null,
    setActiveDefinitionId: () => {},
};

const DefinitionContext: React.Context<DefintionContext> =
    React.createContext(defaultContext);

type ProviderState = {
    activeDefinitionId: ?string,
};

export type ProviderProps = {|children: any|};
export class DefinitionProvider extends React.Component<
    ProviderProps,
    ProviderState,
> {
    // Context state
    state: ProviderState = {
        activeDefinitionId: null,
    };

    // Method to update state
    // $FlowFixMe[signature-verification-failure]
    setActiveDefinitionId = (activeDefinitionId: ?string): void => {
        this.setState((prevState: ProviderState) => ({activeDefinitionId}));
    };

    render(): React.Node {
        const {children} = this.props;
        const {activeDefinitionId} = this.state;
        const {setActiveDefinitionId} = this;

        return (
            <DefinitionContext.Provider
                value={{
                    activeDefinitionId,
                    setActiveDefinitionId,
                }}
            >
                {children}
            </DefinitionContext.Provider>
        );
    }
}

export const DefinitionConsumer = DefinitionContext.Consumer;
