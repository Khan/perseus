/**
 * Adds the given perseus library version information to the __perseus_debug__
 * object and ensures that the object is attached to `globalThis` (`window` in
 * browser environments).
 *
 * This allows each library to provide runtime version information to assist in
 * debugging in production environments.
 */
export const addLibraryVersionToPerseusDebug = (
    libraryName: string,
    libraryVersion: string,
) => {
    let prefix = "v";
    if (libraryVersion === "__lib_version__") {
        prefix = "";
    }
    const s = `${prefix}${libraryVersion}`;

    if (globalThis) {
        globalThis.__perseus_debug__ = globalThis.__perseus_debug__ ?? {};

        globalThis.__perseus_debug__[libraryName] = s;
    } else {
        // eslint-disable-next-line no-console
        console.warn(`globalThis not found found (${s})`);
    }
};
