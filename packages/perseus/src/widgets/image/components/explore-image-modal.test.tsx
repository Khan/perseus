import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {DependenciesContext} from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {mockImageLoading} from "../../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";
import {earthMoonImage, gifImage} from "../utils";

import {ExploreImageModal} from "./explore-image-modal";

import type {Interval, Size} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

function renderModal(props: React.ComponentProps<typeof ExploreImageModal>) {
    return render(
        <DependenciesContext.Provider value={testDependenciesV2}>
            <ExploreImageModal {...props} />
        </DependenciesContext.Provider>,
    );
}

const defaultProps = {
    backgroundImage: {},
    scale: 1,
    title: "",
    caption: "",
    // Images should have alt text, and need alt text to be detectable
    // by the testing library.
    alt: "widget alt text",
    // Explore image modal is only showing up because there is
    // a long description.
    longDescription: "widget long description",
    // Zoom size would not be 0 for a legitimate image
    zoomSize: [100, 100] satisfies Size,
    box: [400, 400] satisfies Size,
    labels: [],
    range: [
        [0, 10],
        [0, 10],
    ] satisfies [Interval, Interval],
    linterContext: {
        contentType: "",
        highlightLint: false,
        paths: [],
        stack: ["widget"],
    },
    apiOptions: ApiOptions.defaults,
    isGifPlaying: false,
    setIsGifPlaying: () => {},
};

const apiOptionsWithGifControls = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({
        "image-widget-upgrade-gif-controls": true,
    }),
};

