import {screen, waitFor} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {nonPhetUrl, question1} from "../__testdata__/phet-sim.testdata";
import {makeSafeUrl} from "../phet-sim";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

describe("phet-sim widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        en: {stringConstant: "localized string"},
                    }),
                ok: true,
            }),
        ) as jest.Mock;
        global.URL.canParse = jest.fn(() => true) as jest.Mock;
    });

    it("should display with valid PhET URL", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        renderQuestion(question1, apiOptions);

        // Assert
        await waitFor(() => {
            expect(screen.queryByTitle("Projectile Data Lab")).toHaveAttribute(
                "src",
                "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html?locale=en",
            );
        });
    });

    it("should display an error for a non-PhET URL", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        renderQuestion(nonPhetUrl, apiOptions);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByText("Sorry, this simulation cannot load."),
            ).toBeDefined();
        });
    });

    it("should make the URL with the correct locale", async () => {
        // Arrange
        const baseUrl =
            "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html";
        const locale = "fr";

        // Act
        const url: URL | null = makeSafeUrl(baseUrl, locale);

        // Assert
        expect(url?.toString()).toBe(
            "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html?locale=fr",
        );
    });

    it("should erase a non-PhET URL", async () => {
        // Arrange
        const baseUrl = "https://google.com";
        const locale = "en";

        // Act
        const url: URL | null = makeSafeUrl(baseUrl, locale);

        // Assert
        expect(url).toBe(null);
    });
});
