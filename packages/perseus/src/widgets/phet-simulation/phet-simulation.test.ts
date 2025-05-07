import {screen, waitFor} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {makeSafeUrl} from "./phet-simulation";
import {nonPhetUrl, question1} from "./phet-simulation.testdata";

import type {APIOptions} from "../../types";

describe("phet-simulation widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        en: {stringConstant: "localized string"},
                    }),
                ok: true,
            }),
        ) as jest.Mock;
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
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
        // Fullscreen button should be available when the simulation renders successfully
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: "Fullscreen"}),
            ).toBeInTheDocument();
        });
    });

    it("should display an error and hide fullscreen button for a non-PhET URL", async () => {
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
            ).toBeInTheDocument();
        });
        // Fullscreen button should not be in the document when the simulation cannot load
        await waitFor(() => {
            expect(
                screen.queryByRole("button", {name: "Fullscreen"}),
            ).not.toBeInTheDocument();
        });
    });

    it("should display a locale warning for unavailable locale for PhET", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "zz",
        });

        // Act
        renderQuestion(question1, apiOptions);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByText(
                    "Sorry, this simulation isn't available in your language.",
                ),
            ).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByTitle("Projectile Data Lab")).toHaveAttribute(
                "src",
                "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html?locale=zz",
            );
        });
        // Fullscreen button should be available when the simulation renders successfully
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: "Fullscreen"}),
            ).toBeInTheDocument();
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
