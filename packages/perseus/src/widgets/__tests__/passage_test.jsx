// @flow

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {question1, question2} from "../__testdata__/passage_testdata.js";
import PassageWidgetExport from "../passage.jsx";
import * as getLineHeightModule from "../passage/get-line-height-for-node.js";

import {renderQuestion} from "./renderQuestion.jsx";

import type {APIOptions} from "../../types.js";

jest.mock("../passage/get-line-height-for-node.js");

describe("passage widget", () => {
    beforeEach(() => {
        jest.spyOn(getLineHeightModule, "getLineHeightForNode").mockReturnValue(
            21,
        );

        // passage widget uses the height of the entire rendered passage along
        // with the above line height calculations to determine the number of
        // lines rendered (as a way to provide line numbering).
        jest.spyOn(
            HTMLDivElement.prototype,
            "offsetHeight",
            "get",
        ).mockReturnValue(200.0);

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it.each([true, false])(
        "should snapshot simple passage (mobile: %s)",
        (isMobile: boolean) => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile,
            };

            // Act
            const {container} = renderQuestion(question1, apiOptions);
            jest.runOnlyPendingTimers();

            // Assert
            expect(container).toMatchSnapshot();
        },
    );

    it.each([true, false])(
        "should snapshot multiple passages (mobile: %s)",
        (isMobile: boolean) => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile,
            };

            // Act
            const {container} = renderQuestion(question2, apiOptions);
            jest.runOnlyPendingTimers();

            // Assert
            expect(container).toMatchSnapshot();
        },
    );

    it("should not be answerable", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        jest.runOnlyPendingTimers();

        // Act
        const score = renderer.score();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            Object {
              "earned": 0,
              "message": null,
              "total": 0,
              "type": "points",
            }
        `);
    });

    it("should be able to return a valid reference", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        jest.runOnlyPendingTimers();

        const [passage1]: [PassageWidgetExport.widget] =
            renderer.findWidgets("passage 1");

        // Act
        const reference = passage1.getReference(3);

        // Assert
        // Why not use toMatchInlineSnapshot() here? Well, because one of the
        // react elements that is rendered into the snapshot has a trailing
        // space which is significant and if we use inline snapshots, many
        // editors will strip that trailing whitespace and cause a test
        // failure.
        expect(reference).toMatchSnapshot();
    });

    it("should return null if reference number is not valid", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        jest.runOnlyPendingTimers();

        const [passage1]: [PassageWidgetExport.widget] =
            renderer.findWidgets("passage 1");

        // Act
        const reference = passage1.getReference(999);

        // Assert
        expect(reference).toBe(null);
    });
});
