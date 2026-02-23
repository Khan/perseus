import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {testDependencies} from "../../../testing/test-dependencies";
import {earthMoonImage, gifImage} from "../utils";

import {ExploreImageModal} from "./explore-image-modal";

import type {
    Interval,
    PerseusImageBackground,
    Size,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    backgroundImage: {},
    title: "",
    caption: "",
    alt: "",
    longDescription: "",
    zoomSize: [0, 0] satisfies Size,
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
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render the modal", () => {
        // Arrange

        // act
        render(<ExploreImageModal {...defaultProps} />);

        // Assert
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it.each([
        {
            case: "background image URL",
            backgroundImage: {
                url: undefined,
                width: 100,
                height: 100,
            },
        },
        {
            case: "background image height",
            backgroundImage: {
                url: "image.png",
                width: 100,
                height: undefined,
            },
        },
        {
            case: "background image width",
            backgroundImage: {
                url: "image.png",
                width: undefined,
                height: 100,
            },
        },
    ] satisfies Array<{
        case: string;
        backgroundImage: PerseusImageBackground;
    }>)(
        "should have null content if there is no $case",
        ({backgroundImage}) => {
            // Arrange
            const props = {
                ...defaultProps,
                backgroundImage,
            };

            // Act
            render(<ExploreImageModal {...props} />);
            const title = screen.getByRole("heading", {level: 1});

            // Assert
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent("Explore image and description");
            expect(screen.queryByRole("img")).not.toBeInTheDocument();
            expect(screen.queryByText("Description")).not.toBeInTheDocument();
        },
    );

    it("renders the default title when no title is provided", () => {
        // Arrange

        // Act
        render(<ExploreImageModal {...defaultProps} />);

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Explore image and description");
    });

    it("renders the title if one is provided", () => {
        // Arrange

        // Act
        render(<ExploreImageModal {...defaultProps} title="widget title" />);

        // Assert
        const title = screen.getByRole("heading", {level: 1});
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("widget title");
    });

    it("renders the caption if one is provided", () => {
        // Arrange

        // Act
        render(
            <ExploreImageModal
                {...defaultProps}
                backgroundImage={earthMoonImage}
                caption="widget caption"
            />,
        );

        // Assert
        expect(screen.getByText("widget caption")).toBeInTheDocument();
    });

    it("renders the description", () => {
        // Arrange

        // Act
        render(
            <ExploreImageModal
                {...defaultProps}
                backgroundImage={earthMoonImage}
                longDescription="widget long description"
            />,
        );

        // Assert
        const descriptionLabel = screen.getByText("Description");
        expect(descriptionLabel).toBeInTheDocument();
        expect(screen.getByText("widget long description")).toBeInTheDocument();
    });

    describe("gif controls", () => {
        it("should render gif controls if the image is a gif", () => {
            // Arrange, Act
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    apiOptions={apiOptionsWithGifControls}
                />,
            );

            // Assert
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            expect(playButton).toBeVisible();
        });

        it("should not render gif controls if the image is not a gif", () => {
            // Arrange, Act
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={earthMoonImage}
                    apiOptions={ApiOptions.defaults}
                />,
            );

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
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    isGifPlaying={true}
                    apiOptions={apiOptionsWithGifControls}
                />,
            );

            // Act
            const pauseButton = screen.getByRole("button", {
                name: "Pause Animation",
            });
            expect(pauseButton).toBeVisible();
            await userEvent.click(pauseButton);
        });

        it("should show the play icon when the gif is paused", async () => {
            // Arrange
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    isGifPlaying={false}
                    apiOptions={apiOptionsWithGifControls}
                />,
            );

            // Act
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            await userEvent.click(playButton);
        });

        it("should toggle the gif playing state when the play button is clicked", async () => {
            // Arrange
            const toggleGifPlaying = jest.fn();
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    isGifPlaying={false}
                    setIsGifPlaying={toggleGifPlaying}
                    apiOptions={apiOptionsWithGifControls}
                />,
            );

            // Act
            const playButton = screen.getByRole("button", {
                name: "Play Animation",
            });
            await userEvent.click(playButton);

            // Assert
            expect(toggleGifPlaying).toHaveBeenCalledWith(true);
        });

        it("should toggle the gif playing state when the pause button is clicked", async () => {
            // Arrange
            const toggleGifPlaying = jest.fn();
            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    isGifPlaying={true}
                    setIsGifPlaying={toggleGifPlaying}
                    apiOptions={apiOptionsWithGifControls}
                />,
            );

            // Act
            const pauseButton = screen.getByRole("button", {
                name: "Pause Animation",
            });
            await userEvent.click(pauseButton);

            // Assert
            expect(toggleGifPlaying).toHaveBeenCalledWith(false);
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

            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    apiOptions={apiOptionsWithFeatureFlag}
                />,
            );

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

            render(
                <ExploreImageModal
                    {...defaultProps}
                    backgroundImage={gifImage}
                    apiOptions={apiOptionsWithFeatureFlag}
                />,
            );

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
    });
});
