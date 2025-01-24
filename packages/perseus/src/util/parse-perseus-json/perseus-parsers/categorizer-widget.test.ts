import {parse} from "../parse";
import {success} from "../result";

import {parseCategorizerWidget} from "./categorizer-widget";

import type {CategorizerWidget} from "@khanacademy/perseus-core";

describe("parseCategorizerWidget", () => {
    const baseWidget: CategorizerWidget = {
        type: "categorizer",
        version: {major: 0, minor: 0},
        graded: true,
        options: {
            items: [],
            categories: [],
            randomizeItems: false,
            static: false,
        },
    };

    it("allows `values` to be undefined", () => {
        const widget = {
            ...baseWidget,
            options: {
                ...baseWidget.options,
                values: undefined,
            },
        };
        const result = parse(widget, parseCategorizerWidget);
        expect(result).toEqual(success(widget));
    });
});
