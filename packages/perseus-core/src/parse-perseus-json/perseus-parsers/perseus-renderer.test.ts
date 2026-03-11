import {ctx} from "../general-purpose-parsers/test-helpers";
import {assertSuccess} from "../result";

import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusRenderer} from "../../data-schema";

describe("parsePerseusRenderer", () => {
    it("removes an orphaned widget", () => {
        const renderer: PerseusRenderer = {
            content: "",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [
                            {
                                id: "1",
                                content: "A",
                            },
                        ],
                    },
                },
            },
        };

        const result = parsePerseusRenderer(renderer, ctx());
        assertSuccess(result);

        // Assert: the radio widget is removed because it's not referenced.
        expect(result.value.widgets).toEqual({});
    });

    it("keeps widgets that are referenced in the `content`", () => {
        const renderer: PerseusRenderer = {
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    version: {major: 3, minor: 0},
                    options: {
                        choices: [
                            {
                                id: "1",
                                content: "A",
                            },
                        ],
                    },
                },
            },
        };

        const result = parsePerseusRenderer(renderer, ctx());
        assertSuccess(result);

        expect(result.value.widgets).toHaveProperty("radio 1");
    });
});
