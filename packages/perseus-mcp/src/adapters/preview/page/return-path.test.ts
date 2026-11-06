import {backFor, backLabel, returnPath, withFrom} from "./return-path";

describe("returnPath", () => {
    it("returns the path ?from= names", () => {
        // Arrange, Act
        const path = returnPath("?from=%2Fexercises%2Fe1%3Fitem%3Dd1");

        // Assert
        expect(path).toBe("/exercises/e1?item=d1");
    });

    it.each(["https://example.com/", "//example.com/", "/\\example.com", ""])(
        "returns null for %j, which isn't a path on this server",
        (from) => {
            // Arrange, Act
            const path = returnPath(`?from=${encodeURIComponent(from)}`);

            // Assert
            expect(path).toBeNull();
        },
    );
});

describe("backLabel", () => {
    it.each([
        ["/", "Back to home"],
        ["/images", "Back to all images"],
        ["/exercises/e1?item=d1", "Back to the exercise"],
        ["/graffiti/g1", "Back to the diagram"],
    ])("names %s as %j", (path, label) => {
        // Arrange, Act
        const result = backLabel(path);

        // Assert
        expect(result).toBe(label);
    });
});

describe("withFrom", () => {
    it("adds the current page, without its own from, to the link", () => {
        // Arrange
        const location = {
            pathname: "/graffiti/g1",
            search: "?from=%2Fimages&x=1",
        };

        // Act
        const href = withFrom("/exercises/e1?item=d1", location);

        // Assert
        expect(href).toBe(
            "/exercises/e1?item=d1&from=%2Fgraffiti%2Fg1%3Fx%3D1",
        );
    });
});

describe("backFor", () => {
    it("returns the page it belongs to when there's no ?from=", () => {
        // Arrange
        const up = {href: "/images", label: "All images"};

        // Act
        const back = backFor(up, "");

        // Assert
        expect(back).toBe(up);
    });

    it("returns the ?from= page when there is one", () => {
        // Arrange, Act
        const back = backFor(
            {href: "/images", label: "All images"},
            "?from=%2Fexercises%2Fe1",
        );

        // Assert
        expect(back).toEqual({
            href: "/exercises/e1",
            label: "Back to the exercise",
        });
    });
});
