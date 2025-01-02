import {
    array,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";
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

    const parseOptionsV0: Parser<OptionsV0> = object({
        type: constant("test-widget"),
        version: object({major: constant(0), minor: number}),
        answer: string,
    });

    const parseOptionsV1: Parser<OptionsV1> = object({
        type: constant("test-widget"),
        version: object({major: constant(1), minor: number}),
        answers: array(string),
    });

    function migrateV0ToV1(v0: OptionsV0): OptionsV1 {
        return {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: [v0.answer],
        };
    }

    it("parses the latest version of the data, when that is the only version", () => {
        const parser = versionedWidgetOptions(parseOptionsV1).parser;

        const validData = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: ["ok"],
        };

        expect(parse(validData, parser)).toEqual(success(validData));
    });

    it("parses the latest version of the data, when there is an earlier version", () => {
        const parser = versionedWidgetOptions(parseOptionsV1).withMigrationFrom(
            parseOptionsV0,
            migrateV0ToV1,
        ).parser;

        const validData = {
            type: "test-widget",
            version: {major: 1, minor: 0},
            answers: ["ok"],
        };

        expect(parse(validData, parser)).toEqual(success(validData));
    });

    it("migrates old versions of the data to the latest version", () => {
        const parser = versionedWidgetOptions(parseOptionsV1).withMigrationFrom(
            parseOptionsV0,
            migrateV0ToV1,
        ).parser;

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

    it("fails to parse invalid data", () => {
        const parser = versionedWidgetOptions(parseOptionsV1).withMigrationFrom(
            parseOptionsV0,
            migrateV0ToV1,
        ).parser;

        const invalidData = {
            type: "test-widget",
            // version.major is invalid
            version: {major: 99, minor: 0},
            answer: "ok",
        };

        expect(parse(invalidData, parser)).toEqual(
            failure("At (root).version.major -- expected 0, but got 99"),
        );
    });
});
