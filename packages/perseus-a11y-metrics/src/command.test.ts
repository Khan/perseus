import {describe, it, expect} from "@jest/globals";
import {Command} from "./command";

describe("a Command", () => {
    it("runs successfully", async () => {
        await new Command("true").run();
        // no error should be thrown.
    });

    it("throws an error on a nonzero exit code", async () => {
        const result = await new Command("false").run().catch((error) => error.message);
        expect(result).toBe("false: exited with code 1");
    });
});
