import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageWidgetEmptySizeRule from "./image-widget-empty-size";

describe("image-widget", () => {
    // Warn for image widget with undefined width
    expectWarning(imageWidgetEmptySizeRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://example.com/image.png",
                        height: 100,
                    },
                },
            },
        },
    });

    // Warn for image widget with undefined height
    expectWarning(imageWidgetEmptySizeRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://example.com/image.png",
                        width: 100,
                    },
                },
            },
        },
    });

    // Warn for image widget with 0 width
    expectWarning(imageWidgetEmptySizeRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://example.com/image.png",
                        height: 100,
                        width: 0,
                    },
                },
            },
        },
    });

    // Warn for image widget with 0 height
    expectWarning(imageWidgetEmptySizeRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://example.com/image.png",
                        width: 100,
                        height: 0,
                    },
                },
            },
        },
    });

    // Pass for image widget with defined width and height
    expectPass(imageWidgetEmptySizeRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    backgroundImage: {
                        url: "https://example.com/image.png",
                        width: 100,
                        height: 100,
                    },
                },
            },
        },
    });
});
