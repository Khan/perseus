import * as React from "react";

import type {PerseusDependencies, PerseusDependenciesV2} from "./types";

let _dependencies: PerseusDependencies | null | undefined = null;

export const setDependencies = (dependencies: PerseusDependencies) => {
    _dependencies = dependencies;
};

export const getDependencies = (): PerseusDependencies => {
    if (_dependencies) {
        return _dependencies;
    }

    throw new Error(
        [
            "Perseus has not been provided required dependencies.",
            "setDependencies(dependencies) must be called first.",
            "Make sure Perseus is being imported from javascript/perseus/perseus.js.",
        ].join("\n"),
    );
};

export type DependencyProps = Partial<
    React.ContextType<typeof DependenciesContext>
>;

export const DependenciesContext = React.createContext<PerseusDependenciesV2>({
    analytics: {onAnalyticsEvent: async () => {}},
    generateUrl: () => {
        throw new Error(
            "generateUrl dependency not provided in Perseus dependencies",
        );
    },
    useVideo: () => {
        throw new Error(
            "useVideo dependency not provided in Perseus dependencies",
        );
    },
});

/**
 * useDependencies provides easy access to the current Perseus dependencies.
 */
export const useDependencies = (): PerseusDependenciesV2 => {
    const deps = React.useContext(DependenciesContext);

    return deps;
};
