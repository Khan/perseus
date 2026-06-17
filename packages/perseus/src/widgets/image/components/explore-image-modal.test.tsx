import {act, render, waitFor, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {DependenciesContext} from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {mockImageLoading} from "../../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";
import {
    earthMoonImage,
    animatedGifLandscape,
    nonAnimatedGif,
    decodeGifFrames,
} from "../utils";

import {ExploreImageModal} from "./explore-image-modal";

import type {Interval, Size} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// Decoding lives in the modal content now (via decodeGifFrames in ../utils),
// so we mock the decode directly rather than stubbing fetch + gifuct-js. This
// also avoids colliding with mockImageLoading(), which reassigns global.fetch.
jest.mock("../utils", () => ({
    ...jest.requireActual("../utils"),
    decodeGifFrames: jest.fn(),
}));

// A minimal fake frame from gifuct-js with a 50ms delay.
const fakeFrame = {
    patch: new Uint8ClampedArray(4), // 1x1 RGBA
    delay: 50,
    dims: {width: 1, height: 1, top: 0, left: 0},
    disposalType: 0,
};

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
        stack: ["widget"],
    },
    apiOptions: ApiOptions.defaults,
    isGifPlaying: false,
    setIsGifPlaying: () => {},
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

        // Decode resolves to two fake frames (an animated GIF) by default.
        // eslint-disable-next-line no-restricted-syntax
        (decodeGifFrames as jest.Mock).mockResolvedValue([
            fakeFrame,
            fakeFrame,
        ]);

        // jsdom doesn't implement canvas getContext or ImageData.
        // eslint-disable-next-line no-restricted-syntax
        jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
            putImageData: jest.fn(),
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            imageSmoothingEnabled: true,
        } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D);

        // GifImage (rendered via SvgImage when gif controls are active)
        // calls fetch() to decode GIF frames. jsdom doesn't provide
        // fetch, so we stub it here.
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            }),
        ) as jest.Mock;

        // @ts-expect-error - jsdom doesn't have ImageData
        global.ImageData = class ImageData {
            data: Uint8ClampedArray;
            width: number;
            height: number;
            constructor(
                data: Uint8ClampedArray,
                width: number,
                height: number,
            ) {
                this.data = data;
                this.width = width;
                this.height = height;
            }
        };
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

    it("sets the describedby to short and long description IDs if there is a caption", () => {
        // Arrange, Act
        renderModal({
            ...defaultProps,
            backgroundImage: earthMoonImage,
            caption: "widget caption",
        });

        // Assert
        const dialog = screen.getByRole("dialog");
        // Regex for "uniqueId-caption uniqueId-long-desc"
        expect(dialog.getAttribute("aria-describedby")).toMatch(
            /^:r\w+:-caption :r\w+:-long-desc$/,
        );
    });

    it("sets the describedby to long description ID if there is no caption", () => {
        // Arrange, Act
        renderModal({
            ...defaultProps,
            backgroundImage: earthMoonImage,
            longDescription: "widget long description",
        });

        // Assert
        const dialog = screen.getByRole("dialog");
        const ariaDescribedBy = dialog.getAttribute("aria-describedby");
        // Regex for "uniqueId-long-desc"
        expect(ariaDescribedBy).toMatch(/^:r\w+:-long-desc$/);
        expect(ariaDescribedBy).not.toMatch(/caption/);
    });

    describe("gif controls", () => {
        it("should render gif controls if the image is a multi frame gif", async () => {
            // Arrange, Act — beforeEach decodes the gif into two frames
            renderModal({
                ...defaultProps,
                backgroundImage: animatedGifLandscape,
            });

            // Assert — wait for the async GIF decode to report frame count
            const playButton = await screen.findByRole("button", {
                name: "Play Animation",
            });
            expect(playButton).toBeVisible();
        });

        it("should not render gif controls if the image is a single frame gif", async () => {
            // Arrange
            // eslint-disable-next-line no-restricted-syntax
            (decodeGifFrames as jest.Mock).mockResolvedValue([fakeFrame]);
            //Act
            renderModal({
                ...defaultProps,
                backgroundImage: nonAnimatedGif,
            });

            // Assert
            await waitFor(() => {
                expect(decodeGifFrames).toHaveBeenCalled();
            });

            const playButton = screen.queryByRole("button", {
                name: "Play Animation",
            });
            const pauseButton = screen.queryByRole("button", {
                name: "Pause Animation",
            });
            expect(playButton).not.toBeInTheDocument();
            expect(pauseButton).not.toBeInTheDocument();
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

        it("should show the pause icon when the gif is playing when it is a multi frame gif", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: animatedGifLandscape,
            });

            // Act — the modal starts paused, so click Play first
            const playButton = await screen.findByRole("button", {
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
                backgroundImage: animatedGifLandscape,
                isGifPlaying: false,
            });

            // Act
            const playButton = await screen.findByRole("button", {
                name: "Play Animation",
            });

            // Assert
            expect(playButton).toBeVisible();
        });

        it("should toggle the gif playing state when the play button is clicked when it is a multi frame gif", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: animatedGifLandscape,
            });

            // Act — modal starts paused, click Play
            const playButton = await screen.findByRole("button", {
                name: "Play Animation",
            });
            await userEvent.click(playButton);

            // Assert — should now show the Pause button
            expect(
                screen.getByRole("button", {name: "Pause Animation"}),
            ).toBeVisible();
        });

        it("should toggle the gif playing state when the pause button is clicked when it is a multi frame gif", async () => {
            // Arrange
            renderModal({
                ...defaultProps,
                backgroundImage: animatedGifLandscape,
            });

            // Act — click Play then Pause
            await userEvent.click(
                await screen.findByRole("button", {name: "Play Animation"}),
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
});
