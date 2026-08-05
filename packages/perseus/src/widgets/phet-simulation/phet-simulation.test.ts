import {makeSafeUrl} from "@khanacademy/perseus-core";
import {screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
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
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        en: {stringConstant: "localized string"},
                    }),
                ok: true,
            }),
        ) as jest.Mock;
        // jsdom doesn't implement the Fullscreen API, so we mark it as
        // supported to keep the fullscreen button visible in these tests.
        Object.defineProperty(document, "fullscreenEnabled", {
            value: true,
            configurable: true,
        });
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

        // Act
        renderQuestion(
            question1,
            apiOptions,
            undefined,
            undefined,
            undefined,
            "zz",
        );

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

    it("links out to the simulation instead of showing the fullscreen button when the Fullscreen API is unsupported", async () => {
        // Arrange
        // Simulate a browser without any Fullscreen API support
        // (e.g. Safari on iPhone).
        Object.defineProperty(document, "fullscreenEnabled", {
            value: undefined,
            configurable: true,
        });
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        renderQuestion(question1, apiOptions);

        // Assert
        const link = await screen.findByRole("link", {
            name: "Open simulation in a new tab",
        });
        expect(link).toHaveAttribute(
            "href",
            "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html?locale=en",
        );
        expect(link).toHaveAttribute("target", "_blank");
        expect(
            screen.queryByRole("button", {name: "Fullscreen"}),
        ).not.toBeInTheDocument();
    });

    it("does not show the open-in-new-tab link when fullscreen is supported", async () => {
        // Arrange, Act
        // The default beforeEach marks the Fullscreen API as supported.
        renderQuestion(question1, {isMobile: false});

        // Assert
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: "Fullscreen"}),
            ).toBeInTheDocument();
        });
        expect(
            screen.queryByRole("link", {
                name: "Open simulation in a new tab",
            }),
        ).not.toBeInTheDocument();
    });

    it("shows the fullscreen button in the mobile app even when the Fullscreen API is unsupported", async () => {
        // Arrange
        // The mobile app uses its own fullscreen implementation, so the
        // button should show regardless of browser API support.
        Object.defineProperty(document, "fullscreenEnabled", {
            value: undefined,
            configurable: true,
        });
        const apiOptions: APIOptions = {
            isMobileApp: true,
        };

        // Act
        renderQuestion(question1, apiOptions);

        // Assert
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: "Fullscreen"}),
            ).toBeInTheDocument();
        });
    });

    it("requests browser fullscreen when the fullscreen button is clicked on web", async () => {
        // Arrange
        const requestFullscreen = jest.fn(() => Promise.resolve());
        renderQuestion(question1, {isMobile: false});
        const iframe = await screen.findByTitle("Projectile Data Lab");
        iframe.requestFullscreen = requestFullscreen;

        // Act
        await userEvent.click(
            await screen.findByRole("button", {name: "Fullscreen"}),
        );

        // Assert
        expect(requestFullscreen).toHaveBeenCalledTimes(1);
    });

    it("falls back to webkitRequestFullscreen when the standard API is unavailable", async () => {
        // Arrange
        const webkitRequestFullscreen = jest.fn();
        renderQuestion(question1, {isMobile: false});
        const iframe = await screen.findByTitle("Projectile Data Lab");
        // jsdom doesn't implement requestFullscreen, so only the prefixed
        // variant exists on the element in this test.
        Object.assign(iframe, {webkitRequestFullscreen});

        // Act
        await userEvent.click(
            await screen.findByRole("button", {name: "Fullscreen"}),
        );

        // Assert
        expect(webkitRequestFullscreen).toHaveBeenCalledTimes(1);
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
