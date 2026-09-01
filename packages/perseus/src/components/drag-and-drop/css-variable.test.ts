import {cssVariable} from "./css-variable";

describe("cssVariable", () => {
    it("puts the custom property in a style object", () => {
        // Arrange, Act
        const style = cssVariable("--blank-min-inline-size", "120px");

        expect(style).toEqual({"--blank-min-inline-size": "120px"});
    });
});
