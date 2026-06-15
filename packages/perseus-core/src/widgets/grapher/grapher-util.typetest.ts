import {describe, it, expect} from "tstyche";

import type {GrapherPublicWidgetOptions} from "./grapher-util";
import type {PerseusGrapherWidgetOptions} from "../../data-schema";

describe("GrapherPublicWidgetOptions", () => {
    it("is assignable to PerseusGrapherWidgetOptions", () => {
        expect<GrapherPublicWidgetOptions>().type.toBeAssignableTo<PerseusGrapherWidgetOptions>();
    });
});
