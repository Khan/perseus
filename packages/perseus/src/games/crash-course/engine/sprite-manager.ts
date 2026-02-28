/**
 * Sprite Manager
 *
 * Manages all animated sprites in the game with batch operations.
 * Central registry for sprites, batch update/draw, layer management.
 */
import {AnimatedSprite} from "./animated-sprite";
import {SpriteAnimator} from "./sprite-animator";

import type {SpriteConfig} from "./types";

/**
 * Interface for asset loading (will be implemented by AssetLoader)
 */
interface AssetProvider {
    getImage(key: string): HTMLImageElement | null;
}

/**
 * Manages all sprites in the game
 */
export class SpriteManager {
    private sprites: Map<string, AnimatedSprite> = new Map();
    private assetProvider: AssetProvider;

    constructor(assetProvider: AssetProvider) {
        this.assetProvider = assetProvider;
    }

    /**
     * Create a new animated sprite from configuration
     */
    async create(id: string, config: SpriteConfig): Promise<AnimatedSprite> {
        // Load frame images
        const frameImages: HTMLImageElement[] = [];
        for (const frameKey of config.frames) {
            const img = this.assetProvider.getImage(frameKey);
            if (!img) {
                throw new Error(`Image "${frameKey}" not found in assets`);
            }
            frameImages.push(img);
        }

        // Create animator
        const animator = new SpriteAnimator();
        await animator.loadFrames(frameImages);

        // Add animations
        for (const [name, animConfig] of Object.entries(config.animations)) {
            animator.addAnimation(name, animConfig);
        }

        // Create sprite
        const sprite = new AnimatedSprite(
            animator,
            config.position?.x ?? 0,
            config.position?.y ?? 0,
            config.size?.width ?? 128,
            config.size?.height ?? 128,
            config.layer ?? "default",
        );

        // Register sprite
        this.sprites.set(id, sprite);

        return sprite;
    }

    /**
     * Get a sprite by ID
     */
    get(id: string): AnimatedSprite | undefined {
        return this.sprites.get(id);
    }

    /**
     * Check if a sprite exists
     */
    has(id: string): boolean {
        return this.sprites.has(id);
    }

    /**
     * Remove a sprite
     */
    remove(id: string): boolean {
        return this.sprites.delete(id);
    }

    /**
     * Get all sprites in a layer
     */
    getByLayer(layer: string): AnimatedSprite[] {
        return Array.from(this.sprites.values()).filter(
            (sprite) => sprite.layer === layer,
        );
    }

    /**
     * Get all sprite IDs
     */
    getAllIds(): string[] {
        return Array.from(this.sprites.keys());
    }

    /**
     * Get all sprites
     */
    getAll(): AnimatedSprite[] {
        return Array.from(this.sprites.values());
    }

    /**
     * Update all sprites
     */
    updateAll(deltaTime: number): void {
        for (const sprite of this.sprites.values()) {
            sprite.update(deltaTime);
        }
    }

    /**
     * Draw all sprites with layer ordering
     */
    drawByLayers(
        ctx: CanvasRenderingContext2D,
        layerOrder: string[],
    ): void {
        for (const layer of layerOrder) {
            const sprites = this.getByLayer(layer);
            for (const sprite of sprites) {
                sprite.draw(ctx);
            }
        }
    }

    /**
     * Draw all sprites (no layer ordering)
     */
    drawAll(ctx: CanvasRenderingContext2D): void {
        for (const sprite of this.sprites.values()) {
            sprite.draw(ctx);
        }
    }

    /**
     * Clear all sprites
     */
    clear(): void {
        this.sprites.clear();
    }

    /**
     * Get sprite count
     */
    count(): number {
        return this.sprites.size;
    }

    /**
     * Play animation on a sprite
     */
    play(id: string, animationName: string, restart: boolean = false): void {
        const sprite = this.get(id);
        if (sprite) {
            sprite.play(animationName, restart);
        }
    }

    /**
     * Stop animation on a sprite
     */
    stop(id: string): void {
        const sprite = this.get(id);
        if (sprite) {
            sprite.stop();
        }
    }

    /**
     * Set position of a sprite
     */
    setPosition(id: string, x: number, y: number): void {
        const sprite = this.get(id);
        if (sprite) {
            sprite.setPosition(x, y);
        }
    }

    /**
     * Move a sprite by delta
     */
    moveBy(id: string, dx: number, dy: number): void {
        const sprite = this.get(id);
        if (sprite) {
            sprite.moveBy(dx, dy);
        }
    }

    /**
     * Set visibility of a sprite
     */
    setVisible(id: string, visible: boolean): void {
        const sprite = this.get(id);
        if (sprite) {
            sprite.visible = visible;
        }
    }

    /**
     * Check collision between two sprites
     */
    checkCollision(id1: string, id2: string): boolean {
        const sprite1 = this.get(id1);
        const sprite2 = this.get(id2);
        if (!sprite1 || !sprite2) return false;
        return sprite1.overlaps(sprite2);
    }
}
