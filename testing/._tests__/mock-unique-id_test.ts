import {getMockUniqueId} from "../mock-unique-id";

describe("getMockUniqueId", () => {
    it("should increment ids with the same prefix", () => {
        // Arrange
        const mockUniqueId = getMockUniqueId();

        // Act
        const foo0 = mockUniqueId("foo_");
        const foo1 = mockUniqueId("foo_");

        // Assert
        expect(foo0).toEqual("foo_0");
        expect(foo1).toEqual("foo_1");
    });

    it("should increment ids with different prefixes separately", () => {
        // Arrange
        const mockUniqueId = getMockUniqueId();

        // Act
        mockUniqueId("foo_");
        mockUniqueId("foo_");
        const bar0 = mockUniqueId("bar_");
        const bar1 = mockUniqueId("bar_");

        // Assert
        expect(bar0).toEqual("bar_0");
        expect(bar1).toEqual("bar_1");
    });

    it("should use separate counts for separate mock functions", () => {
        // Arrange
        const mockUniqueId1 = getMockUniqueId();
        const mockUniqueId2 = getMockUniqueId();

        // Act
        mockUniqueId1("foo_");
        mockUniqueId1("foo_");
        const foo0 = mockUniqueId2("foo_");

        // Assert
        expect(foo0).toEqual("foo_0");
    });
});
