import {expectPass, expectWarning} from "../__tests__/test-utils";

import pythonProgramWidgetErrorRule from "./python-program-widget-error";

describe("python-program-widget-error", () => {
    // Error when no program ID is specified
    expectWarning(pythonProgramWidgetErrorRule, "[[☃ python-program 1]]", {
        widgets: {
            "python-program 1": {
                options: {
                    programID: "",
                },
            },
        },
    });

    // Error when the height is not a positive integer (0)
    expectWarning(pythonProgramWidgetErrorRule, "[[☃ python-program 1]]", {
        widgets: {
            "python-program 1": {
                options: {
                    height: 0,
                },
            },
        },
    });

    // Error when the height is not a positive integer (negative)
    expectWarning(pythonProgramWidgetErrorRule, "[[☃ python-program 1]]", {
        widgets: {
            "python-program 1": {
                options: {
                    height: -1,
                },
            },
        },
    });

    // Pass when no errors are detected
    expectPass(pythonProgramWidgetErrorRule, "[[☃ python-program 1]]", {
        widgets: {
            "python-program 1": {
                options: {
                    programID: "123",
                    height: 100,
                },
            },
        },
    });
});
