import type {PerseusDependencies} from "./types";

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
