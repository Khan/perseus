/**
 * Type definitions for Crash Course game engine
 */
import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Game state types
 */
export type GameState =
    | "start"
    | "story"
    | "playing"
    | "carBonus"
    | "gameover"
    | "victory";

/**
 * Character animation states
 */
export type CharacterState = "running" | "coolMode" | "impact" | "loss";

/**
 * UI state that React needs for rendering
 */
export type GameUIState = {
    gameState: GameState;
    storyPage: number;
    score: number;
    lives: number;
    gameTime: string;
    currentQuestion: PerseusItem | null;
    showBenevolence: boolean;
    isMuted: boolean;
};

/**
 * Obstacle in the game
 */
export type Obstacle = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    question: PerseusItem;
    answered: boolean;
    correct: boolean;
    jumped?: boolean;
    racing?: boolean;
    racingStartTime?: number;
};

/**
 * Configuration for engine initialization
 */
export type EngineConfig = {
    canvas: HTMLCanvasElement;
    onUIUpdate: (state: GameUIState) => void;
};

/**
 * Sprite animation configuration
 */
export type SpriteAnimationConfig = {
    frames: number[];
    fps?: number;
    loop?: boolean;
    onComplete?: () => void;
};

/**
 * Sprite effect types
 */
export type SpriteEffect =
    | {type: "shake"; intensity: number; duration: number}
    | {type: "tint"; color: string}
    | {type: "opacity"; value: number}
    | null;

/**
 * Sprite configuration for creating animated sprites
 */
export type SpriteConfig = {
    frames: string[]; // URLs or keys of loaded images
    animations: Record<string, SpriteAnimationConfig>;
    position?: {x: number; y: number};
    size?: {width: number; height: number};
    layer?: string; // For z-ordering
};

/**
 * Asset manifest - defines all assets to load
 */
export type AssetManifest = {
    images: Record<string, string>; // key -> URL
    audio: Record<string, string>; // key -> URL
};

/**
 * Collision zone definition
 */
export type CollisionZone = {
    x: number;
    y: number;
    width: number;
    height: number;
};

/**
 * Audio track types
 */
export type AudioTrackType = "menu" | "gameplay" | "extended" | "gameover";

/**
 * Game constants
 */
export const GAME_CONSTANTS = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    GROUND_Y: 450,
    SCROLL_SPEED: 2,
    CHARACTER_X: 100,
    SPRITE_SIZE: 128,
    JUMP_HEIGHT: 140,
    JUMP_DURATION: 1000,
    OBSTACLE_SPAWN_INTERVAL: 5000,
    COLLISION_ZONE_X: 248, // CHARACTER_X + CHARACTER_WIDTH + 20
    COOL_MODE_DURATION: 2000,
    LAMP_SPACING: 500,
    GAME_DURATION: 300000, // 5 minutes
} as const;
