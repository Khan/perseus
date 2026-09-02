/**
 * Render System
 *
 * Canvas drawing utilities and helpers for rendering game graphics.
 * Provides reusable drawing operations separate from game logic.
 */

/**
 * Canvas rendering system with helper methods
 */
export class RenderSystem {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get 2D context from canvas");
        }
        this.ctx = ctx;
    }

    /**
     * Clear the entire canvas
     */
    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Clear a specific area
     */
    clearRect(x: number, y: number, width: number, height: number): void {
        this.ctx.clearRect(x, y, width, height);
    }

    /**
     * Draw an image at specified position
     */
    drawImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width?: number,
        height?: number,
    ): void {
        if (width !== undefined && height !== undefined) {
            this.ctx.drawImage(image, x, y, width, height);
        } else {
            this.ctx.drawImage(image, x, y);
        }
    }

    /**
     * Draw a sprite with effects
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
    ): void {
        this.ctx.save();

        // Apply opacity
        if (effects?.opacity !== undefined) {
            this.ctx.globalAlpha = effects.opacity;
        }

        // Apply shake
        let drawX = x;
        let drawY = y;
        if (effects?.shake) {
            drawX += effects.shake.x;
            drawY += effects.shake.y;
        }

        // Draw image
        this.ctx.drawImage(image, drawX, drawY, width, height);

        // Apply tint (using a colored rectangle with blend mode)
        if (effects?.tint) {
            this.ctx.fillStyle = effects.tint;
            this.ctx.globalCompositeOperation = "multiply";
            this.ctx.fillRect(drawX, drawY, width, height);
        }

        this.ctx.restore();
    }

    /**
     * Draw parallax background layer
     */
    drawParallaxLayer(
        image: HTMLImageElement,
        offset: number,
        y: number = 0,
        height?: number,
    ): void {
        const imageWidth = image.width;
        const drawHeight = height ?? this.canvas.height;

        // Wrap offset to image width
        const wrappedOffset = offset % imageWidth;

        // Draw first image
        this.ctx.drawImage(
            image,
            -wrappedOffset,
            y,
            imageWidth,
            drawHeight,
        );

        // Draw second image to fill gap
        if (wrappedOffset > 0) {
            this.ctx.drawImage(
                image,
                imageWidth - wrappedOffset,
                y,
                imageWidth,
                drawHeight,
            );
        }
    }

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
            baseline?: CanvasTextBaseline;
            stroke?: boolean;
            strokeColor?: string;
            strokeWidth?: number;
        },
    ): void {
        this.ctx.save();

        // Set text properties
        this.ctx.font = options?.font ?? "16px Arial";
        this.ctx.fillStyle = options?.color ?? "#FFFFFF";
        this.ctx.textAlign = options?.align ?? "left";
        this.ctx.textBaseline = options?.baseline ?? "top";

        // Draw text
        if (options?.stroke) {
            this.ctx.strokeStyle = options.strokeColor ?? "#000000";
            this.ctx.lineWidth = options.strokeWidth ?? 2;
            this.ctx.strokeText(text, x, y);
        }
        this.ctx.fillText(text, x, y);

        this.ctx.restore();
    }

    /**
     * Draw a filled rectangle
     */
    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
    ): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    /**
     * Draw a stroked rectangle
     */
    strokeRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        lineWidth: number = 1,
    ): void {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
    }

    /**
     * Draw a filled circle
     */
    drawCircle(
        x: number,
        y: number,
        radius: number,
        color: string,
    ): void {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * Draw a stroked circle
     */
    strokeCircle(
        x: number,
        y: number,
        radius: number,
        color: string,
        lineWidth: number = 1,
    ): void {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    /**
     * Set global opacity for subsequent draws
     */
    setGlobalAlpha(alpha: number): void {
        this.ctx.globalAlpha = alpha;
    }

    /**
     * Reset global alpha to 1
     */
    resetGlobalAlpha(): void {
        this.ctx.globalAlpha = 1;
    }

    /**
     * Save canvas state
     */
    save(): void {
        this.ctx.save();
    }

    /**
     * Restore canvas state
     */
    restore(): void {
        this.ctx.restore();
    }

    /**
     * Get the canvas context (for advanced operations)
     */
    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    /**
     * Get canvas dimensions
     */
    getDimensions(): {width: number; height: number} {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        };
    }
}
