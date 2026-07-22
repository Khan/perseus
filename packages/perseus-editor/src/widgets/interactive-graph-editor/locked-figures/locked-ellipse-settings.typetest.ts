import {describe, it, expect} from "tstyche";

import type {fillStyleOptions} from "./locked-ellipse-settings";
import type {LockedFigureFillType} from "@khanacademy/perseus-core";

describe("LockedEllipseSettings", () => {
    it("supports exactly the fill options defined in data-schema.ts", () => {
        expect<
            keyof typeof fillStyleOptions
        >().type.toBe<LockedFigureFillType>();
    });
});
