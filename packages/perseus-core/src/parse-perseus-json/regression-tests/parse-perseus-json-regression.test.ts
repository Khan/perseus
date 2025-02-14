import * as fs from "fs";
import {join} from "path";

import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {parseAndMigratePerseusItem} from "../index";
import {mapFailure} from "../result";

const dataFiles = fs.readdirSync(join(__dirname, "item-data"));

describe("parseAndMigratePerseusItem", () => {
    it.each(dataFiles)("accepts data/%s", (filename) => {
        const json = fs.readFileSync(
            join(__dirname, "item-data", filename),
            "utf-8",
        );

        // If the parse fails, get just the error message. This makes the test
        // failure easier to read, since otherwise the entire `invalidObject`
        // from the ParseFailureDetail would be printed.
        const result = mapFailure(getMessage)(parseAndMigratePerseusItem(json));

        expect(result).toEqual(anySuccess);
    });
});

function getMessage(obj: {message: string}): string {
    return obj.message;
}
