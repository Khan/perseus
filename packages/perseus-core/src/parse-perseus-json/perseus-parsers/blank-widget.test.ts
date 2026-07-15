import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseBlankWidget} from "./blank-widget";

// eslint-disable-next-line import/no-restricted-paths
import type {BlankWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the BlankWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseBlankWidget({}, ctx())).type.toBe<
            ParseResult<BlankWidget>
        >();
    });
});
