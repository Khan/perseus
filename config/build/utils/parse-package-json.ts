import type {PackageJson} from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseRecord(
    value: unknown,
    fieldName: string,
): Record<string, unknown> {
    if (!isRecord(value)) {
        throw new TypeError(`Expected ${fieldName} to be an object.`);
    }

    return value;
}

function parseString(value: unknown, fieldName: string): string {
    if (typeof value !== "string") {
        throw new TypeError(`Expected ${fieldName} to be a string.`);
    }

    return value;
}

function parseStringRecord(
    value: unknown,
    fieldName: string,
): Record<string, string> {
    const record = parseRecord(value, fieldName);
    const stringRecord: Record<string, string> = {};

    for (const [key, fieldValue] of Object.entries(record)) {
        stringRecord[key] = parseString(
            fieldValue,
            `${fieldName}[${JSON.stringify(key)}]`,
        );
    }

    return stringRecord;
}

/**
 * Validates the parts of a package's `package.json` that the build reads.
 *
 * `dependencies` and `peerDependencies` default to `{}` when missing. Every
 * other field is required.
 *
 * @param value The parsed contents of `package.json`.
 * @throws TypeError naming the first field that is missing or has the wrong
 * type.
 */
export function parsePackageJson(value: unknown): PackageJson {
    const packageJson = parseRecord(value, "package.json");
    const publishConfig = parseRecord(
        packageJson.publishConfig,
        "package.json.publishConfig",
    );

    return {
        dependencies: parseStringRecord(
            packageJson.dependencies ?? {},
            "package.json.dependencies",
        ),
        peerDependencies: parseStringRecord(
            packageJson.peerDependencies ?? {},
            "package.json.peerDependencies",
        ),
        version: parseString(packageJson.version, "package.json.version"),
        exports: parseStringRecord(packageJson.exports, "package.json.exports"),
        publishedExports: parseStringRecord(
            publishConfig.exports,
            "package.json.publishConfig.exports",
        ),
    };
}
