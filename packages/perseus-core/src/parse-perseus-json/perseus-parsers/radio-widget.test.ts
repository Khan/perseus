import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {failure, success} from "../result";

import {
    migrateV0ToV1,
    migrateV1ToV2,
    migrateV2toV3,
    parseRadioWidget,
} from "./radio-widget";
import {v0Widget, v1Widget, v2Widget, v3Widget} from "./radio-widget.mockData";

describe("parseRadioWidget", () => {
    const LATEST_VERSION = {major: 3, minor: 0};
    const LATEST_OPTIONS = v3Widget;

    describe.each([
        ["v0", v0Widget],
        ["v1", v1Widget],
        ["v2", v2Widget],
        ["v3", v3Widget],
    ])("Radio %s", (_, inputData) => {
        it(`migrates to the latest version, ${LATEST_VERSION.major}.${LATEST_VERSION.minor}`, () => {
            expect(parse(inputData, parseRadioWidget)).toEqual(
                success(LATEST_OPTIONS),
            );
        });
    });

    it("rejects a widget with unrecognized version", () => {
        const widget = {
            type: "radio",
            version: {
                major: -1,
                minor: 0,
            },
            graded: true,
            options: {},
        };

        expect(parse(widget, parseRadioWidget)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root) -- expected widget options with a known version number",
                ),
            ),
        );
    });

    it("allows a null key", () => {
        const widget = {
            type: "radio",
            key: null,
            graded: true,
            version: LATEST_VERSION,
            options: {
                choices: [],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(success(widget));
    });

    it("generates default ID for empty choice ID", () => {
        const widget = {
            type: "radio",
            version: LATEST_VERSION,
            graded: true,
            options: {
                choices: [
                    {
                        content: "Choice with empty ID",
                        id: "", // Empty string should trigger fallback
                    },
                ],
            },
        };

        const result = parse(widget, parseRadioWidget);

        expect(result).toEqual(
            success({
                ...widget,
                options: {
                    ...widget.options,
                    choices: [
                        {
                            content: "Choice with empty ID",
                            id: "radio-choice-0", // Should be generated
                        },
                    ],
                },
            }),
        );
    });

    it("accepts `null` for a choice's widgets map in version 0", () => {
        const widget = {
            type: "radio",
            version: {major: 0, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });

    it("accepts `null` for a choice's widgets map in version 1", () => {
        const widget = {
            type: "radio",
            version: {major: 1, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });

    it("accepts `null` for a choice's widgets map in version 2", () => {
        const widget = {
            type: "radio",
            version: {major: 2, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });

});

describe("migration functions", () => {
    it("migrates v0 to v1", () => {
        expect(migrateV0ToV1(v0Widget)).toEqual(v1Widget);
    });

    it("migrates v1 to v2", () => {
        expect(migrateV1ToV2(v1Widget)).toEqual(v2Widget);
    });

    it("migrates v2 to v3", () => {
        expect(migrateV2toV3(v2Widget)).toEqual(v3Widget);
    });
});
