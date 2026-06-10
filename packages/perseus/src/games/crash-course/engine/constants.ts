/**
 * Game Constants
 *
 * Central location for all game configuration values.
 * Makes it easy to tune gameplay and maintain consistency.
 */

/**
 * Canvas dimensions
 */
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

/**
 * Ground and positioning
 */
export const GROUND_Y = 450;
export const CHARACTER_X = 100;
export const SPRITE_SIZE = 128;

/**
 * Physics constants
 */
export const JUMP_HEIGHT = 140;
export const JUMP_DURATION = 1000; // milliseconds
export const SCROLL_SPEED = 2; // pixels per frame

/**
 * Gameplay timing
 */
export const OBSTACLE_SPAWN_INTERVAL = 5000; // milliseconds
export const COOL_MODE_DURATION = 2000; // milliseconds
export const GAME_DURATION = 300000; // 5 minutes in milliseconds

/**
 * Collision detection
 */
export const COLLISION_ZONE_X = CHARACTER_X + SPRITE_SIZE + 20;
export const COLLISION_ZONE_WIDTH = 100;
export const QUESTION_DISPLAY_DISTANCE = 700; // Show question when obstacle is this close

/**
 * Parallax scrolling speeds (relative to SCROLL_SPEED)
 */
export const PARALLAX_SPEEDS = {
    cityFar: 0.2,
    citySemiFar: 0.4,
    citySemiClose: 0.6,
    cityClose: 0.8,
} as const;

/**
 * Parallax layer Y positions and heights
 */
export const PARALLAX_LAYERS = {
    cityFar: {y: 250, height: 200},
    citySemiFar: {y: 300, height: 150},
    citySemiClose: {y: 350, height: 100},
    cityClose: {y: 380, height: 70},
} as const;

/**
 * Streetlamp configuration
 */
export const LAMP_SPACING = 500;
export const LAMP_LIGHT_Y_OFFSET = -300;

/**
 * Obstacle (car) configuration
 */
export const CAR_WIDTH = 154; // 256 * 0.6 scale
export const CAR_HEIGHT = 154;

/**
 * Character animation FPS
 */
export const CHARACTER_ANIMATION_FPS = 8;

/**
 * Initial player stats
 */
export const STARTING_LIVES = 3;
export const STARTING_SCORE = 0;

/**
 * Cool mode effect color
 */
export const COOL_MODE_TINT = "#9370DB"; // Medium purple
