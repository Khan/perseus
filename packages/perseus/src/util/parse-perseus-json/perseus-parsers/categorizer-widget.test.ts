import {
    CategorizerWidget,
    PerseusLinterContext
} from "@khanacademy/perseus-core";
import {parseCategorizerWidget} from "./categorizer-widget";
import {success} from "../result";
import {parse} from "../parse";

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
        }
    }

    it("allows `values` to be undefined", () => {
        const widget = {
            ...baseWidget,
            options: {
                ...baseWidget.options,
                values: undefined,
            },
        };
        const result = parse(widget, parseCategorizerWidget);
        expect(result).toEqual(success(widget))
    });
})
