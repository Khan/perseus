function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseRecord(
    value: unknown,
    fieldName: string,
): Record<string, unknown> {
    if (!isRecord(value)) {
        throw new TypeError(`Expected ${fieldName} to be an object.`);
    }

    return value;
}

export function parseString(value: unknown, fieldName: string): string {
    if (typeof value !== "string") {
        throw new TypeError(`Expected ${fieldName} to be a string.`);
    }

    return value;
}

export function parseStringRecord(
    value: unknown,
    fieldName: string,
): Record<string, string> {
    const record = parseRecord(value, fieldName);
    const stringRecord: Record<string, string> = {};

    for (const [key, fieldValue] of Object.entries(record)) {
        stringRecord[key] = parseString(fieldValue, `${fieldName}.${key}`);
    }

    return stringRecord;
}

export function parseBuildPackageMetadata(value: unknown) {
    const packageJson = parseRecord(value, "package.json");

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
    };
}
