import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePerseusAnswerArea} from "./perseus-answer-area";

import type {PerseusAnswerArea} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PerseusAnswerArea parser", () => {
    it("should return the type defined in data-schema.ts", () => {
        expect(parsePerseusAnswerArea({}, ctx())).type.toBe<
            ParseResult<PerseusAnswerArea>
        >();
    });
});
