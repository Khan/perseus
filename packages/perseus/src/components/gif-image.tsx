import {parseGIF, decompressFrames} from "gifuct-js";
import * as React from "react";

import type {ParsedFrame} from "gifuct-js";

/**
 * Fetches a GIF and decodes it into individual frames using gifuct-js.
 * Returns the parsed frames array, which includes per-frame pixel data,
 * delay, dimensions, and disposal type.
 */
async function decodeGifFrames(src: string): Promise<ParsedFrame[]> {
    const res = await fetch(src);
    if (!res.ok) {
        return [];
    }

    const buffer = await res.arrayBuffer();
    const gif = parseGIF(buffer);
    return decompressFrames(gif, true);
}

type Props = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    scale: number;
    isPlaying: boolean;
    /**
     * Called when the GIF finishes one full loop.
     */
    onLoop: () => void;
};

/**
 * Renders a GIF using canvas-based frame-by-frame playback.
 *
 * Uses two canvases:
 * - A display canvas (visible) composited and scaled to the display size
 * - A hidden canvas (hidden) used to convert per-frame ImageData into a
 *   drawable source for proper alpha compositing via drawImage
 *
 * This is similar to the approach taken by gifuct-js's own demo:
 * https://github.com/matt-way/gifuct-js/blob/master/demo/demo.js
 *
 * Why are we taking this approach? Because browsers don't natively
 * support pausing/resuming GIF animations, and we need that for our GIF
 * images. By decoding the GIF into frames and controlling the playback
 * via requestAnimationFrame, we can:
 * - "Pause" GIFs (i.e. show a static image).
 * - "Play" GIFs (i.e. animate).
 * - Detect when we have looped the animation.
 */
