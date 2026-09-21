/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */
const checkPublishConfig = ({
    name,
    publishConfig,
    private: isPrivate,
    scripts,
}): boolean => {
    let returnCode = true;

    // first check if is marked as public and there's access to publish the current package
    if (!publishConfig || (!isPrivate && publishConfig.access !== "public")) {
        const requiredAccessType = isPrivate ? "restricted" : "public";

        console.error(
            `ERROR: ${name} is missing a "publishConfig": {"access": "${requiredAccessType}"} section.`,
        );
        returnCode = false;
    }

    // also check if is marked as private and there's restricted access defined
    if (isPrivate && publishConfig.access !== "restricted") {
        console.error(
            `ERROR: ${name} is marked as private but there is a "publishConfig": {"access": "public"} section already defined. Please change it to "access": "restricted" or remove "private": true to make the package public.`,
        );
        returnCode = false;
    }

    // check that we are running our pre-publish check for this package
    if (
        !scripts.prepublishOnly ||
        !scripts.prepublishOnly.includes("utils/package-pre-publish-check.sh")
    ) {
        console.error(
            `ERROR: ${name} must have a "prepublishOnly" script that runs "utils/package-pre-publish-check.sh".`,
        );
        returnCode = false;
    }
    return returnCode;
};

const checkField = (pkgJson, field, value): boolean => {
    let returnCode = true;
    if (Array.isArray(value)) {
        if (!value.includes(pkgJson[field])) {
            console.error(
                `ERROR: ${
                    pkgJson.name
                } must have a "${field}" set to one of ${value
                    .map((value) => JSON.stringify(value))
                    .join(", ")}.`,
            );
            returnCode = false;
        }
    } else if (pkgJson[field] !== value) {
        console.error(
            `ERROR: ${
                pkgJson.name
            } must have a "${field}" set to ${JSON.stringify(value)}.`,
        );
        returnCode = false;
    }
    return returnCode;
};

const checkNoMain = (pkgJson): boolean => {
    if (pkgJson.main != null) {
        console.error(
            `ERROR: ${pkgJson.name} must not have a "main" field. We publish ESM only.`,
        );
        return false;
    }
    return true;
};

const checkNoSource = (pkgJson): boolean => {
    if (pkgJson.source != null) {
        console.error(
            `ERROR: ${pkgJson.name} must not have a top-level "source" field. Declare source files in the "exports" map.`,
        );
        return false;
    }
    return true;
};

const checkType = (pkgJson): boolean => checkField(pkgJson, "type", "module");

/**
 * Verify that no export sub-path offers a CJS build.
 *
 * A `require` condition would hand a CJS consumer something we no longer
 * build. Without one, `require()` fails at resolution time instead.
 */
const checkNoRequireCondition = (pkgJson): boolean =>
    Object.entries(pkgJson.exports ?? {})
        .map(([subPath, conditions]) => {
            if (
                typeof conditions === "object" &&
                conditions !== null &&
                "require" in conditions
            ) {
                console.error(
                    `ERROR: ${pkgJson.name} must not declare a "require" condition for the "${subPath}" export.`,
                );
                return false;
            }
            return true;
        })
        .every(Boolean);

const checkPrivate = (pkgJson): boolean => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return true;
    }
    return false;
};

/**
 * Verify a package declares the ESM-only entry point shape.
 */
const checkEntrypoints = (pkgJson): boolean =>
    [
        checkType(pkgJson),
        checkNoMain(pkgJson),
        checkNoSource(pkgJson),
        checkNoRequireCondition(pkgJson),
    ].every(Boolean);

const checkExports = (pkgJson): boolean => {
    if (!pkgJson.exports || !pkgJson.exports["."]) {
        console.error(
            `ERROR: ${pkgJson.name} must have an "exports" map with a "." entry.`,
        );
        return false;
    }

    return Object.entries(pkgJson.exports)
        .map(([subPath, target]) => {
            if (typeof target === "string") {
                if (subPath !== "." && target.startsWith("./dist/")) {
                    return true;
                }
                console.error(
                    `ERROR: ${pkgJson.name} export "${subPath}" must declare source, types, and default conditions.`,
                );
                return false;
            }

            if (typeof target !== "object" || target === null) {
                console.error(
                    `ERROR: ${pkgJson.name} export "${subPath}" has an invalid target.`,
                );
                return false;
            }

            if (!("source" in target) || typeof target.source !== "string") {
                console.error(
                    `ERROR: ${pkgJson.name} export "${subPath}" must declare a source condition.`,
                );
                return false;
            }

            const conditions = Object.keys(target);
            if (subPath !== "." && conditions.length === 1) {
                return true;
            }

            if (!("default" in target)) {
                console.error(
                    `ERROR: ${pkgJson.name} export "${subPath}" must declare a default condition.`,
                );
                return false;
            }

            const entryName =
                subPath === "." ? "index" : subPath.replace(/^\.\//, "");
            if (
                conditions.length !== 2 ||
                !conditions.every((condition) =>
                    ["source", "default"].includes(condition),
                ) ||
                target.default !== `./dist/${entryName}.js`
            ) {
                console.error(
                    `ERROR: ${pkgJson.name} export "${subPath}" must declare source and default conditions with matching dist paths.`,
                );
                return false;
            }
            return true;
        })
        .every(Boolean);
};

export {checkPublishConfig, checkEntrypoints, checkExports, checkPrivate};
