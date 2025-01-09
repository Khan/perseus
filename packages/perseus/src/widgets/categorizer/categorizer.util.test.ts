import getCategorizerPublicOptions from "./categorizer.util";

import type {PerseusCategorizerWidgetOptions} from "../../perseus-types";

describe("getCategorizerPublicOptions", () => {
    it("returns an object without the answer data", () => {
        const categorizerTestWidgetOptions: PerseusCategorizerWidgetOptions = {
            values: [0, 1],
            items: ["apples", "oranges"],
            categories: ["citrus", "non-citrus"],
            randomizeItems: true,
            static: false,
            highlightLint: false,
            linterContext: {
                contentType: "type",
                paths: ["paths"],
                stack: ["stack"],
            },
        };

        const publicOptions = getCategorizerPublicOptions(
            categorizerTestWidgetOptions,
        );

        expect(publicOptions).toEqual({
            items: ["apples", "oranges"],
            categories: ["citrus", "non-citrus"],
            randomizeItems: true,
            static: false,
        });
    });
});
