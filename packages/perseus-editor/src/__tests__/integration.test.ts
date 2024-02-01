import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../testing/test-dependencies";

describe("PerseusEditor integration test", () => {
    it("should log error if widget registration fails", async () => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        const errorSpy = jest.spyOn(testDependencies.Log, "error");

        await import("../index");

        expect(errorSpy).not.toHaveBeenCalled();
    });
});
