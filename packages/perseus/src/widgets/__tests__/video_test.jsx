// @flow

import "@testing-library/jest-dom";

import * as Dependencies from "../../../perseus-all-package/dependencies.js";
import {renderQuestion} from "../../../perseus-all-package/widgets/__tests__/renderQuestion.jsx";
import {testDependencies} from "../../../perseus-testing/test-dependencies.js";
import {question1} from "../__testdata__/video_testdata.js";

import type {APIOptions} from "../../../perseus-all-package/types.js";

describe("video widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            useVideo: (id, kind) => {
                return {
                    status: "success",
                    data: {
                        video: null,
                    },
                };
            },
        });
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });
});
