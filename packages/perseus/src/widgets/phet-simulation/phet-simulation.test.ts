import {makeSafeUrl} from "@khanacademy/perseus-core";
import {screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {nonPhetUrl, question1} from "./phet-simulation.testdata";

import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

const phetOrigin = "https://phet.colorado.edu";

describe("phet-simulation widget", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

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
        const url: URL | null = makeSafeUrl(baseUrl, locale, phetOrigin);

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
        const url: URL | null = makeSafeUrl(baseUrl, locale, phetOrigin);

        // Assert
        expect(url).toBe(null);
    });

    it("should use the mobile app fullscreen logic when rendered in a mobile app", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobileApp: true,
        };

        // Act
        renderQuestion(question1, apiOptions);
        await waitFor(() => {
            expect(
                screen.getByTitle("Projectile Data Lab"),
            ).toBeInTheDocument();
        });

        await waitFor(async () => {
            const fullscreenButton = screen.getByRole("button", {
                name: "Fullscreen",
            });
            // Find and click the fullscreen button once available
            await userEvent.click(fullscreenButton);
        });

        // Assert
        await waitFor(() => {
            const closeButton = screen.getByRole("button", {
                name: "Exit fullscreen",
            });
            // Check that the mobile app fullscreen close button is present
            expect(closeButton).toBeInTheDocument();
        });
    });
});
