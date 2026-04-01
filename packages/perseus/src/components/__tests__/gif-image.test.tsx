import {act, render, screen, waitFor} from "@testing-library/react";
import {parseGIF, decompressFrames} from "gifuct-js";
import * as React from "react";

import GifImage from "../gif-image";

jest.mock("gifuct-js");

const GIF_SRC = "https://cdn.kastatic.org/test.gif";

// A minimal fake frame from gifuct-js with a 50ms delay.
const fakeFrame = {
    patch: new Uint8ClampedArray(4), // 1x1 RGBA
    delay: 50,
    dims: {width: 1, height: 1, top: 0, left: 0},
    disposalType: 0,
};

describe("GifImage", () => {
    beforeEach(() => {
        // Make gifuct-js return two fake frames (100ms total loop).
        (parseGIF as jest.Mock).mockReturnValue({});
        (decompressFrames as jest.Mock).mockReturnValue([fakeFrame, fakeFrame]);
        // jsdom doesn't implement canvas getContext or ImageData.
        jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
            putImageData: jest.fn(),
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            imageSmoothingEnabled: true,
        } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D);
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

    it("renders a canvas when paused", () => {
        // Arrange, Act
        render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        // Assert
        expect(screen.getByTestId("gif-canvas")).toBeInTheDocument();
    });

    it("renders a canvas when playing", () => {
        // Arrange, Act
        render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={true}
                onLoop={jest.fn()}
            />,
        );

        // Assert
        expect(screen.getByTestId("gif-canvas")).toBeInTheDocument();
    });

    describe("loop completion", () => {
        it("calls onLoop after all frames have been rendered", async () => {
            // Arrange
            const onLoop = jest.fn();
            render(
                <GifImage
                    src={GIF_SRC}
                    alt="test gif"
                    width={500}
                    height={285}
                    scale={1}
                    isPlaying={true}
                    onLoop={onLoop}
                />,
            );

            // Wait for the fetch → decode promise chain to complete.
            await waitFor(() => {
                expect(decompressFrames).toHaveBeenCalled();
            });

            // Act — advance enough for both 50ms frames to render.
            // RAF fires at ~16ms intervals, so we need enough ticks
            // for two frames plus the initial timestamp capture.
            act(() => {
                jest.advanceTimersByTime(200);
            });

            // Assert
            expect(onLoop).toHaveBeenCalledTimes(1);
        });

        it("does not call onLoop again after pausing", async () => {
            // Arrange
            const onLoop = jest.fn();
            const {rerender} = render(
                <GifImage
                    src={GIF_SRC}
                    alt="test gif"
                    width={500}
                    height={285}
                    scale={1}
                    isPlaying={true}
                    onLoop={onLoop}
                />,
            );

            await waitFor(() => {
                expect(decompressFrames).toHaveBeenCalled();
            });
            act(() => {
                jest.advanceTimersByTime(200);
            });
            expect(onLoop).toHaveBeenCalledTimes(1);

            // Act - pause the GIF
            rerender(
                <GifImage
                    src={GIF_SRC}
                    alt="test gif"
                    width={500}
                    height={285}
                    scale={1}
                    isPlaying={false}
                    onLoop={onLoop}
                />,
            );
            act(() => {
                jest.advanceTimersByTime(200);
            });

            // Assert - onLoop should not have been called again
            expect(onLoop).toHaveBeenCalledTimes(1);
        });
    });

    it("resets to frame 0 after loop completes and is replayed", async () => {
        // Arrange — play through one full loop
        const onLoop = jest.fn();
        const {rerender} = render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={true}
                onLoop={onLoop}
            />,
        );

        await waitFor(() => {
            expect(decompressFrames).toHaveBeenCalled();
        });
        act(() => {
            jest.advanceTimersByTime(200);
        });
        expect(onLoop).toHaveBeenCalledTimes(1);

        // Act — sync parent state to paused, then play again
        rerender(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={onLoop}
            />,
        );
        rerender(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={true}
                onLoop={onLoop}
            />,
        );

        // Advance enough for both frames to render from frame 0.
        act(() => {
            jest.advanceTimersByTime(200);
        });
        // The loop completed a second time — onLoop fires again,
        // confirming it played through both frames from the start.
        expect(onLoop).toHaveBeenCalledTimes(2);
    });

    it("renders the hidden base canvas", () => {
        // Arrange, Act
        render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        // Assert
        const patchCanvas = screen.getByTestId("gif-base-canvas");
        expect(patchCanvas).toBeInTheDocument();
        expect(patchCanvas).not.toBeVisible();
    });

    it("decodes gif frames on mount", async () => {
        // Arrange, Act
        render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        // Assert — wait for the async decode chain to complete.
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(GIF_SRC);
        });
        expect(parseGIF).toHaveBeenCalled();
        expect(decompressFrames).toHaveBeenCalled();
    });

    it("re-decodes frames when src changes", async () => {
        // Arrange
        const {rerender} = render(
            <GifImage
                src={GIF_SRC}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        await waitFor(() => {
            expect(decompressFrames).toHaveBeenCalled();
        });

        // Act — change the src
        const newSrc = "https://cdn.kastatic.org/other.gif";
        rerender(
            <GifImage
                src={newSrc}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        // Assert — wait for the second decode to complete.
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(newSrc);
        });
    });
});
