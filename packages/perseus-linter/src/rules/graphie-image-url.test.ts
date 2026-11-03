import {expectIssue, expectPass} from "../__tests__/test-utils";

import graphieImageUrlRule from "./graphie-image-url";

function image(url: string) {
    return {
        widgets: {
            "image 1": {options: {backgroundImage: {url}}},
        },
    };
}

describe("graphie-image-url", () => {
    it("warns about a Graphie PNG, whose labels can't be translated", () => {
        expectIssue(
            graphieImageUrlRule,
            "[[☃ image 1]]",
            image("https://ka-perseus-graphie.s3.amazonaws.com/abc123.png"),
            {
                messages: [
                    "image 1: This image is a png, so its labels can't be " +
                        "translated. Prefer using a web+graphie:// url " +
                        "instead, which enables translatable labels.",
                ],
            },
        );
    });

    it("passes for a web+graphie URL", () => {
        expectPass(
            graphieImageUrlRule,
            "[[☃ image 1]]",
            image("web+graphie://ka-perseus-graphie.s3.amazonaws.com/abc123"),
        );
    });

    it("passes for a PNG hosted elsewhere", () => {
        expectPass(
            graphieImageUrlRule,
            "[[☃ image 1]]",
            image("https://cdn.kastatic.org/ka-perseus-images/abc123.png"),
        );
    });
});
