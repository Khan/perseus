import {describe, it, expect} from "tstyche";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";
import type {GrapherPublicWidgetOptions} from "./grapher-util";

describe("GrapherPublicWidgetOptions", () => {
    it("is assignable to PerseusGrapherWidgetOptions", () => {
        expect<GrapherPublicWidgetOptions>().type.toBeAssignableTo<PerseusGrapherWidgetOptions>();
    });
});
