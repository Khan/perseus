import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageWidgetAltTextRule from "./image-widget-alt-text";

describe("image-widget", () => {
    // Warn for image widget with no alt text
    expectWarning(imageWidgetAltTextRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {},
            },
        },
    });

    // Warn for image widget with short alt text
    expectWarning(imageWidgetAltTextRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567",
                },
            },
        },
    });

    // Warn for image widget with excessively long alt text
    expectWarning(imageWidgetAltTextRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "a".repeat(151), // string length 151 characters
                },
            },
        },
    });

    // Pass for image widget with sufficiently long alt text
    expectPass(imageWidgetAltTextRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                },
            },
        },
    });
});
