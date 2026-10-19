import init from "../init";
import {getWidget} from "../widgets";

describe("init", () => {
    it("registers the built-in widgets", async () => {
        await init();

        expect(getWidget("radio")).not.toBeNull();
    });
});
