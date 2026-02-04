import {Errors} from "@khanacademy/perseus-core";

import * as Dependencies from "../dependencies";
import {testDependencies} from "../testing/test-dependencies";

import {Log} from "./log";

describe("Perseus logging", () => {
    it("should proxy log() calls to the logger obtained from getDependencies", () => {
        // Arrange
        const logSpy = jest.fn();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            Log: {...testDependencies.Log, log: logSpy},
        });

        // Act
        Log.log("test message", {a: 1, b: "two"});

        // Assert
        expect(logSpy).toHaveBeenCalledWith("test message", {a: 1, b: "two"});
    });

    it("should proxy error() calls to the logger obtained from getDependencies", () => {
        // Arrange
        const errorSpy = jest.fn();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            Log: {...testDependencies.Log, error: errorSpy},
        });

        // Act
        Log.error("test error", Errors.NotAllowed, {
            cause: new Error("Something baaad"),
            loggedMetadata: {a: 1, b: "two"},
        });

        // Assert
        expect(errorSpy).toHaveBeenCalledWith("test error", "NotAllowed", {
            cause: expect.any(Error),
            loggedMetadata: {
                a: 1,
                b: "two",
            },
        });
    });
});
