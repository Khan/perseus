import {describe, expect, it} from "@jest/globals";

import {filterInaccessibleContent} from "./accessibility";

describe("filterInaccessibleContent", () => {
    it("should filter", () => {
        expect(filterInaccessibleContent([])).toStrictEqual([]);
    });
});
