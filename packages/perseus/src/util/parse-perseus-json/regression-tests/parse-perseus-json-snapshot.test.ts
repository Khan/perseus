import * as fs from "fs";
import {join} from "path";

import {parseAndMigratePerseusItem} from "../index";
import {assertSuccess} from "../result";

const dataFiles = fs.readdirSync(join(__dirname, "data"));

// If you change the parsers to migrate/convert data to a new format, you may
// have to regenerate these snapshots. That's expected and okay!

describe("parseAndTypecheckPerseusItem", () => {
    it.each(dataFiles)("correctly parses data/%s", (filename) => {
        const json = fs.readFileSync(
            join(__dirname, "data", filename),
            "utf-8",
        );
        const result = parseAndMigratePerseusItem(json);
        assertSuccess(result);
        expect(result.value).toMatchSnapshot();
    });
});
