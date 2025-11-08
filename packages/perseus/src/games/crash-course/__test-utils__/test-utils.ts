/**
 * Test utilities for Crash Course game testing
 */

/**
 * Mock canvas element with 2D context
 */
export function mockCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;

    const ctx = {
        // Drawing methods
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        strokeRect: jest.fn(),
        beginPath: jest.fn(),
        closePath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),

        // Image drawing
        drawImage: jest.fn(),

        // Text
        fillText: jest.fn(),
        strokeText: jest.fn(),
        measureText: jest.fn(() => ({width: 100})),

        // Transforms
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        rotate: jest.fn(),
        scale: jest.fn(),
        transform: jest.fn(),
        setTransform: jest.fn(),

        // Properties
        fillStyle: "#000000",
        strokeStyle: "#000000",
        lineWidth: 1,
        lineCap: "butt",
        lineJoin: "miter",
        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        font: "10px sans-serif",
        textAlign: "start",
        textBaseline: "alphabetic",

        // Gradients and patterns
        createLinearGradient: jest.fn(),
        createRadialGradient: jest.fn(),
        createPattern: jest.fn(),

        // Pixel manipulation
        getImageData: jest.fn(),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
    };

    // Mock getContext to return our mock context
    canvas.getContext = jest.fn((contextType: string) => {
        if (contextType === "2d") {
            return ctx as any;
        }
        return null;
    });

    return canvas;
}

/**
 * Mock audio element
 */
export function mockAudio(): HTMLAudioElement {
    const audio = {
        // Methods
        play: jest.fn().mockResolvedValue(undefined),
        pause: jest.fn(),
        load: jest.fn(),

        // Properties
        currentTime: 0,
        duration: 0,
        volume: 1,
        muted: false,
        paused: true,
        ended: false,
        loop: false,
        src: "",

        // Events
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };

    return audio as any;
}

/**
 * Mock Image element
 */
export function mockImage(src?: string): HTMLImageElement {
    const image = {
        src: src || "",
        width: 128,
        height: 128,
        complete: true,
        addEventListener: jest.fn((event: string, callback: Function) => {
            // Immediately trigger onload for testing
            if (event === "load") {
                setTimeout(() => callback(), 0);
            }
        }),
        removeEventListener: jest.fn(),
    };

    return image as any;
}

/**
 * Advance game time by specified milliseconds
 */
export function advanceGameTime(ms: number): void {
    jest.advanceTimersByTime(ms);
}

/**
 * Setup fake timers for testing
 */
export function setupFakeTimers(): void {
    jest.useFakeTimers();
}

/**
 * Restore real timers after testing
 */
export function restoreTimers(): void {
    jest.useRealTimers();
}

/**
 * Mock requestAnimationFrame for testing
 */
export function mockRequestAnimationFrame(): {
    mock: jest.Mock;
    trigger: () => void;
} {
    let callback: FrameRequestCallback | null = null;
    let frameId = 1;

    const mock = jest.fn((cb: FrameRequestCallback) => {
        callback = cb;
        return frameId++;
    });

    const trigger = () => {
        if (callback) {
            callback(performance.now());
        }
    };

    global.requestAnimationFrame = mock as any;

    return {mock, trigger};
}

/**
 * Mock cancelAnimationFrame for testing
 */
export function mockCancelAnimationFrame(): jest.Mock {
    const mock = jest.fn();
    global.cancelAnimationFrame = mock as any;
    return mock;
}

/**
 * Wait for next tick (useful for async operations)
 */
export function waitForNextTick(): Promise<void> {
    return new Promise((resolve) => setImmediate(resolve));
}

/**
 * Create a mock collision scenario
 */
export function createMockCollision(
    obstacleX: number,
    obstacleWidth: number = 154,
    characterX: number = 100,
    characterWidth: number = 128,
): boolean {
    const collisionZoneX = characterX + characterWidth + 20;
    return obstacleX < collisionZoneX && obstacleX + obstacleWidth > characterX;
}
