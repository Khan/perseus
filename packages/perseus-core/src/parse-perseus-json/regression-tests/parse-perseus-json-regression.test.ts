import * as fs from "fs";
import {join} from "path";

import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {parseAndMigratePerseusItem} from "../index";
import {assertSuccess, mapFailure} from "../result";

const dataFiles = fs.readdirSync(join(__dirname, "item-data"));

describe("parseAndMigratePerseusItem", () => {
    describe.each(dataFiles)("given item-data/%s", (filename) => {
        const json = fs.readFileSync(
            join(__dirname, "item-data", filename),
            "utf-8",
        );
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
