import getScoreableWidgets from "./get-scoreable-widgets";
import {getTestDropdownWidget} from "./test-helpers";

describe("getScoreableWidgets", () => {
    it("returns empty arrays for empty content", () => {
        const result = getScoreableWidgets({
            content: "",
            widgets: {},
            images: {},
        });

        expect(result).toEqual([]);
    });

    it("returns widget IDs referenced in content", () => {
        const result = getScoreableWidgets({
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
            },
            images: {},
        });

        expect(result).toEqual(["dropdown 1"]);
    });

    it("filters out widgets not referenced in content", () => {
        const result = getScoreableWidgets({
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
                "dropdown 2": getTestDropdownWidget(),
            },
            images: {},
        });

        expect(result).toEqual(["dropdown 1"]);
    });

    it("filters out static widgets", () => {
        const result = getScoreableWidgets({
            content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
                "dropdown 2": {
                    ...getTestDropdownWidget(),
                    static: true,
                },
            },
            images: {},
        });

        expect(result).toEqual(["dropdown 1"]);
    });

    it("filters out ungraded widgets", () => {
        const result = getScoreableWidgets({
            content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
                "dropdown 2": {
                    ...getTestDropdownWidget(),
                    graded: false,
                },
            },
            images: {},
        });

        expect(result).toEqual(["dropdown 1"]);
    });
});
