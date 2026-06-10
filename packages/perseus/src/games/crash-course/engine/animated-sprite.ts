/**
 * Animated Sprite
 *
 * High-level sprite entity that combines position, size, and animation.
 * Makes working with sprites easier by handling position + drawing together.
 */
import {SpriteAnimator} from "./sprite-animator";

import type {SpriteEffect} from "./types";

/**
 * A sprite entity with position, size, and animation
 */
export class AnimatedSprite {
    // Position and size
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    // Rendering
    public layer: string;
    public opacity: number = 1;
    public visible: boolean = true;

    // Animation
    private animator: SpriteAnimator;

    constructor(
        animator: SpriteAnimator,
        x: number = 0,
        y: number = 0,
        width: number = 128,
        height: number = 128,
        layer: string = "default",
    ) {
        this.animator = animator;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.layer = layer;
    }

    /**
     * Play an animation
     */
    play(name: string, restart: boolean = false): void {
        this.animator.play(name, restart);
    }

    /**
     * Stop the animation
     */
    stop(): void {
        this.animator.stop();
    }

    /**
     * Pause the animation
     */
    pause(): void {
        this.animator.pause();
    }

    /**
     * Resume the animation
     */
    resume(): void {
        this.animator.resume();
    }

    /**
     * Update the animation
     */
    update(deltaTime: number): void {
        this.animator.update(deltaTime);
    }

    /**
     * Draw the sprite to a canvas context
     */
    draw(ctx: CanvasRenderingContext2D): void {
        if (!this.visible) return;

        const frame = this.animator.getCurrentFrame();
        if (!frame) return;

        const effect = this.animator.getEffect();

        ctx.save();

        // Apply opacity
        ctx.globalAlpha = this.opacity;

        // Apply effects
        if (effect) {
            this.applyEffect(ctx, effect);
        }

        // Draw the sprite
        ctx.drawImage(frame, this.x, this.y, this.width, this.height);

        ctx.restore();
    }

    /**
     * Apply visual effects
     */
    private applyEffect(
        ctx: CanvasRenderingContext2D,
        effect: SpriteEffect,
    ): void {
        if (!effect) return;

        switch (effect.type) {
            case "shake":
                this.x += (Math.random() - 0.5) * effect.intensity;
                this.y += (Math.random() - 0.5) * effect.intensity;
                break;

            case "tint":
                ctx.fillStyle = effect.color;
                ctx.globalCompositeOperation = "multiply";
                break;

            case "opacity":
                ctx.globalAlpha *= effect.value;
                break;
        }
    }

    /**
     * Set a visual effect
     */
    setEffect(effect: SpriteEffect): void {
        this.animator.setEffect(effect);
    }

    /**
     * Clear the effect
     */
    clearEffect(): void {
        this.animator.clearEffect();
    }

    /**
     * Get bounding box for collision detection
     */
    getBoundingBox(): {x: number; y: number; width: number; height: number} {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    /**
     * Check if this sprite overlaps with another
     */
    overlaps(other: AnimatedSprite): boolean {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    /**
     * Check if a point is inside this sprite
     */
    containsPoint(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }

    /**
     * Get the center point of the sprite
     */
    getCenter(): {x: number; y: number} {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        };
    }

    /**
     * Set position
     */
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Move by delta
     */
    moveBy(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    /**
     * Get current animation name
     */
    getCurrentAnimation(): string | null {
        return this.animator.getCurrentAnimationName();
    }

    /**
     * Check if animating
     */
    isAnimating(): boolean {
        return this.animator.isAnimating();
    }
}
