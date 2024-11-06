import {isRealJSONParse} from "./is-real-json-parse";

describe("isRealJSONParse", () => {
    it("returns false given a function that messes with itemData", () => {
        function fakeJSONParse(json: string) {
            const parsed = JSON.parse(json)
            parsed.data.assessmentItem.item.itemData = ""
            return parsed;
        }

        expect(isRealJSONParse(fakeJSONParse)).toBe(false)
    })

    it("returns true given the native JSON.parse function", () => {
        expect(isRealJSONParse(JSON.parse)).toBe(true);
    })
})
