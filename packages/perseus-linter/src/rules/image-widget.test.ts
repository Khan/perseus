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

    // Warn for image widget with excessively long alt text
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "a".repeat(151), // string length 151 characters
                },
            },
        },
    });

    // Pass for image widget with sufficiently long alt text
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                },
            },
        },
    });
});
