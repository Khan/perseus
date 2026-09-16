/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */
import fs from "fs";
import path from "path";

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

const checkSource = (pkgJson): boolean =>
    checkField(pkgJson, "source", ["src/index.js", "src/index.ts"]);

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
        checkNoRequireCondition(pkgJson),
    ].every(Boolean);

const checkExports = (pkgJson): boolean => {
    if (!pkgJson.exports || !pkgJson.exports["."]) {
        console.error(
            `ERROR: ${pkgJson.name} must have an "exports" map with a "." entry.`,
        );
        return false;
    }
    return true;
};

/**
 * A package.json `exports` map: sub-path to either a file or a set of
 * condition/file pairs.
 */
type ExportsMap = Record<string, string | Record<string, string>>;

/**
 * Every file an `exports` map promises to a consumer, as package-relative
 * paths. The `source` condition is left out: it points into `src/` and is
 * only read by our own tooling.
 */
const exportTargets = (exportsMap: ExportsMap | undefined): Array<string> =>
    Object.values(exportsMap ?? {}).flatMap((target) =>
        typeof target === "string"
            ? [target]
            : Object.entries(target)
                  .filter(([condition]) => condition !== "source")
                  .map(([, file]) => file),
    );

/**
 * Verify that every file an `exports` map points at exists.
 *
 * Assumes the package has already been built: `dist/` must hold the files the
 * map declares.
 */
const checkExportTargets = (pkgJson, pkgDir: string): boolean =>
    exportTargets(pkgJson.exports)
        .map((target) => {
            if (fs.existsSync(path.resolve(pkgDir, target))) {
                return true;
            }
            console.error(
                `ERROR: ${pkgJson.name} exports "${target}", which does not exist. Did the build run?`,
            );
            return false;
        })
        .every(Boolean);

export {
    checkPublishConfig,
    checkEntrypoints,
    checkExports,
    checkExportTargets,
    checkSource,
    checkPrivate,
};
