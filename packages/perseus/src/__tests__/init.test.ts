import init from "../init";
import {getWidget} from "../widgets";

describe("init", () => {
    it("should correctly replace the transformer widget", async () => {
        await init();

        expect(getWidget("transformer")).not.toBeNull();
    });
});
