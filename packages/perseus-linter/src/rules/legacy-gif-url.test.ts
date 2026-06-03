import {expectWarning, expectPass} from "../__tests__/test-utils";

import legacyGifUrlRule from "./legacy-gif-url";

describe("legacy-gif-url", () => {
    // Warn for a legacy S3 gif URL
    expectWarning(legacyGifUrlRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/abc123.gif",
                    },
                },
            },
        },
    });

    // Warn regardless of the gif extension's casing
    expectWarning(legacyGifUrlRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/abc123.GIF",
                    },
                },
            },
        },
    });

    // Pass for a legacy S3 image that isn't a gif
    expectPass(legacyGifUrlRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/abc123.png",
                    },
                },
            },
        },
    });

    // Pass for a gif hosted on the CDN
    expectPass(legacyGifUrlRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-perseus-images/abc123.gif",
                    },
                },
            },
        },
    });

    // Pass for an image widget with no background image URL
    expectPass(legacyGifUrlRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {},
            },
        },
    });
});
