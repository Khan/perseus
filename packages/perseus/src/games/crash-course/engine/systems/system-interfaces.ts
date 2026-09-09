/**
 * System interfaces for Crash Course game engine
 *
 * These interfaces define the API for reusable game systems.
 */
import type {AudioTrackType, AssetManifest} from "../types";

/**
 * Asset loading system
 */
export interface AssetLoader {
    /**
     * Load all assets defined in the manifest
     */
    loadAssets(manifest: AssetManifest): Promise<void>;

    /**
     * Get a loaded image by key
     */
    getImage(key: string): HTMLImageElement | null;

    /**
     * Get a loaded audio element by key
     */
    getAudio(key: string): HTMLAudioElement | null;

    /**
     * Check if all assets are loaded
     */
    isLoaded(): boolean;

    /**
     * Get loading progress (0-1)
     */
    getProgress(): number;
}

/**
 * Audio management system
 */
export interface AudioSystem {
    /**
     * Register an audio track
     */
    registerTrack(type: AudioTrackType, audio: HTMLAudioElement): void;

    /**
     * Play a specific track type
     */
    play(type: AudioTrackType): void;

    /**
     * Stop all currently playing audio
     */
    stopAll(): void;

    /**
     * Mute/unmute all audio
     */
    setMuted(muted: boolean): void;

    /**
     * Get current mute state
     */
    isMuted(): boolean;

    /**
     * Set volume for all tracks (0-1)
     */
    setVolume(volume: number): void;
}

/**
 * Canvas rendering system
 */
export interface RenderSystem {
    /**
     * Clear the canvas
     */
    clear(): void;

    /**
     * Draw an image at specified position
     */
    drawImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width?: number,
        height?: number,
    ): void;

    /**
     * Draw a sprite with effects (tint, shake, opacity)
     */
    drawSprite(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
        effects?: {
            tint?: string;
            shake?: {x: number; y: number};
            opacity?: number;
        },
    ): void;

    /**
     * Draw text
     */
    drawText(
        text: string,
        x: number,
        y: number,
        options?: {
            font?: string;
            color?: string;
            align?: CanvasTextAlign;
        },
    ): void;

    /**
     * Draw a rectangle
     */
    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
    ): void;

    /**
     * Set global opacity for subsequent draws
     */
    setGlobalAlpha(alpha: number): void;

    /**
     * Save canvas state
     */
    save(): void;

    /**
     * Restore canvas state
     */
    restore(): void;
}
