import {describe, it} from "@jest/globals";

import {getRealImageUrl, isLabeledSVG} from "./util.graphie";

describe(".getRealImageUrl", () => {
    it("when passed a graphie URL, it transforms the URL to an http url", () => {
        const input =
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/b4a76d480e49f89fddb973c88c53fc301ba0d927";
        const result =
            "https://ka-perseus-graphie.s3.amazonaws.com/b4a76d480e49f89fddb973c88c53fc301ba0d927.svg";
        expect(getRealImageUrl(input)).toBe(result);
    });

    it("when it's passed an HTTP URL, it returns the URL", () => {
        const input =
            "https://cdn.kastatic.org/ka-perseus-images/c633a1d04970211586b413985a7959876ca6c909.png";
        expect(getRealImageUrl(input)).toBe(input);
    });
});

describe(".isLabeledSVG", () => {
    it("returns true for web+graphie", () => {
        expect(
            isLabeledSVG(
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/b4a76d480e49f89fddb973c88c53fc301ba0d927",
            ),
        ).toBeTruthy();
    });

    it("returns true for file+graphie", () => {
        expect(
            isLabeledSVG(
                "file+graphie://b4a76d480e49f89fddb973c88c53fc301ba0d927",
            ),
        ).toBeTruthy();
    });

    it("returns false for all other protocols", () => {
        expect(
            isLabeledSVG(
                "https://cdn.kastatic.org/ka-perseus-images/c633a1d04970211586b413985a7959876ca6c909.png",
            ),
        ).toBeFalsy();
    });
});
