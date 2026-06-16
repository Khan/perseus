import {
    boolean,
    constant,
    nullable,
    number,
    object,
    optional,
    pair,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidget, parseWidgetWithVersion} from "./widget";

import type {ParsedValue} from "../parser-types";

const parseMeasurerWidgetV1 = parseWidgetWithVersion(
    object({major: constant(1), minor: number}),
    constant("measurer"),
    object({
        // The default value for image comes from measurer.tsx.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        image: defaulted(parsePerseusImageBackground, () => ({
            url: null,
            top: 0,
            left: 0,
        })),
        showProtractor: boolean,
        showRuler: boolean,
        rulerLabel: string,
        rulerTicks: number,
        rulerPixels: number,
        rulerLength: number,
        box: pair(number, number),
    }),
);

const parseMeasurerWidgetV0 = parseWidget(
    constant("measurer"),
    object({
        // The default value for image comes from measurer.tsx.
        // See parse-perseus-json/README.md for why we want to duplicate the
        // defaults here.
        imageTop: number,
        imageLeft: number,
        imageUrl: optional(nullable(string)),
        showProtractor: boolean,
        showRuler: boolean,
        rulerLabel: string,
        rulerTicks: number,
        rulerPixels: number,
        rulerLength: number,
        box: pair(number, number),
    }),
);

function migrateV0ToV1(
    v0: ParsedValue<typeof parseMeasurerWidgetV0>,
): ParsedValue<typeof parseMeasurerWidgetV1> {
    const {imageTop, imageLeft, imageUrl, ...v1Options} = v0.options;
    return {
        ...v0,
        version: {major: 1, minor: 0},
        options: {
            image: {
                top: imageTop,
                left: imageLeft,
                url: imageUrl,
            },
            ...v1Options,
        },
    };
}

export const parseMeasurerWidget = versionedWidgetOptions(
    1,
    parseMeasurerWidgetV1,
).withMigrationFrom(0, parseMeasurerWidgetV0, migrateV0ToV1).parser;
