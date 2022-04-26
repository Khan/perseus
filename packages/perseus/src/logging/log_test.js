// @flow

import {testDependencies} from "../../../../testing/test-dependencies.js";
import {setDependencies} from "../dependencies.js";

import {Errors, Log} from "./log.js";

describe("Perseus logging", () => {
    it("should proxy log() calls to the logger provided through setDependencies", () => {
        // Arrange
        const logSpy = jest.spyOn(testDependencies.Log, "log");
        setDependencies(testDependencies);

        // Act
        Log.log("test message", {a: 1, b: "two"});

        // Assert
        expect(logSpy).toHaveBeenCalledWith("test message", {a: 1, b: "two"});
    });

    it("should proxy error() calls to the logger provided through setDependencies", () => {
        // Arrange
        const errorSpy = jest.spyOn(testDependencies.Log, "error");
        setDependencies(testDependencies);

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
