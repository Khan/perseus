import {expectPass, expectWarning} from "../__tests__/test-utils";

import matcherWidgetErrorRule from "./matcher-widget-error";

describe("radio-widget-error", () => {
    it("warns for matcher widget with more left cards than right cards", () => {
        expectWarning(matcherWidgetErrorRule, "[[☃ matcher 1]]", {
            widgets: {
                "matcher 1": {
                    options: {
                        left: ["1", "2", "3"],
                        right: ["4", "5"],
                    },
                },
            },
        });
    });

    it("warns for matcher widget with more right cards than left cards", () => {
        expectWarning(matcherWidgetErrorRule, "[[☃ matcher 1]]", {
            widgets: {
                "matcher 1": {
                    options: {
                        left: ["1", "2"],
                        right: ["3", "4", "5"],
                    },
                },
            },
        });
    });

    it("passes for matcher widget with the same number of cards in the left and right columns", () => {
        expectPass(matcherWidgetErrorRule, "[[☃ matcher 1]]", {
            widgets: {
                "matcher 1": {
                    options: {
                        left: ["1", "2", "3"],
                        right: ["4", "5", "6"],
                    },
                },
            },
        });
    });

    it("passes for matcher widget with no cards", () => {
        expectPass(matcherWidgetErrorRule, "[[☃ matcher 1]]", {
            widgets: {
                "matcher 1": {
                    options: {
                        left: [],
                        right: [],
                    },
                },
            },
        });
    });
});
