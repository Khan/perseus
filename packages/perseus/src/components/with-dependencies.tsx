import React from "react";

import {useDependencies} from "../dependencies";

import type {PerseusDependenciesV2} from "../types";

/**
 * Higher-Order Component that provides PerseusDependenciesV2 to the wrapped component.
 * The dependencies are obtained from the DependenciesContext via the useDependencies hook.
 */
export function withDependencies<
    P extends {dependencies?: PerseusDependenciesV2},
>(
    WrappedComponent: React.ComponentType<P>,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Omit<P, "dependencies">> & React.RefAttributes<any>
> {
    const WithDependenciesComponent = React.forwardRef<
        any,
        Omit<P, "dependencies">
    >((props, ref) => {
        const dependencies = useDependencies();

        return (
            <WrappedComponent
                {...(props as P)}
                dependencies={dependencies}
                ref={ref}
            />
        );
    });

    WithDependenciesComponent.displayName = `withDependencies(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return WithDependenciesComponent;
}