const GifImage = (props: Props) => {
    const {src, alt, width, height, scale, isPlaying, onLoop} = props;

    // Decoded GIF frames from gifuct-js
    const framesRef = React.useRef<ParsedFrame[]>([]);
    // The display canvas shown to the user (composited and scaled)
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // A hidden canvas used to convert per-frame ImageData into
    // a drawable source for compositing onto the display canvas
    const hiddenCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // The ID for the gif animation
    const animationIdRef = React.useRef<number | null>(null);
    const currentFrameIndexRef = React.useRef(0);
    // It tracks when the last frame was drawn so we can compare against
    // the current timestamp to know if enough time has passed for the
    // current frame's delay. GIF frames have variable delays (e.g.,
    // frame 1 might be 50ms, frame 2 might be 100ms).
    const lastFrameTimeRef = React.useRef<number | null>(null);
    // Keep a ref to the latest props so the animation loop (which runs
    // outside of React's render cycle) can read current values without
    // stale closures.
    const latestPropsRef = React.useRef({isPlaying, onLoop});
    latestPropsRef.current = {isPlaying, onLoop};

    // Draw a single frame's patch directly onto the display canvas,
    // using the hidden canvas to convert raw pixel data into a
    // drawable source with proper alpha compositing.
    const drawFrame = React.useCallback((index: number) => {
        const frames = framesRef.current;
        const hiddenCtx = hiddenCanvasRef.current?.getContext("2d");
        const displayCtx = canvasRef.current?.getContext("2d");
        if (
            !hiddenCtx ||
            !hiddenCanvasRef.current ||
            !displayCtx ||
            !canvasRef.current ||
            frames.length === 0
        ) {
            return;
        }

        const frame = frames[index];
        const {dims} = frame;

        // Handle disposal of the previous frame.
        if (index > 0) {
            const prev = frames[index - 1];
            if (prev.disposalType === 2) {
                // Restore to background — clear the previous frame's area.
                displayCtx.clearRect(
                    prev.dims.left,
                    prev.dims.top,
                    prev.dims.width,
                    prev.dims.height,
                );
            }
        }

        // Write the raw patch pixels onto the hidden canvas, then
        // composite onto the display canvas using drawImage (which
        // respects alpha blending, unlike putImageData which
        // overwrites pixels — including transparent ones).
        hiddenCanvasRef.current.width = dims.width;
        hiddenCanvasRef.current.height = dims.height;
        const imageData = new ImageData(
            new Uint8ClampedArray(frame.patch),
            dims.width,
            dims.height,
        );
        hiddenCtx.putImageData(imageData, 0, 0);

        displayCtx.drawImage(hiddenCanvasRef.current, dims.left, dims.top);
    }, []);

    // Draw a specific frame without starting playback. Draws frames
    // 0 through the target index so partial patches build up correctly.
    const renderFrame = React.useCallback(
        (index = 0) => {
            const frames = framesRef.current;
            if (
                frames.length === 0 ||
                !canvasRef.current ||
                !hiddenCanvasRef.current
            ) {
                return;
            }
            const targetIndex = Math.min(index, frames.length - 1);
            currentFrameIndexRef.current = targetIndex;

            // Size the canvas buffer to the native GIF resolution.
            // Display scaling is handled by CSS width/height on the
            // canvas element, so no manual scaling is needed here.
            const {width: nativeWidth, height: nativeHeight} = frames[0].dims;
            canvasRef.current.width = nativeWidth;
            canvasRef.current.height = nativeHeight;

            // Draw frames 0 through target so partial patches composite.
            for (let i = 0; i <= targetIndex; i++) {
                drawFrame(i);
            }
        },
        [drawFrame],
    );

    // Cancel the animation loop. The canvas retains the last drawn frame.
    const pause = React.useCallback(() => {
        if (animationIdRef.current !== null) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }
    }, []);

    // The requestAnimationFrame callback that drives GIF playback.
    const animate = React.useCallback(
        (timestamp: number) => {
            const frames = framesRef.current;
            if (frames.length === 0) {
                return;
            }

            // On the first callback, record the baseline timestamp and
            // draw the current frame immediately so there's no delay
            // before the first visible frame.
            if (lastFrameTimeRef.current === null) {
                lastFrameTimeRef.current = timestamp;
                drawFrame(currentFrameIndexRef.current);
            }

            const frame = frames[currentFrameIndexRef.current];
            // GIF spec: delay of 0 is treated as 10ms by most decoders.
            const delay = frame.delay <= 0 ? 10 : frame.delay;

            if (timestamp - lastFrameTimeRef.current >= delay) {
                // Advance to the next frame.
                currentFrameIndexRef.current++;

                if (currentFrameIndexRef.current >= frames.length) {
                    // Loop complete — notify parent.
                    currentFrameIndexRef.current = 0;
                    animationIdRef.current = null;
                    latestPropsRef.current.onLoop();
                    return;
                }

                drawFrame(currentFrameIndexRef.current);
                // Advance by the scheduled delay rather than snapping to
                // the current timestamp. This prevents timing drift when
                // RAF callbacks fire late.
                lastFrameTimeRef.current = lastFrameTimeRef.current + delay;
            }

            animationIdRef.current = requestAnimationFrame(animate);
        },
        [drawFrame],
    );

    // Start the requestAnimationFrame loop from the current frame.
    const play = React.useCallback(() => {
        if (framesRef.current.length === 0) {
            return;
        }
        // Reset to null so the first RAF callback records the baseline
        // timestamp and draws the current frame immediately.
        lastFrameTimeRef.current = null;
        animationIdRef.current = requestAnimationFrame(animate);
    }, [animate]);

    // Reset to frame 0 and start playing.
    const restart = React.useCallback(() => {
        pause();
        // Render frame 0 immediately so the canvas is never blank
        // between clearing and the first RAF callback.
        renderFrame(0);
        play();
    }, [pause, renderFrame, play]);

    // Load and decode GIF frames on mount and when src changes.
    React.useEffect(() => {
        let mounted = true;

        decodeGifFrames(src)
            .then((frames) => {
                if (!mounted) {
                    return;
                }
                framesRef.current = frames;

                // Show the first frame on the canvas.
                renderFrame(0);

                if (latestPropsRef.current.isPlaying) {
                    play();
                }
            })
            .catch(() => {});

        return () => {
            mounted = false;
            pause();
            framesRef.current = [];
        };
        // Only re-run when src changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    // Handle play/pause transitions.
    const prevIsPlayingRef = React.useRef(isPlaying);
    React.useEffect(() => {
        const wasPlaying = prevIsPlayingRef.current;
        prevIsPlayingRef.current = isPlaying;

        if (isPlaying && !wasPlaying) {
            // When transitioning to playing: if the loop had completed
            // (frame index is 0), restart from the beginning. Otherwise
            // resume from the current frame.
            if (currentFrameIndexRef.current === 0) {
                restart();
            } else {
                play();
            }
        }

        if (!isPlaying && wasPlaying) {
            // When transitioning to paused, stop the animation loop.
            // If the loop completed (frame index reset to 0), show
            // frame 0. Otherwise it was a manual pause — keep the
            // current frame.
            pause();
            if (currentFrameIndexRef.current === 0) {
                renderFrame(0);
            }
        }
    }, [isPlaying, restart, play, pause, renderFrame]);

    // Cleanup on unmount.
    React.useEffect(() => {
        return () => {
            pause();
        };
    }, [pause]);

    // Callback ref for the display canvas. Renders the first frame
    // immediately when mounted so there's no flash of empty canvas.
    const setCanvasRef = React.useCallback(
        (canvas: HTMLCanvasElement | null) => {
            canvasRef.current = canvas;
            if (canvas && framesRef.current.length > 0) {
                renderFrame(0);
            }
        },
        [renderFrame],
    );

    return (
        <>
            {/* Two canvases are needed because there is no canvas API
                that writes raw pixel data (ImageData) with alpha
                compositing. putImageData overwrites pixels directly
                (including transparent ones), while drawImage composites
                properly. So we putImageData onto the hidden
                canvas, then drawImage it onto this display canvas. */}

            {/* Display canvas: the visible, composited GIF output
                scaled to the display dimensions. Each frame is drawn
                here via drawImage, which respects alpha blending. */}
            <canvas
                aria-label={alt}
                // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
                role="img"
                ref={setCanvasRef}
                data-testid="gif-canvas"
                style={{
                    width: width ? width * scale : undefined,
                    height: height ? height * scale : undefined,
                }}
            />
            {/* Base canvas: a hidden canvas that acts as a bridge
                between putImageData (the only way to write raw RGBA
                frame data) and drawImage (which composites with alpha).
                Each frame's pixel data is written here first, then
                drawn onto the display canvas above. */}
            <canvas
                aria-hidden={true}
                tabIndex={-1}
                ref={hiddenCanvasRef}
                data-testid="gif-hidden-canvas"
                style={{display: "none"}}
            />
        </>
    );
};

export default GifImage;
