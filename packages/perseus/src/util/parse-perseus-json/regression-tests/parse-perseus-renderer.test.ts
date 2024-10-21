import * as fs from "fs/promises";

import * as glob from "fast-glob";

import {parsePerseusItem} from "..";
import {success} from "../result";

describe("parsePerseusItem", () => {
    glob.sync("data/items-by-shape/00/**/*.json").forEach((file) => {
        test(file, async () => {
            const item = await fs.readFile(file, "utf-8");
            expect(parsePerseusItem(item)).toEqual(success(expect.anything()));
        });
    });
});
