import * as fs from "fs";
import {join} from "path";

import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {parseAndMigratePerseusItem} from "../index";
import {assertSuccess, mapFailure} from "../result";

const itemDataDir = join(__dirname, "item-data");
const dataFiles = fs.readdirSync(itemDataDir);

describe("parseAndMigratePerseusItem", () => {
    describe.each(dataFiles)("given %s", (filename) => {
        const json = fs.readFileSync(join(itemDataDir, filename), "utf-8");
        const result = parseAndMigratePerseusItem(json);

        it("parses successfully", () => {
            // If the parse fails, get just the error message. This makes the test
            // failure easier to read, since otherwise the entire `invalidObject`
            // from the ParseFailureDetail would be printed.
            const result = mapFailure(getMessage)(parseAndMigratePerseusItem(json));

            expect(result).toEqual(anySuccess);
        });

        it("returns the same result as before", () => {
            assertSuccess(result);
            expect(result.value).toMatchSnapshot();
        })
    });
});

function getMessage(obj: {message: string}): string {
    return obj.message;
}
