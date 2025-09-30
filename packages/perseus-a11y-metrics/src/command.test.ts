import {describe, it, expect} from "@jest/globals";
import {command} from "./command";

describe("a Command", () => {
    it("runs successfully", async () => {
        await command("true").run();
        // no error should be thrown.
    });

    it("throws an error on a nonzero exit code", async () => {
        const result = await command("false").run().catch((error) => error.message);
        expect(result).toBe("false: exited with code 1");
    });
});
