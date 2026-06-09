import {expectWarning, expectPass} from "../__tests__/test-utils";

import legacyGifUrlRule from "./legacy-gif-url";

describe("legacy-gif-url", () => {
    it("warns for a legacy S3 gif URL", () => {
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
    });

    it("warns regardless of the gif extension's casing", () => {
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
    });

    it("passes for a legacy S3 image that isn't a gif", () => {
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
    });

    it("passes for a gif hosted on the CDN", () => {
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
    });

    it("passes for an image widget with no background image URL", () => {
        expectPass(legacyGifUrlRule, "[[☃ image 1]]", {
            widgets: {
                "image 1": {
                    options: {},
                },
            },
        });
    });
});
