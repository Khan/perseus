/**
 * Pre-publish utilities to verify that our publish will go smoothly.
 */

const checkPublishConfig = ({name, publishConfig, private: isPrivate}) => {
    // first check if is marked as public and there's access to publish the current package
    if (!publishConfig || (!isPrivate && publishConfig.access !== "public")) {
        const requiredAccessType = isPrivate ? "restricted" : "public";

        console.error(
            `ERROR: ${name} is missing a "publishConfig": {"access": "${requiredAccessType}"} section.`,
        );
        process.exit(1);
    }

    // also check if is marked as private and there's restricted access defined
    if (isPrivate && publishConfig.access !== "restricted") {
        console.error(
            `ERROR: ${name} is marked as private but there is a "publishConfig": {"access": "public"} section already defined. Please change it to "access": "restricted" or remove "private": true to make the package public.`,
        );
        process.exit(1);
    }
};

const checkField = (pkgJson, field, value) => {
    if (Array.isArray(value)) {
        if (!value.includes(pkgJson[field])) {
            console.error(
                `ERROR: ${
                    pkgJson.name
                } must have a "${field}" set to one of ${value
                    .map((value) => JSON.stringify(value))
                    .join(", ")}.`,
            );
            process.exit(1);
        }
    } else {
        if (pkgJson[field] !== value) {
            console.error(
                `ERROR: ${
                    pkgJson.name
                } must have a "${field}" set to ${JSON.stringify(value)}.`,
            );
            process.exit(1);
        }
    }
};

const checkMain = (pkgJson) => checkField(pkgJson, "main", "dist/index.js");

const checkModule = (pkgJson) =>
    checkField(pkgJson, "module", "dist/es/index.js");

const checkSource = (pkgJson) =>
    checkField(pkgJson, "source", ["src/index.js", "src/index.ts"]);

const checkPrivate = (pkgJson) => {
    if (pkgJson.private) {
        console.warn(
            `${pkgJson.name} is private and won't be published to NPM.`,
        );
        return true;
    }
    return false;
};

const checkEntrypoints = (pkgJson) => {
    checkModule(pkgJson);
    checkMain(pkgJson);
};

export {checkPublishConfig, checkEntrypoints, checkSource, checkPrivate};
