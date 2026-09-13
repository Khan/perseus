/**
 * Sprite Animator
 *
 * Low-level animation controller for frame sequencing.
 * Handles frame timing, looping, and effects for sprite animations.
 */
import type {SpriteAnimationConfig, SpriteEffect} from "./types";

/**
 * Low-level sprite animation controller
 */
export class SpriteAnimator {
    private frames: HTMLImageElement[] = [];
    private animations: Map<string, SpriteAnimationConfig> = new Map();
    private currentAnimation: string | null = null;
    private currentFrameIndex: number = 0;
    private frameTime: number = 0;
    private frameDuration: number = 125; // Default 8fps (1000ms / 8)
    private isPlaying: boolean = false;
    private loop: boolean = true;
    private onComplete: (() => void) | null = null;
    private effect: SpriteEffect = null;

    /**
     * Load individual frame images
     */
    async loadFrames(images: HTMLImageElement[]): Promise<void> {
        this.frames = images;
    }

    /**
     * Load frames from a spritesheet
     * @param image - The spritesheet image
     * @param config - Grid configuration {cols, rows, frameWidth, frameHeight}
     */
    async loadSpritesheet(
        image: HTMLImageElement,
        config: {
            cols: number;
            rows: number;
            frameWidth: number;
            frameHeight: number;
        },
    ): Promise<void> {
        const {cols, rows, frameWidth, frameHeight} = config;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get 2D context");
        }

        canvas.width = frameWidth;
        canvas.height = frameHeight;

        this.frames = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                ctx.clearRect(0, 0, frameWidth, frameHeight);
                ctx.drawImage(
                    image,
                    col * frameWidth,
                    row * frameHeight,
                    frameWidth,
                    frameHeight,
                    0,
                    0,
                    frameWidth,
                    frameHeight,
                );

                const frameImage = new Image();
                frameImage.src = canvas.toDataURL();
                await new Promise<void>((resolve) => {
                    frameImage.onload = () => resolve();
                });
                this.frames.push(frameImage);
            }
        }
    }

    /**
     * Define a named animation sequence
     */
    addAnimation(name: string, config: SpriteAnimationConfig): void {
        this.animations.set(name, {
            frames: config.frames,
            fps: config.fps ?? 8,
            loop: config.loop ?? true,
            onComplete: config.onComplete,
        });
    }

    /**
     * Play an animation
     */
    play(name: string, restart: boolean = false): void {
        if (!this.animations.has(name)) {
            console.warn(`Animation "${name}" not found`);
            return;
        }

        if (this.currentAnimation === name && !restart) {
            return; // Already playing this animation
        }

        const anim = this.animations.get(name)!;
        this.currentAnimation = name;
        this.currentFrameIndex = 0;
        this.frameTime = 0;
        this.frameDuration = 1000 / anim.fps;
        this.loop = anim.loop;
        this.onComplete = anim.onComplete ?? null;
        this.isPlaying = true;
    }

    /**
     * Stop the current animation
     */
    stop(): void {
        this.isPlaying = false;
        this.currentAnimation = null;
        this.currentFrameIndex = 0;
    }

    /**
     * Pause the animation
     */
    pause(): void {
        this.isPlaying = false;
    }

    /**
     * Resume the animation
     */
    resume(): void {
        if (this.currentAnimation) {
            this.isPlaying = true;
        }
    }

    /**
     * Update animation (call every frame with deltaTime)
     */
    update(deltaTime: number): void {
        if (!this.isPlaying || !this.currentAnimation) {
            return;
        }

        this.frameTime += deltaTime;

        if (this.frameTime >= this.frameDuration) {
            this.frameTime -= this.frameDuration;
            this.advanceFrame();
        }
    }

    /**
     * Advance to the next frame
     */
    private advanceFrame(): void {
        if (!this.currentAnimation) {
            return;
        }

        const anim = this.animations.get(this.currentAnimation)!;
        this.currentFrameIndex++;

        if (this.currentFrameIndex >= anim.frames.length) {
            if (this.loop) {
                this.currentFrameIndex = 0;
            } else {
                // Animation complete
                this.currentFrameIndex = anim.frames.length - 1;
                this.isPlaying = false;
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }
    }

    /**
     * Get the current frame image
     */
    getCurrentFrame(): HTMLImageElement | null {
        if (!this.currentAnimation) {
            return this.frames[0] ?? null;
        }

        const anim = this.animations.get(this.currentAnimation);
        if (!anim) {
            return null;
        }

        const frameIndex = anim.frames[this.currentFrameIndex];
        return this.frames[frameIndex] ?? null;
    }

    /**
     * Set a visual effect
     */
    setEffect(effect: SpriteEffect): void {
        this.effect = effect;
    }

    /**
     * Get current effect
     */
    getEffect(): SpriteEffect {
        return this.effect;
    }

    /**
     * Clear the effect
     */
    clearEffect(): void {
        this.effect = null;
    }

    /**
     * Check if currently playing
     */
    isAnimating(): boolean {
        return this.isPlaying;
    }

    /**
     * Get current animation name
     */
    getCurrentAnimationName(): string | null {
        return this.currentAnimation;
    }
}
