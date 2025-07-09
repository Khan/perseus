import {DEFAULT_GRAPHER_PROPS} from "./util";

describe("DEFAULT_GRAPHER_PROPS", () => {
    it("defaults `plot` to a linear graph", () => {
        expect(DEFAULT_GRAPHER_PROPS.plot).toEqual({
            type: "linear",
            coords: null,
            asymptote: null,
        });
    });
});
