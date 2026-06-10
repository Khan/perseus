import {describe, expect, it} from "tstyche";

import type {
    PerseusInputNumberWidgetOptions,
    PerseusNumericInputWidgetOptions,
} from "./data-schema";

describe("PerseusInputNumberWidgetOptions", () => {
    it("is assignable to PerseusNumericInputWidgetOptions", () => {
        // This test is needed because the PerseusInputNumberWidgetOptions now
        // get passed to the NumericInput component. We are currently (May
        // 2026) removing the deprecated InputNumber code in favor of using
        // NumericInput everywhere, but we need to keep separate types for
        // InputNumber to support legacy content.
        expect<PerseusInputNumberWidgetOptions>().type.toBeAssignableTo<PerseusNumericInputWidgetOptions>();
    });
});
