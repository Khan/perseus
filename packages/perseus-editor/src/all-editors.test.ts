import * as React from "react";

import allEditors from "./all-editors";

describe("All editors", () => {
    it("should export react components with a widgetName property", () => {
        for (const editor of allEditors) {
            expect(
                editor.displayName ||
                    editor.__proto__ === React.Component ||
                    editor.__proto__ === React.PureComponent,
            ).toBeTruthy();
            expect(typeof editor.widgetName === "string").toBeTruthy();
        }
    });
});
