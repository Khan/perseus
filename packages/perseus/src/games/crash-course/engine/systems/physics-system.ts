/**
 * Physics System
 *
 * Handles physics calculations for the game including:
 * - Character jumping physics
 * - Collision detection
 * - Character state management (running, jumping, coolMode, impact, loss)
 */
import type {CharacterState, CollisionZone, Obstacle} from "../types";

/**
 * Character physics state
 */
export type CharacterPhysics = {
    x: number;
    y: number;
    width: number;
    height: number;
    state: CharacterState;
    isJumping: boolean;
    jumpStartTime: number;
    coolModeEndTime: number;
};

/**
 * Physics system for game mechanics
 */
export class PhysicsSystem {
    private character: CharacterPhysics;
    private groundY: number;

    // Physics constants
    private readonly JUMP_HEIGHT = 140;
    private readonly JUMP_DURATION = 1000; // ms
    private readonly COOL_MODE_DURATION = 2000; // ms
    private readonly CHARACTER_X = 100;
    private readonly SPRITE_SIZE = 128;

    constructor(groundY: number = 450) {
        this.groundY = groundY;
        this.character = {
            x: this.CHARACTER_X,
            y: groundY,
            width: this.SPRITE_SIZE,
            height: this.SPRITE_SIZE,
            state: "running",
            isJumping: false,
            jumpStartTime: 0,
            coolModeEndTime: 0,
        };
    }

    /**
     * Update character physics
     */
    update(deltaTime: number): void {
        const currentTime = Date.now();

        // Update jumping
        if (this.character.isJumping) {
            this.updateJump(currentTime);
        }

        // Update cool mode
        if (
            this.character.state === "coolMode" &&
            currentTime >= this.character.coolModeEndTime
        ) {
            this.character.state = "running";
        }

        // Update character state based on position
        if (!this.character.isJumping && this.character.state === "running") {
            this.character.y = this.groundY;
        }
    }

    /**
     * Update jump physics
     */
    private updateJump(currentTime: number): void {
        const elapsed = currentTime - this.character.jumpStartTime;

        if (elapsed >= this.JUMP_DURATION) {
            // Jump complete
            this.character.isJumping = false;
            this.character.y = this.groundY;
        } else {
            // Calculate jump arc using sine wave
            const progress = elapsed / this.JUMP_DURATION;
            const jumpArc = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
            this.character.y = this.groundY - jumpArc * this.JUMP_HEIGHT;
        }
    }

    /**
     * Start a jump
     */
    jump(): boolean {
        if (this.character.isJumping) {
            return false; // Already jumping
        }

        this.character.isJumping = true;
        this.character.jumpStartTime = Date.now();
        return true;
    }

    /**
     * Trigger cool mode after correct answer
     */
    triggerCoolMode(): void {
        this.character.state = "coolMode";
        this.character.coolModeEndTime = Date.now() + this.COOL_MODE_DURATION;
    }

    /**
     * Trigger impact state
     */
    triggerImpact(): void {
        this.character.state = "impact";
    }

    /**
     * Trigger loss state (alien abduction)
     */
    triggerLoss(): void {
        this.character.state = "loss";
    }

    /**
     * Reset character to running state
     */
    resetToRunning(): void {
        this.character.state = "running";
        this.character.isJumping = false;
        this.character.y = this.groundY;
        this.character.coolModeEndTime = 0;
    }

    /**
     * Get character state
     */
    getCharacterState(): CharacterPhysics {
        return {...this.character};
    }

    /**
     * Get character collision box
     */
    getCharacterCollisionBox(): CollisionZone {
        return {
            x: this.character.x,
            y: this.character.y,
            width: this.character.width,
            height: this.character.height,
        };
    }

    /**
     * Check collision between character and obstacle
     */
    checkCollision(obstacle: Obstacle): boolean {
        const char = this.character;
        const obs = obstacle;

        return (
            char.x < obs.x + obs.width &&
            char.x + char.width > obs.x &&
            char.y < obs.y + obs.height &&
            char.y + char.height > obs.y
        );
    }

    /**
     * Check if character is in collision zone with obstacle
     * Collision zone is slightly ahead of character for better timing
     */
    checkCollisionZone(obstacle: Obstacle): boolean {
        const COLLISION_ZONE_X = this.CHARACTER_X + this.SPRITE_SIZE + 20;
        const COLLISION_ZONE_WIDTH = 100;

        // Check if obstacle is in the collision zone
        return (
            obstacle.x < COLLISION_ZONE_X + COLLISION_ZONE_WIDTH &&
            obstacle.x + obstacle.width > COLLISION_ZONE_X
        );
    }

    /**
     * Check if character successfully jumped over an obstacle
     */
    hasJumpedOver(obstacle: Obstacle): boolean {
        // Character is past the obstacle and was jumping
        return this.character.x > obstacle.x + obstacle.width;
    }

    /**
     * Reset physics system
     */
    reset(): void {
        this.character = {
            x: this.CHARACTER_X,
            y: this.groundY,
            width: this.SPRITE_SIZE,
            height: this.SPRITE_SIZE,
            state: "running",
            isJumping: false,
            jumpStartTime: 0,
            coolModeEndTime: 0,
        };
    }

    /**
     * Get current character Y position
     */
    getCharacterY(): number {
        return this.character.y;
    }

    /**
     * Is character jumping?
     */
    isJumping(): boolean {
        return this.character.isJumping;
    }

    /**
     * Get character state
     */
    getState(): CharacterState {
        return this.character.state;
    }
}
