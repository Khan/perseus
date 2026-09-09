import {parse} from "../parse";
import {success} from "../result";

import {parseSorterWidget} from "./sorter-widget";

function generateCards(count: number): string[] {
    return Array.from({length: count}, (_, index) => `card ${index}`);
}

describe("sorterWidget", () => {
    it("keeps a sorter with ten cards", () => {
        const widget = {
            type: "sorter",
            graded: true,
            options: {
                correct: generateCards(10),
                layout: "horizontal",
                padding: true,
            },
        };

        expect(parse(widget, parseSorterWidget)).toEqual(success(widget));
    });

    it("replaces a sorter with eleven cards with a deprecated standin", () => {
        const widget = {
            type: "sorter",
            graded: true,
            options: {
                correct: generateCards(11),
                layout: "horizontal",
                padding: true,
            },
        };

        expect(parse(widget, parseSorterWidget)).toEqual(
            success({
                type: "deprecated-standin",
                graded: true,
                options: {},
            }),
        );
    });

    it("accepts a sorter that has already been replaced", () => {
        const alreadyReplaced = {
            type: "deprecated-standin",
            graded: true,
            options: {},
        };

        expect(parse(alreadyReplaced, parseSorterWidget)).toEqual(
            success(alreadyReplaced),
        );
    });
});
