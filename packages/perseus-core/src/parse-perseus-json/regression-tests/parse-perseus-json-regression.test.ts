import * as fs from "fs";
import {join} from "path";

import {parseAndMigratePerseusItem} from "../index";

const dataFiles = fs.readdirSync(join(__dirname, "data"));

describe("parseAndTypecheckPerseusItem", () => {
    it.each(dataFiles)("accepts data/%s", (filename) => {
        const json = fs.readFileSync(
            join(__dirname, "data", filename),
            "utf-8",
        );
        const result = parseAndMigratePerseusItem(json);

        // This strange-looking assertion style results in the failure message
        // being printed if parsing fails, so the test is easier to debug.
        expect(result).toEqual(expect.objectContaining({type: "success"}));
    });
});
