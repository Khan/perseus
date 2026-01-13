import {Dependencies} from "..";
import {testDependencies} from "../../../../testing/test-dependencies";
import {Log} from "../logging/log";

import {
    parseDataFromJSONP,
    getLocalizedDataUrl,
    loadGraphie,
} from "./graphie-utils";
import {typicalCase, edgeCases} from "./graphie-utils.testdata";

describe("graphie utils", () => {
    const errorCallback = jest.fn((error) => {
        // Do nothing
    });

    it("should parse the modern graphie json format", () => {
        // Act
        const data = parseDataFromJSONP(
            typicalCase.hash,
            typicalCase.jsonpString,
            errorCallback,
        );

        // Assert
        expect(data).toEqual(typicalCase.expectedData);
    });

    it("should call the error callback when unable to parse JSONP", () => {
        // Act
        parseDataFromJSONP(typicalCase.hash, "invalid jsonp", errorCallback);

        // Assert
        expect(errorCallback).toHaveBeenCalled();
    });

    // also test the array of edge cases from the testdata file
    edgeCases.forEach((edgeCase, i) => {
        it(`should parse the edge case ${i}`, () => {
            // Act
            const data = parseDataFromJSONP(
                edgeCase.hash,
                edgeCase.jsonpString,
                errorCallback,
            );

            // Assert
            expect(data).toEqual(edgeCase.expectedData);
        });
    });

    it("should craft localized urls", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "es",
        });

        // Act
        const url = getLocalizedDataUrl(typicalCase.url);
        // Assert
        expect(url).toEqual(typicalCase.expectedLocalizedUrl);
    });

    it("should fallback to en without erroring when we can't find localized urls", async () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "es",
        });

        const nonLocalizedUrl =
            "https://ka-perseus-graphie.s3.amazonaws.com/ccefe63aa1bd05f1d11123f72790a49378d2e42b-data.json";

        global.fetch = jest.fn((url) => {
            // Localized URL fails
            if (url === typicalCase.expectedLocalizedUrl) {
                return Promise.resolve({
                    text: () => Promise.resolve(""),
                    ok: false,
                });
            }
            // Non-localized URL succeeds
            if (url === nonLocalizedUrl) {
                return Promise.resolve({
                    text: () => Promise.resolve(typicalCase.jsonpString),
                    ok: true,
                });
            }
            return Promise.resolve({
                text: () => Promise.resolve(""),
                ok: false,
            });
        }) as jest.Mock;

        // Mock the error logger to confirm no errors are thrown
        jest.spyOn(Log, "error").mockImplementation(
            jest.fn(() => {
                // Do nothing
            }),
        );

        // Act
        await loadGraphie(typicalCase.url, (data, localized) => {
            // Assert - should get English data with localized=false
            expect(data).toEqual({labels: [], range: null});
            expect(localized).toEqual(false);
        });

        // Assert
        expect(Log.error).not.toHaveBeenCalled();
    });

    it("should return localized=true when localized data is successfully loaded (JIPT scenario)", async () => {
        // Arrange - simulate JIPT mode where we load en-pt localized data
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "es",
            JIPT: {useJIPT: true},
        });

        // The en-pt localized URL (JIPT pseudo-locale)
        const jiptLocalizedUrl =
            "https://ka-perseus-graphie.s3.amazonaws.com/en-pt/ccefe63aa1bd05f1d11123f72790a49378d2e42b-data.json";

        global.fetch = jest.fn((url) => {
            // JIPT localized URL succeeds
            if (url === jiptLocalizedUrl) {
                return Promise.resolve({
                    text: () => Promise.resolve(typicalCase.jsonpString),
                    ok: true,
                });
            }
            return Promise.resolve({
                text: () => Promise.resolve(""),
                ok: false,
            });
        }) as jest.Mock;

        // Act
        await loadGraphie(typicalCase.url, (data, localized) => {
            // Assert - should get localized data with localized=true
            expect(data).toEqual({labels: [], range: null});
            expect(localized).toEqual(true);
        });
    });
});
