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
    // If the library version is the default value, then we don't want to
    // prefix it with a "v" to indicate that it is a version number.
    let prefix = "v";
    if (libraryVersion === "__lib_version__") {
        prefix = "";
    }
    const formattedVersion = `${prefix}${libraryVersion}`;

    if (typeof globalThis !== "undefined") {
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        globalThis.__perseus_debug__ = globalThis.__perseus_debug__ ?? {};

        const existingVersionEntry = globalThis.__perseus_debug__[libraryName];
        if (existingVersionEntry) {
            // If we already have an entry and it doesn't match the registered
            // version, we morph the entry into an array and log a warning.
            if (existingVersionEntry !== formattedVersion) {
                // Existing entry might be an array already (oops, at least 2
                // versions of the library already loaded!).
                const allVersions = Array.isArray(existingVersionEntry)
                    ? existingVersionEntry
                    : [existingVersionEntry];
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                allVersions.push(formattedVersion);

                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                globalThis.__perseus_debug__[libraryName] = allVersions;

                // eslint-disable-next-line no-console
                console.warn(
                    // TODO(LEMS-3083): Remove eslint suppression
                    // eslint-disable-next-line functional/immutable-data
                    `Multiple versions of ${libraryName} loaded on this page: ${allVersions
                        .sort()
                        .join(", ")}`,
                );
            }
        } else {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            globalThis.__perseus_debug__[libraryName] = formattedVersion;
        }
    } else {
        // eslint-disable-next-line no-console
        console.warn(`globalThis not found found (${formattedVersion})`);
    }
};
