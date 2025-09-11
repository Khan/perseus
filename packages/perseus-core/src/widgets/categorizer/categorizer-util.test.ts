import getCategorizerPublicWidgetOptions from "./categorizer-util";

import type {PerseusCategorizerWidgetOptions} from "../../data-schema";

describe("getCategorizerPublicWidgetOptions", () => {
    it("returns an object without the answer data", () => {
        const categorizerTestWidgetOptions: PerseusCategorizerWidgetOptions = {
            values: [0, 1],
            items: ["apples", "oranges"],
            categories: ["citrus", "non-citrus"],
            randomizeItems: true,
            static: false,
            highlightLint: false,
        };

        const publicWidgetOptions = getCategorizerPublicWidgetOptions(
            categorizerTestWidgetOptions,
        );

        expect(publicWidgetOptions).toEqual({
            items: ["apples", "oranges"],
            categories: ["citrus", "non-citrus"],
            randomizeItems: true,
            static: false,
        });
    });
});