describe("ExploreImageModal", () => {
    let userEvent: UserEvent;
    let unmockImageLoading: () => void;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        unmockImageLoading = mockImageLoading();

        // GifImage (rendered via SvgImage when gif controls are active)
        // calls fetch() to decode GIF frames. jsdom doesn't provide
        // fetch, so we stub it here.
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            }),
        ) as jest.Mock;
    });

    afterEach(() => {
        unmockImageLoading();
    });

    it("should render the modal", () => {
        // Arrange

        // act
        renderModal(defaultProps);

        // Assert
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should have null content if there is no background image URL", () => {
        // Arrange
        const props = {
            ...defaultProps,
            backgroundImage: {
                url: undefined,
                width: 100,
                height: 100,
            },
        };

        // Act
        renderModal(props);
        act(() => {
            jest.runAllTimers();
        });

        const title = screen.getByRole("heading", {level: 1});

        // Assert
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Explore image and description");
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
        expect(screen.queryByText("Description")).not.toBeInTheDocument();
    });

    it("should still render the modal content if the width is not provided", () => {
        // Arrange
        const props = {
            ...defaultProps,
            backgroundImage: {
                url: earthMoonImage.url,
                width: undefined,
                height: 100,
            },
        };

        // Act
        renderModal(props);
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        const image = screen.getByRole("img");
        expect(image).toBeVisible();
        expect(screen.getByText("Description")).toBeInTheDocument();
        // Make sure image size is not 0
        expect(image).not.toHaveStyle("width: 0px");
        expect(image).not.toHaveStyle("height: 0px");
    });

    it("should still render the modal content if the height is not provided", () => {
        // Arrange
        const props = {
            ...defaultProps,
            backgroundImage: {
                url: earthMoonImage.url,
                width: 100,
                height: undefined,
            },
        };

        // Act
        renderModal(props);
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        const image = screen.getByRole("img");
        expect(image).toBeVisible();
        expect(screen.getByText("Description")).toBeInTheDocument();
        // Make sure image size is not 0
        expect(image).not.toHaveStyle("width: 0px");
        expect(image).not.toHaveStyle("height: 0px");
    });

    it("renders the default title when no title is provided", () => {
        // Arrange

        // Act
        renderModal(defaultProps);

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Explore image and description");
    });

    it("renders the title if one is provided", () => {
        // Arrange

        // Act
        renderModal({...defaultProps, title: "widget title"});

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("widget title");
    });

    it("renders the caption if one is provided", () => {
        // Arrange

        // Act
        renderModal({
            ...defaultProps,
            backgroundImage: earthMoonImage,
            caption: "widget caption",
        });

        // Assert
        expect(screen.getByText("widget caption")).toBeInTheDocument();
    });

    it("renders the description", () => {
        // Arrange

        // Act
        renderModal({
            ...defaultProps,
            backgroundImage: earthMoonImage,
            longDescription: "widget long description",
        });

        // Assert
        const descriptionLabel = screen.getByText("Description");
        expect(descriptionLabel).toBeInTheDocument();
        expect(screen.getByText("widget long description")).toBeInTheDocument();
    });

    describe("gif controls", () => {
        it("should render gif controls if the image is a gif", () => {
            // Arrange, Act
            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithGifControls,
            });

            // Assert
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            expect(playButton).toBeVisible();
        });

        it("should not render gif controls if the image is not a gif", () => {
            // Arrange, Act
            renderModal({
                ...defaultProps,
                backgroundImage: earthMoonImage,
                apiOptions: ApiOptions.defaults,
            });

            // Assert
            const playButton = screen.queryByRole("button", {
                name: "Play Animation",
            });
            const pauseButton = screen.queryByRole("button", {
                name: "Pause Animation",
            });
            expect(playButton).not.toBeInTheDocument();
            expect(pauseButton).not.toBeInTheDocument();
        });

        it("should show the pause icon when the gif is playing", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithGifControls,
            });

            // Act — the modal starts paused, so click Play first
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            await userEvent.click(playButton);

            // Assert
            const pauseButton = screen.getByRole("button", {
                name: "Pause Animation",
            });
            expect(pauseButton).toBeVisible();
        });

        it("should show the play icon when the gif is paused", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                isGifPlaying: false,
                apiOptions: apiOptionsWithGifControls,
            });

            // Act
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });

            // Assert
            expect(playButton).toBeVisible();
        });

        it("should toggle the gif playing state when the play button is clicked", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithGifControls,
            });

            // Act — modal starts paused, click Play
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            await userEvent.click(playButton);

            // Assert — should now show the Pause button
            expect(
                screen.getByRole("button", {name: "Pause Animation"}),
            ).toBeVisible();
        });

        it("should toggle the gif playing state when the pause button is clicked", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithGifControls,
            });

            // Act — click Play then Pause
            await userEvent.click(
                screen.getByRole("button", {name: "Play Animation"}),
            );
            await userEvent.click(
                screen.getByRole("button", {name: "Pause Animation"}),
            );

            // Assert — should now show the Play button again
            expect(
                screen.getByRole("button", {name: "Play Animation"}),
            ).toBeVisible();
        });
    });

    describe("flags", () => {
        it("should render gif controls when the feature flag is enabled", () => {
            // Arrange

            const apiOptionsWithFeatureFlag = {
                ...ApiOptions.defaults,
                flags: getFeatureFlags({
                    "image-widget-upgrade-gif-controls": true,
                }),
            };

            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithFeatureFlag,
            });

            // Assert
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            expect(playButton).toBeVisible();
        });

        it("should not render gif controls when the feature flag is disabled", () => {
            // Arrange

            const apiOptionsWithFeatureFlag = {
                ...ApiOptions.defaults,
                flags: getFeatureFlags({
                    "image-widget-upgrade-gif-controls": false,
                }),
            };

            renderModal({
                ...defaultProps,
                backgroundImage: gifImage,
                apiOptions: apiOptionsWithFeatureFlag,
            });

            // Assert
            const playButton = screen.queryByRole("button", {
                name: "Play Animation",
            });
            const pauseButton = screen.queryByRole("button", {
                name: "Pause Animation",
            });
            expect(playButton).not.toBeInTheDocument();
            expect(pauseButton).not.toBeInTheDocument();
        });

        it("should have null content if there is no background image URL with scale flag enabled", () => {
            // Arrange
            const props = {
                ...defaultProps,
                backgroundImage: {
                    url: undefined,
                    width: 100,
                    height: 100,
                },
            };

            const apiOptionsWithFeatureFlag = {
                ...ApiOptions.defaults,
                flags: getFeatureFlags({
                    "image-widget-upgrade-scale": true,
                }),
            };

            // Act
            renderModal({...props, apiOptions: apiOptionsWithFeatureFlag});
            act(() => {
                jest.runAllTimers();
            });

            const title = screen.getByRole("heading", {level: 1});

            // Assert
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent("Explore image and description");
            expect(screen.queryByRole("img")).not.toBeInTheDocument();
            expect(screen.queryByText("Description")).not.toBeInTheDocument();
        });

        it("should still render the modal content if the width is not provided with scale flag enabled", () => {
            // Arrange
            const props = {
                ...defaultProps,
                backgroundImage: {
                    url: earthMoonImage.url,
                    width: undefined,
                    height: 100,
                },
            };

            const apiOptionsWithFeatureFlag = {
                ...ApiOptions.defaults,
                flags: getFeatureFlags({
                    "image-widget-upgrade-scale": true,
                }),
            };

            // Act
            renderModal({...props, apiOptions: apiOptionsWithFeatureFlag});
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const image = screen.getByRole("img");
            expect(image).toBeVisible();
            expect(screen.getByText("Description")).toBeInTheDocument();
            // Make sure image size is not 0
            expect(image).not.toHaveStyle("width: 0px");
            expect(image).not.toHaveStyle("height: 0px");
        });

        it("should still render the modal content if the height is not provided with scale flag enabled", () => {
            // Arrange
            const props = {
                ...defaultProps,
                backgroundImage: {
                    url: earthMoonImage.url,
                    width: 100,
                    height: undefined,
                },
            };

            const apiOptionsWithFeatureFlag = {
                ...ApiOptions.defaults,
                flags: getFeatureFlags({
                    "image-widget-upgrade-scale": true,
                }),
            };

            // Act
            renderModal({...props, apiOptions: apiOptionsWithFeatureFlag});
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const image = screen.getByRole("img");
            expect(image).toBeVisible();
            expect(screen.getByText("Description")).toBeInTheDocument();
            // Make sure image size is not 0
            expect(image).not.toHaveStyle("width: 0px");
            expect(image).not.toHaveStyle("height: 0px");
        });
    });
});
