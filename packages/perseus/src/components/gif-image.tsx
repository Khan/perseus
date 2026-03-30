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
    onLoop?: () => void;
};

/**
 * Renders a GIF using canvas-based frame-by-frame playback.
 *
 * Uses two canvases:
 * - A display canvas (visible) composited and scaled to the display size
 * - A patch canvas (hidden) used to convert per-frame ImageData into a
 *   drawable source for proper alpha compositing via drawImage
 */
const GifImage = (props: Props) => {
    const {src, alt, width, height, scale, isPlaying, onLoop} = props;

    // Decoded GIF frames from gifuct-js
    const framesRef = React.useRef<ParsedFrame[]>([]);
    // The display canvas shown to the user (composited and scaled)
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // A hidden canvas used to convert per-frame patch ImageData into
    // a drawable source for compositing onto the display canvas
    const patchCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // The ID for the gif animation
    const animationIdRef = React.useRef<number | null>(null);
    const currentFrameIndexRef = React.useRef(0);
    // It tracks when the last frame was drawn so we can compare against
    // the current timestamp to know if enough time has passed for the
    // current frame's delay. GIF frames have variable delays (e.g.,
    // frame 1 might be 50ms, frame 2 might be 100ms).
    const lastFrameTimeRef = React.useRef(0);
    // Keep a ref to the latest props so the animation loop (which runs
    // outside of React's render cycle) can read current values without
    // stale closures.
    const latestPropsRef = React.useRef({isPlaying, onLoop});
    latestPropsRef.current = {isPlaying, onLoop};

    // Draw a single frame's patch directly onto the display canvas,
    // using the patch canvas to convert raw pixel data into a
    // drawable source with proper alpha compositing.
    const drawFrame = React.useCallback((index: number) => {
        const frames = framesRef.current;
        const patchCtx = patchCanvasRef.current?.getContext("2d");
        const displayCtx = canvasRef.current?.getContext("2d");
        if (
            !patchCtx ||
            !patchCanvasRef.current ||
            !displayCtx ||
            !canvasRef.current ||
            frames.length === 0
        ) {
            return;
        }

        const frame = frames[index];
        const {dims} = frame;

        // Compute the scale from native GIF resolution to display size.
        const nativeWidth = frames[0].dims.width;
        const nativeHeight = frames[0].dims.height;
        const scaleX = canvasRef.current.width / nativeWidth;
        const scaleY = canvasRef.current.height / nativeHeight;

        // Handle disposal of the previous frame.
        if (index > 0) {
            const prev = frames[index - 1];
            if (prev.disposalType === 2) {
                // Restore to background — clear the previous frame's
                // area, scaled to display coordinates.
                displayCtx.clearRect(
                    prev.dims.left * scaleX,
                    prev.dims.top * scaleY,
                    prev.dims.width * scaleX,
                    prev.dims.height * scaleY,
                );
            }
        }

        // Write the raw patch pixels onto the patch canvas, then
        // composite onto the display canvas using drawImage (which
        // respects alpha blending, unlike putImageData which
        // overwrites pixels — including transparent ones).
        patchCanvasRef.current.width = dims.width;
        patchCanvasRef.current.height = dims.height;
        const imageData = new ImageData(
            new Uint8ClampedArray(frame.patch),
            dims.width,
            dims.height,
        );
        patchCtx.putImageData(imageData, 0, 0);

        displayCtx.imageSmoothingEnabled = true;
        displayCtx.drawImage(
            patchCanvasRef.current,
            dims.left * scaleX,
            dims.top * scaleY,
            dims.width * scaleX,
            dims.height * scaleY,
        );
    }, []);

    // Draw a specific frame without starting playback. Draws frames
    // 0 through the target index so partial patches build up correctly.
    const renderFrame = React.useCallback(
        (index = 0) => {
            const frames = framesRef.current;
            if (
                frames.length === 0 ||
                !canvasRef.current ||
                !patchCanvasRef.current
            ) {
                return;
            }
            const targetIndex = Math.min(index, frames.length - 1);
            currentFrameIndexRef.current = targetIndex;

            // Size the display canvas to the intended display dimensions
            // (props width/height × scale). Using props rather than
            // clientWidth/clientHeight avoids layout-timing issues where
            // the canvas hasn't been laid out yet.
            const {width: nativeWidth, height: nativeHeight} = frames[0].dims;
            const displayWidth = (width ?? nativeWidth) * scale;
            const displayHeight = (height ?? nativeHeight) * scale;
            canvasRef.current.width = displayWidth;
            canvasRef.current.height = displayHeight;

            // Draw frames 0 through target so partial patches composite.
            for (let i = 0; i <= targetIndex; i++) {
                drawFrame(i);
            }
        },
        [width, height, scale, drawFrame],
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

            // On the first callback, just record the timestamp.
            if (lastFrameTimeRef.current < 0) {
                lastFrameTimeRef.current = timestamp;
            }

            const frame = frames[currentFrameIndexRef.current];
            // GIF spec: delay of 0 is treated as 10ms by most decoders.
            const delay = frame.delay <= 0 ? 10 : frame.delay;

            if (timestamp - lastFrameTimeRef.current >= delay) {
                drawFrame(currentFrameIndexRef.current);
                lastFrameTimeRef.current = timestamp;
                currentFrameIndexRef.current++;

                if (currentFrameIndexRef.current >= frames.length) {
                    // Exact loop completion.
                    currentFrameIndexRef.current = 0;
                    latestPropsRef.current.onLoop?.();

                    // onLoop may have paused us (e.g. auto-pause after
                    // one loop). Check before scheduling the next frame.
                    if (!latestPropsRef.current.isPlaying) {
                        animationIdRef.current = null;
                        return;
                    }
                }
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
        // Set to -1 so the first RAF callback always draws immediately,
        // since we don't know the RAF timestamp in advance.
        lastFrameTimeRef.current = -1;
        animationIdRef.current = requestAnimationFrame(animate);
    }, [animate]);

    // Reset to frame 0 and start playing.
    const restart = React.useCallback(() => {
        pause();
        currentFrameIndexRef.current = 0;
        // Clear the display canvas so frame 0 draws from a clean state.
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
            ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height,
            );
        }
        play();
    }, [pause, play]);

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
            <canvas
                aria-label={alt}
                // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
                role="img"
                ref={setCanvasRef}
                data-testid="gif-canvas"
            />
            <canvas
                aria-hidden={true}
                tabIndex={-1}
                ref={patchCanvasRef}
                data-testid="gif-patch-canvas"
                style={{display: "none"}}
            />
        </>
    );
};

export default GifImage;
