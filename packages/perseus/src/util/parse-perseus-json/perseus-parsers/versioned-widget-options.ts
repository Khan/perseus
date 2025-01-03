import {isSuccess, success} from "../result";

import type {Version} from "../../../perseus-types";
import type {ParseContext, Parser} from "../parser-types";

type Versioned = {
    version?: Version;
};

/**
 * Creates a parser for a widget options type with multiple major versions. Old
 * versions are migrated to the latest version. The parse fails if the input
 * data does not match any of the versions.
 *
 * @example
 * const parseOptions = versionedWidgetOptions(parseOptionsV3)
 *     .withMigrationFrom(parseOptionsV2, migrateV2ToV3)
 *     .withMigrationFrom(parseOptionsV1, migrateV1ToV2)
 *     .withMigrationFrom(parseOptionsV0, migrateV0ToV1)
 *     .parser;
 *
 * @param parseLatest a {@link Parser} for the latest version of the widget
 * options. This should check version.major and fail if it's not the latest
 * version.
 * @returns a builder object, to which migrations from earlier versions can be
 * added. Migrations must be added in "reverse chronological" order as in the
 * example above.
 */
export function versionedWidgetOptions<Latest extends Versioned>(
    parseLatest: Parser<Latest>,
): VersionedWidgetOptionsParserBuilder<Latest, Latest> {
    return new VersionedWidgetOptionsParserBuilder(
        parseLatest,
        (latest) => latest,
    );
}

class VersionedWidgetOptionsParserBuilder<
    Latest extends Versioned,
    Migratable extends Versioned,
> {
    constructor(
        public parser: Parser<Latest>,
        private migrate: (m: Migratable) => Latest,
    ) {}

    /**
     * Add a migration from an old version of the widget options.
     *
     * @returns a VersionedWidgetOptionsParserBuilder whose `parser` function
     * is capable of migrating the old version to the latest version. The parser
     * will always return the latest version of the widget options on a
     * successful parse.
     * @param parseOldVersion should be a {@link Parser} for the old options
     * type. It should fail if version.major isn't correct.
     * @param migrateToNextVersion should migrate the `Old` data to the
     * `Migratable` version of the current VersionedWidgetOptionsParserBuilder.
     * Usually, this means migrating to the next major version.
     */
    withMigrationFrom<Old extends Versioned>(
        parseOldVersion: Parser<Old>,
        migrateToNextVersion: (old: Old) => Migratable,
    ): VersionedWidgetOptionsParserBuilder<Latest, Old> {
        const parseLatestVersion = this.parser;

        const migrateToLatest = (old: Old) =>
            this.migrate(migrateToNextVersion(old));

        return new VersionedWidgetOptionsParserBuilder(
            (raw: unknown, ctx: ParseContext) => {
                const resultOfParsingLatest = parseLatestVersion(raw, ctx);
                if (isSuccess(resultOfParsingLatest)) {
                    return resultOfParsingLatest;
                }

                const resultOfParsingOld = parseOldVersion(raw, ctx);
                if (isSuccess(resultOfParsingOld)) {
                    return success(migrateToLatest(resultOfParsingOld.value));
                }

                // If we're here, neither parse succeeded. Return the failure.
                return resultOfParsingOld;
            },
            migrateToLatest,
        );
    }
}
