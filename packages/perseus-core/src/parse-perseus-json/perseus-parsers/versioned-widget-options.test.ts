import {
    array,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {parse} from "../parse";
import {failure, success} from "../result";

import {versionedWidgetOptions} from "./versioned-widget-options";

import type {Parser} from "../parser-types";

describe("versionedWidgetOptions parser", () => {
    type OptionsV0 = {
        type: "test-widget";
        version: {major: 0; minor: number};
        answer: string;
    };

    type OptionsV1 = {
        type: "test-widget";
        version: {major: 1; minor: number};
        answers: string[];
    };

    type OptionsV2 = {
        type: "test-widget";
        version: {major: 2; minor: number};
        correctAnswers: string[];
    };

    const parseOptionsV0: Parser<OptionsV0> = object({
        type: constant("test-widget"),
        version: defaulted(
            object({major: constant(0), minor: number}),
            () => ({major: 0, minor: 0}) as const,
        ),
        answer: string,
    });

    const parseOptionsV1: Parser<OptionsV1> = object({
        type: constant("test-widget"),
        version: object({major: constant(1), minor: number}),
        answers: array(string),
    });

    const parseOptionsV2: Parser<OptionsV2> = object({
        type: constant("test-widget"),
        version: object({major: constant(2), minor: number}),
        correctAnswers: array(string),
    });

    function migrateV0ToV1(v0: OptionsV0): OptionsV1 {
        return {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: [v0.answer],
        };
    }

    function migrateV1ToV2(v1: OptionsV1): OptionsV2 {
        return {
            type: "test-widget",
            version: {major: 2, minor: 0},
            correctAnswers: v1.answers,
        };
    }

    it("parses the latest version of the data, when that is the only version", () => {
        const parser = versionedWidgetOptions(1, parseOptionsV1).parser;

        const validData = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: ["ok"],
        };

        expect(parse(validData, parser)).toEqual(success(validData));
    });

    it("parses the latest version of the data, when there is an earlier version", () => {
        const parser = versionedWidgetOptions(
            1,
            parseOptionsV1,
        ).withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const validData = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: ["ok"],
        };

        expect(parse(validData, parser)).toEqual(success(validData));
    });

    it("migrates an old version of the data to the latest version", () => {
        const parser = versionedWidgetOptions(
            1,
            parseOptionsV1,
        ).withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const oldData = {
            type: "test-widget",
            version: {major: 0, minor: 0},
            answer: "ok",
        };

        expect(parse(oldData, parser)).toEqual(
            success({
                type: "test-widget",
                version: {major: 1, minor: 0},
                answers: ["ok"],
            }),
        );
    });

    it("migrates through intermediate versions", () => {
        const parser = versionedWidgetOptions(2, parseOptionsV2)
            .withMigrationFrom(1, parseOptionsV1, migrateV1ToV2)
            .withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const oldData = {
            type: "test-widget",
            version: {major: 0, minor: 0},
            answer: "ok",
        };

        expect(parse(oldData, parser)).toEqual(
            success({
                type: "test-widget",
                version: {major: 2, minor: 0},
                correctAnswers: ["ok"],
            }),
        );
    });

    it("migrates an intermediate version to the latest", () => {
        const parser = versionedWidgetOptions(2, parseOptionsV2)
            .withMigrationFrom(1, parseOptionsV1, migrateV1ToV2)
            .withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const oldData = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: ["ok"],
        };

        expect(parse(oldData, parser)).toEqual(
            success({
                type: "test-widget",
                version: {major: 2, minor: 0},
                correctAnswers: ["ok"],
            }),
        );
    });

    it("fails to parse invalid data", () => {
        const parser = versionedWidgetOptions(
            1,
            parseOptionsV1,
        ).withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const invalidData = {
            type: "test-widget",
            // version.major is invalid
            version: {major: 99, minor: 0},
            answer: "ok",
        };

        expect(parse(invalidData, parser)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root) -- expected widget options with a known version number",
                ),
            ),
        );
    });

    it("fails with an error message appropriate to the data version", () => {
        // This test ensures that we treat the version number in the data as the
        // source of truth when choosing a schema to use for parsing.
        //
        // Previously, we'd try all parsing with all the versions of the schema
        // and report the failure message for the oldest one, which was
        // confusing.

        const parser = versionedWidgetOptions(
            1,
            parseOptionsV1,
        ).withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const invalidV1Data = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answer: "ok",
        };

        expect(parse(invalidV1Data, parser)).toEqual(
            failure("At (root).answers -- expected array, but got undefined"),
        );
    });

    it("treats a missing version as major: 0", () => {
        const parser = versionedWidgetOptions(
            1,
            parseOptionsV1,
        ).withMigrationFrom(0, parseOptionsV0, migrateV0ToV1).parser;

        const v0Data = {
            type: "test-widget",
            answer: "ok",
        };

        expect(parse(v0Data, parser)).toEqual(
            success({
                type: "test-widget",
                answers: ["ok"],
                version: {major: 1, minor: 0},
            }),
        );
    });
});
