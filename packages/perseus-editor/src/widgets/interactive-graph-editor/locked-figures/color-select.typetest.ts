import {describe, it, expect} from "tstyche";

import type {colorOptions} from "./color-select";
import type {LockedFigureColor} from "@khanacademy/perseus-core";

describe("ColorSelect", () => {
    it("supports exactly the colors defined in data-schema.ts", () => {
        expect<keyof typeof colorOptions>().type.toBe<LockedFigureColor>();
    });
});
