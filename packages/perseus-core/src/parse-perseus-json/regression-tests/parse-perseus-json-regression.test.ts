import * as fs from "fs";
import {join} from "path";

import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {
    parseAndMigratePerseusArticle,
    parseAndMigratePerseusItem,
} from "../index";
import {assertSuccess, mapFailure} from "../result";

const itemDataDir = join(__dirname, "item-data");
const itemDataFiles = fs.readdirSync(itemDataDir);

const articleDataDir = join(__dirname, "article-data");
const articleDataFiles = fs.readdirSync(articleDataDir);

describe("parseAndMigratePerseusItem", () => {
    describe.each(itemDataFiles)("given %s", (filename) => {
        const json = fs.readFileSync(join(itemDataDir, filename), "utf-8");
        const result = parseAndMigratePerseusItem(json);

        it("parses successfully", () => {
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const result = mapFailure(getMessage)(
                parseAndMigratePerseusItem(json),
            );

            expect(result).toEqual(anySuccess);
        });

        it("returns the same result as before", () => {
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });
    });
});

describe("parseAndMigratePerseusArticle", () => {
    describe.each(articleDataFiles)("given %s", (filename) => {
        const json = fs.readFileSync(join(articleDataDir, filename), "utf-8");
        const result = parseAndMigratePerseusArticle(json);

        it("parses successfully", () => {
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const result = mapFailure(getMessage)(
                parseAndMigratePerseusArticle(json),
            );

            expect(result).toEqual(anySuccess);
        });

        it("returns the same result as before", () => {
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });
    });
});

function getMessage(obj: {message: string}): string {
    return obj.message;
}
