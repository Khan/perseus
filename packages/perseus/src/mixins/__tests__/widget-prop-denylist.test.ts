import {removeDenylistProps} from "../widget-prop-denylist";

describe("removeDenylistProps", () => {
    it("removes props that are in denylist from input", () => {
        // Arrange
        const props = {
            // These props are not on the denylist
            foo: "bar",
            gandalf: "awesome",
            // These props are on the denylist
            key: "f-sharp",
            id: 42,
        } as const;

        // Act
        const result = removeDenylistProps(props);

        // Assert
        expect(result).toStrictEqual({foo: "bar", gandalf: "awesome"});
    });
});
