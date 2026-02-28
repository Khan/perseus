/**
 * Asset Loader
 *
 * Loads and caches all game assets (images and audio).
 * Provides progress tracking for loading screens.
 */
import type {AssetManifest} from "../types";

/**
 * Asset loading system
 */
export class AssetLoader {
    private images: Map<string, HTMLImageElement> = new Map();
    private audio: Map<string, HTMLAudioElement> = new Map();
    private loaded: boolean = false;
    private totalAssets: number = 0;
    private loadedAssets: number = 0;

    /**
     * Load all assets from a manifest
     */
    async loadAssets(manifest: AssetManifest): Promise<void> {
        this.totalAssets =
            Object.keys(manifest.images).length +
            Object.keys(manifest.audio).length;
        this.loadedAssets = 0;
        this.loaded = false;

        const imagePromises: Promise<void>[] = [];
        const audioPromises: Promise<void>[] = [];

        // Load images
        for (const [key, url] of Object.entries(manifest.images)) {
            imagePromises.push(this.loadImage(key, url));
        }

        // Load audio
        for (const [key, url] of Object.entries(manifest.audio)) {
            audioPromises.push(this.loadAudio(key, url));
        }

        // Wait for all assets to load
        await Promise.all([...imagePromises, ...audioPromises]);

        this.loaded = true;
    }

    /**
     * Load a single image
     */
    private loadImage(key: string, url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.images.set(key, img);
                this.loadedAssets++;
                resolve();
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${key} from ${url}`);
                this.loadedAssets++;
                reject(new Error(`Failed to load image: ${key}`));
            };

            img.src = url;
        });
    }

    /**
     * Load a single audio file
     */
    private loadAudio(key: string, url: string): Promise<void> {
        return new Promise((resolve) => {
            const audio = new Audio();

            audio.addEventListener("canplaythrough", () => {
                this.audio.set(key, audio);
                this.loadedAssets++;
                resolve();
            }, {once: true});

            audio.addEventListener("error", () => {
                console.error(`Failed to load audio: ${key} from ${url}`);
                this.loadedAssets++;
                resolve(); // Resolve anyway to not block loading
            }, {once: true});

            audio.src = url;
            audio.load();
        });
    }

    /**
     * Get a loaded image by key
     */
    getImage(key: string): HTMLImageElement | null {
        return this.images.get(key) ?? null;
    }

    /**
     * Get a loaded audio element by key
     */
    getAudio(key: string): HTMLAudioElement | null {
        return this.audio.get(key) ?? null;
    }

    /**
     * Check if all assets are loaded
     */
    isLoaded(): boolean {
        return this.loaded;
    }

    /**
     * Get loading progress (0-1)
     */
    getProgress(): number {
        if (this.totalAssets === 0) return 0;
        return this.loadedAssets / this.totalAssets;
    }

    /**
     * Get loading progress as percentage (0-100)
     */
    getProgressPercent(): number {
        return Math.floor(this.getProgress() * 100);
    }

    /**
     * Get loaded asset count
     */
    getLoadedCount(): number {
        return this.loadedAssets;
    }

    /**
     * Get total asset count
     */
    getTotalCount(): number {
        return this.totalAssets;
    }

    /**
     * Check if a specific image is loaded
     */
    hasImage(key: string): boolean {
        return this.images.has(key);
    }

    /**
     * Check if a specific audio is loaded
     */
    hasAudio(key: string): boolean {
        return this.audio.has(key);
    }

    /**
     * Get all loaded image keys
     */
    getImageKeys(): string[] {
        return Array.from(this.images.keys());
    }

    /**
     * Get all loaded audio keys
     */
    getAudioKeys(): string[] {
        return Array.from(this.audio.keys());
    }

    /**
     * Clear all loaded assets
     */
    clear(): void {
        this.images.clear();
        this.audio.clear();
        this.loaded = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }
}
