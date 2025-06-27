import * as fs from "fs";
import {join} from "path";

import splitPerseusItem from "../../utils/split-perseus-item";
import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {
    parseAndMigratePerseusArticle,
    parseAndMigratePerseusItem,
} from "../index";
import {parse} from "../parse";
import {parsePerseusArticle} from "../perseus-parsers/perseus-article";
import {parsePerseusItem} from "../perseus-parsers/perseus-item";
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

        it("is not changed by a second pass through the parser", () => {
            // This test ensures that the parser is idempotent, i.e. running it
            // once is the same as running it many times. Idempotency is
            // valuable because it means e.g. that if we run the parser on data
            // before saving it to datastore, it won't be changed by being
            // parsed again on read.
            assertSuccess(result);

            const result2 = parse(result.value, parsePerseusItem);

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });

        it("parses the data with answer information removed", () => {
            assertSuccess(result);
            const answerlessItem = splitPerseusItem(result.value);
            expect(parse(answerlessItem, parsePerseusItem)).toEqual(anySuccess);
        });

        it("returns the same result as before with answer information removed", () => {
            assertSuccess(result);
            const answerlessItem = splitPerseusItem(result.value);
            const answerlessParseResult = parse(
                answerlessItem,
                parsePerseusItem,
            );
            assertSuccess(answerlessParseResult);
            expect(answerlessParseResult.value).toMatchSnapshot();
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

        it("is not changed by a second pass through the parser", () => {
            // This test ensures that the parser is idempotent, i.e. running it
            // once is the same as running it many times. Idempotency is
            // valuable because it means e.g. that if we run the parser on data
            // before saving it to datastore, it won't be changed by being
            // parsed again on read.
            assertSuccess(result);

            const result2 = parse(result.value, parsePerseusArticle);

            expect(result2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(result2);
            expect(result2.value).toEqual(result.value);
        });
    });
});

function getMessage(obj: {message: string}): string {
    return obj.message;
}
