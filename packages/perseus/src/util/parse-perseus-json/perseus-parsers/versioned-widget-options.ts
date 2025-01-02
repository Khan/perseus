import {isSuccess, success} from "../result";

import type {Version} from "../../../perseus-types";
import type {ParseContext, Parser} from "../parser-types";

type Versioned = {
    version: Version;
};

export function versionedWidgetOptions<Latest extends Versioned>(
    parseLatest: Parser<Latest>,
): VersionedWidgetOptionsParserBuilder<Latest> {
    return new VersionedWidgetOptionsParserBuilder(parseLatest);
}

class VersionedWidgetOptionsParserBuilder<Latest extends Versioned> {
    constructor(public parser: Parser<Latest>) {}

    withMigrationFrom<Old extends Versioned>(
        parseOldVersion: Parser<Old>,
        migrateToLatestVersion: (old: Old) => Latest,
    ): VersionedWidgetOptionsParserBuilder<Latest> {
        const parseLatestVersion = this.parser;

        return new VersionedWidgetOptionsParserBuilder(
            (raw: unknown, ctx: ParseContext) => {
                const latestVersionParseResult = parseLatestVersion(raw, ctx);
                if (isSuccess(latestVersionParseResult)) {
                    return latestVersionParseResult;
                }

                const oldVersionParseResult = parseOldVersion(raw, ctx);
                if (isSuccess(oldVersionParseResult)) {
                    return success(
                        migrateToLatestVersion(oldVersionParseResult.value),
                    );
                }

                return oldVersionParseResult;
            },
        );
    }
}
