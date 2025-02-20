/**
 * A React context for ensuring there is one and only one definition showing at a time
 */

import * as React from "react";

type DefintionContext = {
    activeDefinitionId: string | null | undefined;
    setActiveDefinitionId: (arg1?: string | null | undefined) => void;
};

const defaultContext: DefintionContext = {
    activeDefinitionId: null,
    setActiveDefinitionId: () => {},
};

const DefinitionContext: React.Context<DefintionContext> =
    React.createContext(defaultContext);

type ProviderState = {
    activeDefinitionId: string | null | undefined;
};

type ProviderProps = {
    children: any;
};
export class DefinitionProvider extends React.Component<
    ProviderProps,
    ProviderState
> {
    // Context state
    state: ProviderState = {
        activeDefinitionId: null,
    };

    // Method to update state
    setActiveDefinitionId = (activeDefinitionId?: string | null): void => {
        this.setState((prevState: ProviderState) => ({activeDefinitionId}));
    };

    render(): React.ReactNode {
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
