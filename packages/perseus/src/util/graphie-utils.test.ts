import {parseDataFromJSONP} from "./graphie-utils";
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
});
