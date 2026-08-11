/**
 * Loads a fresh copy of the module, so each test starts before the
 * once-per-page-load flag has been consumed.
 */
function freshLogBridgeHint(): () => void {
    let logBridgeHint: () => void = () => {};
    jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ({logBridgeHint} = require("./log-bridge-hint"));
    });
    return logBridgeHint;
}

describe("logBridgeHint", () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    it("logs a snippet that filters for preview bridge messages", () => {
        // Arrange
        const logBridgeHint = freshLogBridgeHint();

        // Act
        logBridgeHint();

        // Assert
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining('e.data?.source === "perseus-preview"'),
        );
    });

    it("logs a snippet that stringifies the matching messages", () => {
        // Arrange
        const logBridgeHint = freshLogBridgeHint();

        // Act
        logBridgeHint();

        // Assert
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("console.log(JSON.stringify(e.data))"),
        );
    });

    it("logs only once, however many previews mount", () => {
        // Arrange
        const logBridgeHint = freshLogBridgeHint();

        // Act
        logBridgeHint();
        logBridgeHint();
        logBridgeHint();

        // Assert
        expect(logSpy).toHaveBeenCalledTimes(1);
    });
});
