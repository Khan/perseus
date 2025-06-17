import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageWidgetRule from "./image-widget";

describe("image-widget", () => {
    // Warn for image widget with no alt text
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {},
            },
        },
    });

    // Warn for image widget with short alt text
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567",
                },
            },
        },
    });

    // Pass for image widget with long alt text
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                },
            },
        },
    });

    // Warn for image widget with math in its caption
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: $x$",
                },
            },
        },
    });

    // Pass for image widget with caption and no math
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: x",
                },
            },
        },
    });

    // Pass for image widget with escaped dollar in its caption
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: \\$10",
                },
            },
        },
    });
});
