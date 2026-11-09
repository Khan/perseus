import {makeScopedClassName} from "./make-scoped-class-name";

describe("makeScopedClassName", () => {
    it("returns the class name unchanged for a global stylesheet", () => {
        const scopedName = makeScopedClassName("button", "/src/styles.css");

        expect(scopedName).toBe("button");
    });

    it("returns a prefixed, CSS-safe 8 character hash for a CSS module", () => {
        const scopedName = makeScopedClassName(
            "button",
            "/src/button.module.css",
        );

        expect(scopedName).toMatch(/^perseus_[A-Za-z0-9-]{8}$/);
    });

    it("returns the same name for the same class and file", () => {
        const first = makeScopedClassName("button", "/src/button.module.css");
        const second = makeScopedClassName("button", "/src/button.module.css");

        expect(first).toBe(second);
    });

    it("returns different names for the same class in different files", () => {
        const first = makeScopedClassName("button", "/src/a.module.css");
        const second = makeScopedClassName("button", "/src/b.module.css");

        expect(first).not.toBe(second);
    });

    it("returns different names for different classes in the same file", () => {
        const first = makeScopedClassName("button", "/src/a.module.css");
        const second = makeScopedClassName("link", "/src/a.module.css");

        expect(first).not.toBe(second);
    });
});
