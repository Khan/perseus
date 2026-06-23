import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import GifImage from "../gif-image";

import type {ParsedFrame} from "gifuct-js";

// A minimal fake frame from gifuct-js with a 50ms delay. We only populate the
// fields GifImage actually reads, so we cast past the full ParsedFrame shape.
// eslint-disable-next-line no-restricted-syntax
const fakeFrame = {
    patch: new Uint8ClampedArray(4), // 1x1 RGBA
    delay: 50,
    dims: {width: 1, height: 1, top: 0, left: 0},
    disposalType: 0,
} as unknown as ParsedFrame;

// Two fake frames make a 100ms loop.
const fakeFrames: ParsedFrame[] = [fakeFrame, fakeFrame];

describe("GifImage", () => {
    beforeEach(() => {
        // jsdom doesn't implement canvas getContext or ImageData.
        // eslint-disable-next-line no-restricted-syntax
        jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
            putImageData: jest.fn(),
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            imageSmoothingEnabled: true,
        } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D);
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
                gifFrames={fakeFrames}
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
                gifFrames={fakeFrames}
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

    it("calls onLoad once the first frame is drawn", () => {
        // Arrange
        const onLoad = jest.fn();

        // Act
        render(
            <GifImage
                gifFrames={fakeFrames}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
                onLoad={onLoad}
            />,
        );

        // Assert
        expect(onLoad).toHaveBeenCalledTimes(1);
    });

    describe("loop completion", () => {
        it("calls onLoop after all frames have been rendered", () => {
            // Arrange
            const onLoop = jest.fn();
            render(
                <GifImage
                    gifFrames={fakeFrames}
                    alt="test gif"
                    width={500}
                    height={285}
                    scale={1}
                    isPlaying={true}
                    onLoop={onLoop}
                />,
            );

            // Act — advance enough for both 50ms frames to render.
            // RAF fires at ~16ms intervals, so we need enough ticks
            // for two frames plus the initial timestamp capture.
            act(() => {
                jest.advanceTimersByTime(200);
            });

            // Assert
            expect(onLoop).toHaveBeenCalledTimes(1);
        });

        it("does not call onLoop again after pausing", () => {
            // Arrange
            const onLoop = jest.fn();
            const {rerender} = render(
                <GifImage
                    gifFrames={fakeFrames}
                    alt="test gif"
                    width={500}
                    height={285}
                    scale={1}
                    isPlaying={true}
                    onLoop={onLoop}
                />,
            );
            act(() => {
                jest.advanceTimersByTime(200);
            });
            expect(onLoop).toHaveBeenCalledTimes(1);

            // Act - pause the GIF
            rerender(
                <GifImage
                    gifFrames={fakeFrames}
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

    it("resets to frame 0 after loop completes and is replayed", () => {
        // Arrange — play through one full loop
        const onLoop = jest.fn();
        const {rerender} = render(
            <GifImage
                gifFrames={fakeFrames}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={true}
                onLoop={onLoop}
            />,
        );
        act(() => {
            jest.advanceTimersByTime(200);
        });
        expect(onLoop).toHaveBeenCalledTimes(1);

        // Act — sync parent state to paused, then play again
        rerender(
            <GifImage
                gifFrames={fakeFrames}
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
                gifFrames={fakeFrames}
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
                gifFrames={fakeFrames}
                alt="test gif"
                width={500}
                height={285}
                scale={1}
                isPlaying={false}
                onLoop={jest.fn()}
            />,
        );

        // Assert
        const patchCanvas = screen.getByTestId("gif-hidden-canvas");
        expect(patchCanvas).toBeInTheDocument();
        expect(patchCanvas).not.toBeVisible();
    });
});
