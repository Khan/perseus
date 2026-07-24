import {getCSSZoomFactor} from "./css-zoom-utils";

describe("getCSSZoomFactor", () => {
    const mockZoomByElement = (zoomByElement: Map<Element, string>) => {
        jest.spyOn(window, "getComputedStyle").mockImplementation(
            (el: Element) =>
                // eslint-disable-next-line no-restricted-syntax -- partial mock of CSSStyleDeclaration; only `zoom` is read
                ({zoom: zoomByElement.get(el) ?? ""}) as CSSStyleDeclaration,
        );
    };

    it("returns 1 when no element in the tree has zoom applied", () => {
        // Arrange
        const node = document.createElement("div");
        document.body.appendChild(node);

        // Act
        const zoomFactor = getCSSZoomFactor(node);

        // Assert
        expect(zoomFactor).toBe(1);
    });

    it("returns the zoom applied to an ancestor", () => {
        // Arrange
        const node = document.createElement("div");
        document.body.appendChild(node);
        mockZoomByElement(new Map([[document.body, "1.5"]]));

        // Act
        const zoomFactor = getCSSZoomFactor(node);

        // Assert
        expect(zoomFactor).toBe(1.5);
    });

    it("multiplies zoom values across the element and its ancestors", () => {
        // Arrange
        const parent = document.createElement("div");
        const node = document.createElement("div");
        parent.appendChild(node);
        document.body.appendChild(parent);
        mockZoomByElement(
            new Map([
                [node, "2"],
                [parent, "1.5"],
            ]),
        );

        // Act
        const zoomFactor = getCSSZoomFactor(node);

        // Assert
        expect(zoomFactor).toBe(3);
    });

    it("ignores 'normal' and non-numeric zoom values", () => {
        // Arrange
        const node = document.createElement("div");
        document.body.appendChild(node);
        mockZoomByElement(
            new Map([
                [node, "normal"],
                [document.body, "bogus"],
            ]),
        );

        // Act
        const zoomFactor = getCSSZoomFactor(node);

        // Assert
        expect(zoomFactor).toBe(1);
    });
});
