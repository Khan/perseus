/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */

const error = (message: string) => {
    console.error(`ERROR: ${message}`);
};

export function isFalsey(value: unknown): boolean {
    return !value;
}

export const checkPublishConfig = ({
    name,
    publishConfig,
    private: isPrivate,
    scripts,
}): boolean => {
    let returnCode = true;

    // first check if is marked as public and there's access to publish the current package
    if (!publishConfig || (!isPrivate && publishConfig.access !== "public")) {
        const requiredAccessType = isPrivate ? "restricted" : "public";

        error(
            `${name} is missing a "publishConfig": {"access": "${requiredAccessType}"} section.`,
        );
        returnCode = false;
    }

    // also check if is marked as private and there's restricted access defined
    if (isPrivate && publishConfig.access !== "restricted") {
        error(
            `${name} is marked as private but there is a "publishConfig": {"access": "public"} section already defined. Please change it to "access": "restricted" or remove "private": true to make the package public.`,
        );
        returnCode = false;
    }

    // check that we are running our pre-publish check for this package
    if (
        !scripts.prepublishOnly ||
        !scripts.prepublishOnly.includes("utils/package-pre-publish-check.sh")
    ) {
        error(
            `${name} must have a "prepublishOnly" script that runs "utils/package-pre-publish-check.sh".`,
        );
        returnCode = false;
    }

    return returnCode;
};

const checkExport = ({name, exports}, exportField, value): boolean => {
    if (exports["."][exportField] !== value) {
        error(
            `${name} must include exports["."]["${exportField}"] set to ${JSON.stringify(value)}.\n    (eg. "exports": { ".": { "${exportField}": "${value}" } })`,
        );
        return false;
    }

    return true;
};

export const checkPrivate = (pkgJson): boolean => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return false;
    }
    return true;
};

export const checkExports = (pkgJson): boolean => {
    if (pkgJson.exports == null) {
        error(`${pkgJson.name} must have a "exports" field.`);
        return false;
    }

    if (pkgJson.exports["."] == null) {
        error(
            `${pkgJson.name} must have an "exports" field named "." (eg. "exports": { ".": {...} }).`,
        );
        return false;
    }

    return ![
        checkExport(pkgJson, "default", "./dist/index.js"),
        checkExport(pkgJson, "types", "./dist/index.d.ts"),
        checkExport(pkgJson, "source", "./src/index.ts"),
    ].some(isFalsey);
};
