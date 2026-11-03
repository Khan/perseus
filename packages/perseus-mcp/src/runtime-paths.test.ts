/**
 * @jest-environment node
 */
import {packagedPaths, userDataDir} from "./runtime-paths";

describe("userDataDir", () => {
    it("uses Application Support on macOS", () => {
        // Arrange, Act
        const dir = userDataDir("darwin", {}, "/Users/ada");

        // Assert
        expect(dir).toBe("/Users/ada/Library/Application Support/perseus-mcp");
    });

    it("uses %LOCALAPPDATA% on Windows", () => {
        // Arrange, Act
        const dir = userDataDir(
            "win32",
            {LOCALAPPDATA: "C:\\Users\\ada\\AppData\\Local"},
            "C:\\Users\\ada",
        );

        // Assert
        expect(dir).toBe("C:\\Users\\ada\\AppData\\Local\\perseus-mcp");
    });

    it("uses $XDG_DATA_HOME on Linux when it's set", () => {
        // Arrange, Act
        const dir = userDataDir("linux", {XDG_DATA_HOME: "/data"}, "/home/ada");

        // Assert
        expect(dir).toBe("/data/perseus-mcp");
    });

    it("falls back to ~/.local/share on Linux", () => {
        // Arrange, Act
        const dir = userDataDir("linux", {}, "/home/ada");

        // Assert
        expect(dir).toBe("/home/ada/.local/share/perseus-mcp");
    });
});

describe("packagedPaths", () => {
    it("finds the type definitions and pages inside the package", () => {
        // Arrange, Act
        const paths = packagedPaths("/opt/perseus-mcp");

        // Assert
        expect(paths).toMatchObject({
            perseusCoreTypesDir: "/opt/perseus-mcp/types",
            pagesDir: "/opt/perseus-mcp/pages",
        });
    });
});
