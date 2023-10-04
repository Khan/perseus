import {addLibraryVersionToPerseusDebug} from "./add-library-version-to-perseus-debug";

describe("add-library-version-to-perseus-debug", () => {
    beforeEach(() => {
        delete globalThis.__perseus_debug__;
    });

    it("should add the given library to __perseus_debug__", () => {
        // Array

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");

        // Assert
        expect(globalThis.__perseus_debug__).toMatchInlineSnapshot(`
            {
              "test-lib": "v1.0.0",
            }
        `);
    });

    it("should extend __perseus_debug__ when multiple libraries registered", () => {
        // Arrange

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("sample-lib", "2.0.0");
        addLibraryVersionToPerseusDebug("utility-lib", "3.0.0");

        // Assert
        expect(globalThis.__perseus_debug__).toMatchInlineSnapshot(`
            {
              "sample-lib": "v2.0.0",
              "test-lib": "v1.0.0",
              "utility-lib": "v3.0.0",
            }
        `);
    });

    it("should convert library entry to array when multiple versions of the same library registered", () => {
        // Arrange
        jest.spyOn(console, "warn").mockImplementation();

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.1");
        addLibraryVersionToPerseusDebug("test-lib", "4.1.8");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "2.0.0");

        // Assert
        expect(globalThis.__perseus_debug__).toMatchInlineSnapshot(`
            {
              "test-lib": [
                "v1.0.0",
                "v1.0.1",
                "v2.0.0",
                "v4.1.8",
              ],
            }
        `);
    });

    it("should warn when multiple versions of the same library registered", () => {
        // Arrange
        const warnSpy = jest.spyOn(console, "warn").mockImplementation();

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.1");
        addLibraryVersionToPerseusDebug("test-lib", "4.1.8");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "2.0.0");

        // Assert
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringMatching(
                /Multiple versions of test-lib loaded on this page/,
            ),
        );
    });

    it("should not register duplicates for duplicate calls of the same library and version", () => {
        // Arrange

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");

        // Assert
        expect(globalThis.__perseus_debug__).toMatchInlineSnapshot(`
            {
              "test-lib": "v1.0.0",
            }
        `);
    });

    it("should not warn for duplicate calls for a library of the same library and version", () => {
        // Arrange
        const warnSpy = jest.spyOn(console, "warn").mockImplementation();

        // Act
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");
        addLibraryVersionToPerseusDebug("test-lib", "1.0.0");

        // Assert
        expect(warnSpy).not.toHaveBeenCalled();
    });
});
