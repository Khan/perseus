import {describe, it, expect} from "@jest/globals";

import {command} from "./command";

describe("a Command", () => {
    it("runs successfully", async () => {
        await command("true").run();
        // no error should be thrown.
    });

    it("throws an error on a nonzero exit code", async () => {
        const result = await command("false")
            .run()
            .catch((error) => error.message);
        expect(result).toBe("false: exited with code 1");
    });

    it("can collect its standard output into a string", async () => {
        const {stdout} = await command("echo", "Hello, world!")
            .withStdoutToString()
            .run();
        expect(stdout).toBe("Hello, world!\n");
    });
});
