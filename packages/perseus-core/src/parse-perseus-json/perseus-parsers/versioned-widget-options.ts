import {
    isPlainObject,
    number,
    object,
    pipeParsers,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {isFailure} from "../result";

import type {Version} from "../../data-schema";
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
 * const parseOptions = versionedWidgetOptions(3, parseOptionsV3)
 *     .withMigrationFrom(2, parseOptionsV2, migrateV2ToV3)
 *     .withMigrationFrom(1, parseOptionsV1, migrateV1ToV2)
 *     .withMigrationFrom(0, parseOptionsV0, migrateV0ToV1)
 *     .parser;
 *
 * @param latestMajorVersion the latest major version of the widget options.
 * @param parseLatest a {@link Parser} for the latest version of the widget
 * options.
 * @returns a builder object, to which migrations from earlier versions can be
 * added. Migrations must be added in "reverse chronological" order as in the
 * example above.
 */
export function versionedWidgetOptions<Latest extends Versioned>(
    latestMajorVersion: number,
    parseLatest: Parser<Latest>,
): VersionedWidgetOptionsParserBuilder<Latest, Latest> {
    return new VersionedWidgetOptionsParserBuilder(
        latestMajorVersion,
        parseLatest,
        (latest) => latest,
        (raw, ctx) =>
            ctx.failure("widget options with a known version number", raw),
    );
}

class VersionedWidgetOptionsParserBuilder<
    // The latest version of the widget options
    Latest extends Versioned,
    // A version of the widget options which we want to migrate to Latest.
    MigratableWidgetOptions extends Versioned,
> {
    public parser: Parser<Latest>;

    constructor(
        majorVersion: number,
        parseThisVersion: Parser<MigratableWidgetOptions>,
        private migrateToLatest: (
            m: MigratableWidgetOptions,
            ctx: ParseContext,
        ) => Latest,
        private parseOtherVersions: Parser<Latest>,
    ) {
        const parseThisVersionAndMigrateToLatest = pipeParsers(
            parseThisVersion,
        ).then(convert(this.migrateToLatest)).parser;

        this.parser = (raw: unknown, ctx: ParseContext) => {
            if (!isPlainObject(raw)) {
                return ctx.failure("object", raw);
            }

            const versionParseResult = parseVersionedObject(raw, ctx);
            if (isFailure(versionParseResult)) {
                return versionParseResult;
            }

            if (versionParseResult.value.version.major !== majorVersion) {
                return this.parseOtherVersions(raw, ctx);
            }

            return parseThisVersionAndMigrateToLatest(raw, ctx);
        };
    }

    /**
     * Add a migration from an old version of the widget options.
     */
    withMigrationFrom<Old extends Versioned>(
        majorVersion: number,
        parseOldVersion: Parser<Old>,
        migrateToNextVersion: (
            old: Old,
            ctx: ParseContext,
        ) => MigratableWidgetOptions,
    ): VersionedWidgetOptionsParserBuilder<Latest, Old> {
        const parseOtherVersions = this.parser;

        const migrateToLatest = (old: Old, ctx: ParseContext) =>
            this.migrateToLatest(migrateToNextVersion(old, ctx), ctx);

        return new VersionedWidgetOptionsParserBuilder(
            majorVersion,
            parseOldVersion,
            migrateToLatest,
            parseOtherVersions,
        );
    }
}

const parseVersionedObject = object({
    version: defaulted(object({major: number, minor: number}), () => ({
        major: 0,
        minor: 0,
    })),
});
