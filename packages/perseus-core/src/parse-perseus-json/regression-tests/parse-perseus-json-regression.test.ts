import * as fs from "fs";
import {join} from "path";

import splitPerseusItem from "../../utils/split-perseus-item";
import {registerCoreWidgets} from "../../widgets/core-widget-registry";
import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {
    parseAndMigratePerseusArticle,
    parseAndMigratePerseusItem,
    parseAndMigrateUserInputMap,
} from "../index";
import {parse} from "../parse";
import {parsePerseusArticle} from "../perseus-parsers/perseus-article";
import {parsePerseusItem} from "../perseus-parsers/perseus-item";
import {parseUserInputMap} from "../perseus-parsers/user-input-map";
import {assertSuccess, mapFailure} from "../result";

const itemDataDir = join(__dirname, "item-data");
const itemDataFiles = fs.readdirSync(itemDataDir);

const articleDataDir = join(__dirname, "article-data");
const articleDataFiles = fs.readdirSync(articleDataDir);

const userInputDataDir = join(__dirname, "user-input-data");
const userInputDataFiles = fs.readdirSync(userInputDataDir);

describe("parseAndMigratePerseusItem", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    describe.each(itemDataFiles)("given %s", (filename) => {
        const json = fs.readFileSync(join(itemDataDir, filename), "utf-8");
        const result = parseAndMigratePerseusItem(json);

        it("parses successfully", () => {
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
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

        test("answerless data is not changed by a second pass through the parser", () => {
            assertSuccess(result);

            const answerlessItem = splitPerseusItem(result.value);
            const answerlessParseResult1 = parse(
                answerlessItem,
                parsePerseusItem,
            );
            assertSuccess(answerlessParseResult1);

            const answerlessParseResult2 = parse(
                answerlessParseResult1.value,
                parsePerseusItem,
            );
            expect(answerlessParseResult2).toEqual(anySuccess);
            // Narrow the type. This assertion should always pass due to the
            // expectation above.
            assertSuccess(answerlessParseResult2);

            expect(answerlessParseResult2.value).toEqual(
                answerlessParseResult1.value,
            );
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
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
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

describe("parseAndMigrateUserInputMap", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    describe.each(userInputDataFiles)("given the data from %s", (filename) => {
        async function getParseResult() {
            const {default: data} = await import(
                join(userInputDataDir, filename)
            );
            return parseAndMigrateUserInputMap(data);
        }

        it("parses successfully", async () => {
            const result = await getParseResult();
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const resultWithMessage = mapFailure(getMessage)(result);

            expect(resultWithMessage).toEqual(anySuccess);
        });

        it("returns the same result as before", async () => {
            const result = await getParseResult();
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        });

        it("is not changed by a second pass through the parser", async () => {
            // This test ensures that the parser is idempotent, i.e. running
            // it once is the same as running it many times. This is important
            // because we might parse the input many times, e.g. every time
            // it crosses a service boundary.
            const result = await getParseResult();
            assertSuccess(result);

            const result2 = parse(result.value, parseUserInputMap);

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
