/**
 * Crash Course Game Engine
 *
 * Main game engine class that runs the 60fps game loop independently of React.
 * Handles physics, collision detection, sprite animation, and Perseus question integration.
 */
import {AssetLoader} from "./systems/asset-loader";
import {AudioSystem} from "./systems/audio-system";
import {RenderSystem} from "./systems/render-system";
import {PhysicsSystem} from "./systems/physics-system";
import {SpriteManager} from "./sprite-manager";
import {ASSET_MANIFEST} from "./asset-manifest";
import {generateQuestion} from "./question-generator";
import * as CONSTANTS from "./constants";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {PerseusGameEngine} from "../../shared/perseus/perseus-game-engine";
import type {EngineConfig, GameState, GameUIState, Obstacle} from "./types";

/**
 * Main game engine for Crash Course
 */
export class CrashCourseEngine implements PerseusGameEngine {
    // Canvas
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Callbacks
    private onUIUpdate: (state: GameUIState) => void;
    private questionChangeCallback: ((question: PerseusItem | null) => void) | null = null;

    // Game loop
    private animationFrameId: number | null = null;
    private lastTime: number = 0;
    private isRunning: boolean = false;
    private frameCount: number = 0;

    // Game state
    private gameState: GameState = "start";
    private previousGameState: GameState = "start";
    private storyPage: number = 1;
    private score: number = 0;
    private lives: number = 3;
    private gameStartTime: number = 0;
    private showBenevolence: boolean = false;
    private isMuted: boolean = false;

    // Perseus integration
    private currentQuestion: PerseusItem | null = null;

    // Game entities
    private obstacles: Obstacle[] = [];
    private lastSpawnTime: number = 0;

    // Rendering state
    private parallaxOffsets = {
        cityFar: 0,
        citySemiFar: 0,
        citySemiClose: 0,
        cityClose: 0,
    };
    private lampOffset: number = 0;

    // Engine systems
    private assetLoader: AssetLoader;
    private audioSystem: AudioSystem;
    private renderSystem: RenderSystem;
    private physicsSystem: PhysicsSystem;
    private spriteManager: SpriteManager;

    // Sprite IDs
    private characterSpriteId = "character";
    private alienSpriteId = "alien";

    constructor(config: EngineConfig) {
        this.canvas = config.canvas;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get 2D context from canvas");
        }
        this.ctx = ctx;
        this.onUIUpdate = config.onUIUpdate;

        // Initialize systems
        this.assetLoader = new AssetLoader();
        this.audioSystem = new AudioSystem();
        this.renderSystem = new RenderSystem(this.canvas);
        this.physicsSystem = new PhysicsSystem(CONSTANTS.GROUND_Y);
        this.spriteManager = new SpriteManager(this.assetLoader);
    }

    /**
     * Initialize the game engine and load all assets
     */
    async init(): Promise<void> {
        // Load all game assets
        await this.assetLoader.loadAssets(ASSET_MANIFEST);

        // Register audio tracks with the audio system
        const menuAudio = this.assetLoader.getAudio("menu");
        const gameplayAudio = this.assetLoader.getAudio("gameplay");
        const extendedAudio = this.assetLoader.getAudio("extended");
        const gameoverAudio = this.assetLoader.getAudio("gameover");

        if (menuAudio) this.audioSystem.registerTrack("menu", menuAudio);
        if (gameplayAudio)
            this.audioSystem.registerTrack("gameplay", gameplayAudio);
        if (extendedAudio)
            this.audioSystem.registerTrack("extended", extendedAudio);
        if (gameoverAudio)
            this.audioSystem.registerTrack("gameover", gameoverAudio);

        // Set up audio transitions: when gameplay music ends, start extended
        if (gameplayAudio && extendedAudio) {
            this.audioSystem.setupTransition("gameplay", "extended");
        }

        // Create character sprite with animations
        await this.createCharacterSprite();

        console.log("Engine initialized - assets loaded");
    }

    /**
     * Create character sprite with all animations
     */
    private async createCharacterSprite(): Promise<void> {
        // Create character sprite with all animation frames
        await this.spriteManager.create(this.characterSpriteId, {
            frames: ["run1", "run2", "run3", "run4", "run5", "run6", "impact"],
            animations: {
                running: {
                    frames: [0, 1, 2, 3, 4, 5], // run1-run6
                    fps: CONSTANTS.CHARACTER_ANIMATION_FPS,
                    loop: true,
                },
                coolMode: {
                    frames: [0, 1, 2, 3, 4, 5], // run1-run6 (will add purple tint)
                    fps: CONSTANTS.CHARACTER_ANIMATION_FPS,
                    loop: true,
                },
                impact: {
                    frames: [6], // impact frame
                    fps: 1,
                    loop: false,
                },
                loss: {
                    frames: [0], // run1 (character being abducted)
                    fps: 1,
                    loop: false,
                },
            },
            position: {
                x: CONSTANTS.CHARACTER_X,
                y: CONSTANTS.GROUND_Y,
            },
            size: {
                width: CONSTANTS.SPRITE_SIZE,
                height: CONSTANTS.SPRITE_SIZE,
            },
            layer: "character",
        });

        // Start with running animation
        this.spriteManager.play(this.characterSpriteId, "running");
    }

    /**
     * Start the game loop
     */
    start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    /**
     * Stop the game loop and clean up
     */
    stop(): void {
        this.isRunning = false;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        // Clean up systems
        this.audioSystem.cleanup();
        this.spriteManager.clear();
    }

    /**
     * Pause the game
     */
    pause(): void {
        this.isRunning = false;
    }

    /**
     * Resume the game
     */
    resume(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.gameLoop(this.lastTime);
        }
    }

    /**
     * Main game loop - runs at 60fps
     */
    private gameLoop = (currentTime: number): void => {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update game logic
        this.update(deltaTime);

        // Render to canvas
        this.render();

        // Notify React of UI state changes (throttled to ~10fps)
        this.frameCount++;
        if (this.frameCount % 6 === 0) {
            this.notifyUIUpdate();
        }

        // Continue loop
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    };

    /**
     * Update game logic
     */
    private update(deltaTime: number): void {
        // Only update game logic when playing
        if (this.gameState !== "playing") {
            return;
        }

        // Update physics (jumping, character state)
        this.physicsSystem.update(deltaTime);

        // Sync character sprite with physics state
        this.syncCharacterSprite();

        // Update sprite animations
        this.spriteManager.updateAll(deltaTime);

        // Update parallax scrolling
        this.parallaxOffsets.cityFar +=
            CONSTANTS.SCROLL_SPEED * CONSTANTS.PARALLAX_SPEEDS.cityFar;
        this.parallaxOffsets.citySemiFar +=
            CONSTANTS.SCROLL_SPEED * CONSTANTS.PARALLAX_SPEEDS.citySemiFar;
        this.parallaxOffsets.citySemiClose +=
            CONSTANTS.SCROLL_SPEED * CONSTANTS.PARALLAX_SPEEDS.citySemiClose;
        this.parallaxOffsets.cityClose +=
            CONSTANTS.SCROLL_SPEED * CONSTANTS.PARALLAX_SPEEDS.cityClose;
        this.lampOffset += CONSTANTS.SCROLL_SPEED;

        // Update obstacles (move them left)
        const currentTime = Date.now();

        this.obstacles = this.obstacles.filter((obs) => {
            obs.x -= CONSTANTS.SCROLL_SPEED;

            // Check collision if obstacle is in collision zone and not answered
            if (
                !obs.answered &&
                !obs.jumped &&
                this.physicsSystem.checkCollisionZone(obs)
            ) {
                // If character is jumping, mark as jumped
                if (this.physicsSystem.isJumping()) {
                    obs.jumped = true;
                    obs.racing = true;
                    obs.racingStartTime = currentTime;
                }
                // If not jumping and colliding, trigger impact (unless in cool mode)
                else if (this.physicsSystem.getState() !== "coolMode") {
                    const collision = this.physicsSystem.checkCollision(obs);
                    if (collision) {
                        this.physicsSystem.triggerImpact();
                        // TODO: Handle collision consequences
                    }
                }
            }

            // Remove obstacles that are off-screen
            return obs.x + obs.width > 0;
        });

        // Spawn new obstacles
        if (
            currentTime - this.lastSpawnTime >
            CONSTANTS.OBSTACLE_SPAWN_INTERVAL
        ) {
            this.spawnObstacle();
            this.lastSpawnTime = currentTime;
        }

        // Update current question based on closest obstacle
        this.updateCurrentQuestion();

        // Check victory condition (5 minutes elapsed)
        if (currentTime - this.gameStartTime >= CONSTANTS.GAME_DURATION) {
            this.transitionToState("victory");
        }
    }

    /**
     * Render everything to canvas
     */
    private render(): void {
        // Clear canvas
        this.renderSystem.clear();

        // Only render game visuals during playing state
        if (this.gameState !== "playing") {
            return;
        }

        // Draw sky background (static)
        const skyImg = this.assetLoader.getImage("sky");
        if (skyImg) {
            this.renderSystem.drawImage(
                skyImg,
                0,
                0,
                CONSTANTS.CANVAS_WIDTH,
                CONSTANTS.CANVAS_HEIGHT,
            );
        }

        // Draw parallax city layers
        const cityFarImg = this.assetLoader.getImage("cityFar");
        const citySemiFarImg = this.assetLoader.getImage("citySemiFar");
        const citySemiCloseImg = this.assetLoader.getImage("citySemiClose");
        const cityCloseImg = this.assetLoader.getImage("cityClose");

        if (cityFarImg) {
            this.renderSystem.drawParallaxLayer(
                cityFarImg,
                this.parallaxOffsets.cityFar,
                CONSTANTS.PARALLAX_LAYERS.cityFar.y,
                CONSTANTS.PARALLAX_LAYERS.cityFar.height,
            );
        }
        if (citySemiFarImg) {
            this.renderSystem.drawParallaxLayer(
                citySemiFarImg,
                this.parallaxOffsets.citySemiFar,
                CONSTANTS.PARALLAX_LAYERS.citySemiFar.y,
                CONSTANTS.PARALLAX_LAYERS.citySemiFar.height,
            );
        }
        if (citySemiCloseImg) {
            this.renderSystem.drawParallaxLayer(
                citySemiCloseImg,
                this.parallaxOffsets.citySemiClose,
                CONSTANTS.PARALLAX_LAYERS.citySemiClose.y,
                CONSTANTS.PARALLAX_LAYERS.citySemiClose.height,
            );
        }
        if (cityCloseImg) {
            this.renderSystem.drawParallaxLayer(
                cityCloseImg,
                this.parallaxOffsets.cityClose,
                CONSTANTS.PARALLAX_LAYERS.cityClose.y,
                CONSTANTS.PARALLAX_LAYERS.cityClose.height,
            );
        }

        // Draw ground
        this.renderSystem.drawRect(
            0,
            CONSTANTS.GROUND_Y,
            CONSTANTS.CANVAS_WIDTH,
            150,
            "#2a2a2a",
        );

        // Draw streetlamps with lights
        this.drawStreetlamps();

        // Draw obstacles (cars)
        this.drawObstacles();

        // Draw character
        this.drawCharacter();
    }

    /**
     * Draw streetlamps with their lights
     */
    private drawStreetlamps(): void {
        const streetlampImg = this.assetLoader.getImage("streetlamp");
        const lamplightImg = this.assetLoader.getImage("lamplight");

        if (!streetlampImg || !lamplightImg) {
            return;
        }

        // Calculate how many lamps we need to cover the screen plus overflow
        const numLamps =
            Math.ceil(CONSTANTS.CANVAS_WIDTH / CONSTANTS.LAMP_SPACING) + 2;

        for (let i = 0; i < numLamps; i++) {
            const baseX = i * CONSTANTS.LAMP_SPACING;
            const x = baseX - (this.lampOffset % CONSTANTS.LAMP_SPACING);

            // Draw lamplight glow
            this.renderSystem.drawImage(
                lamplightImg,
                x - lamplightImg.width / 2,
                CONSTANTS.GROUND_Y + CONSTANTS.LAMP_LIGHT_Y_OFFSET,
                lamplightImg.width,
                lamplightImg.height,
            );

            // Draw streetlamp
            this.renderSystem.drawImage(
                streetlampImg,
                x - streetlampImg.width / 2,
                CONSTANTS.GROUND_Y - streetlampImg.height,
                streetlampImg.width,
                streetlampImg.height,
            );
        }
    }

    /**
     * Draw obstacles (cars)
     */
    private drawObstacles(): void {
        const carImg = this.assetLoader.getImage("car1");

        if (!carImg) {
            return;
        }

        for (const obs of this.obstacles) {
            // Calculate Y position based on ground
            const carY = CONSTANTS.GROUND_Y - obs.height;

            // Draw car at obstacle position
            this.renderSystem.drawImage(
                carImg,
                obs.x,
                carY,
                obs.width,
                obs.height,
            );
        }
    }

    /**
     * Sync character sprite with physics state
     */
    private syncCharacterSprite(): void {
        const characterPhysics = this.physicsSystem.getCharacterState();
        const characterSprite = this.spriteManager.get(this.characterSpriteId);

        if (!characterSprite) {
            return;
        }

        // Update position to match physics
        characterSprite.setPosition(characterPhysics.x, characterPhysics.y);

        // Update animation based on state
        const currentAnim = characterSprite.getCurrentAnimation();
        const desiredAnim = this.getCharacterAnimation(characterPhysics.state);

        if (currentAnim !== desiredAnim) {
            this.spriteManager.play(this.characterSpriteId, desiredAnim);

            // Add purple tint for cool mode
            if (characterPhysics.state === "coolMode") {
                characterSprite.setEffect({
                    type: "tint",
                    color: CONSTANTS.COOL_MODE_TINT,
                });
            } else {
                characterSprite.clearEffect();
            }
        }
    }

    /**
     * Get animation name for character state
     */
    private getCharacterAnimation(state: CharacterState): string {
        switch (state) {
            case "running":
                return "running";
            case "coolMode":
                return "coolMode";
            case "impact":
                return "impact";
            case "loss":
                return "loss";
            default:
                return "running";
        }
    }

    /**
     * Draw character using sprite system
     */
    private drawCharacter(): void {
        const characterSprite = this.spriteManager.get(this.characterSpriteId);

        if (!characterSprite) {
            return;
        }

        // Draw character sprite
        characterSprite.draw(this.ctx);
    }

    /**
     * Notify React of UI state changes
     */
    private notifyUIUpdate(): void {
        this.onUIUpdate(this.getUIState());
    }

    /**
     * Spawn a new obstacle with a question
     */
    private spawnObstacle(): void {
        const obstacle: Obstacle = {
            id: `obstacle-${Date.now()}-${Math.random()}`,
            x: CONSTANTS.CANVAS_WIDTH,
            y: 0, // Ground level (will adjust in rendering)
            width: CONSTANTS.CAR_WIDTH,
            height: CONSTANTS.CAR_HEIGHT,
            question: generateQuestion(),
            answered: false,
            correct: false,
        };
        this.obstacles.push(obstacle);
    }

    /**
     * Update current question based on closest obstacle
     * Question is shown when obstacle is within threshold distance
     */
    private updateCurrentQuestion(): void {
        const closestObstacle = this.obstacles.find(
            (obs) =>
                !obs.answered && obs.x < CONSTANTS.QUESTION_DISPLAY_DISTANCE,
        );

        // If we have a new obstacle to show, update current question
        if (
            closestObstacle &&
            closestObstacle.question !== this.currentQuestion
        ) {
            this.currentQuestion = closestObstacle.question;
            this.notifyQuestionChange();
        } else if (!closestObstacle && this.currentQuestion !== null) {
            // No more close obstacles, clear question
            this.currentQuestion = null;
            this.notifyQuestionChange();
        }
    }

    /**
     * Get current UI state for React
     */
    private getUIState(): GameUIState {
        return {
            gameState: this.gameState,
            storyPage: this.storyPage,
            score: this.score,
            lives: this.lives,
            gameTime: this.formatGameTime(),
            currentQuestion: this.currentQuestion,
            showBenevolence: this.showBenevolence,
            isMuted: this.isMuted,
        };
    }

    /**
     * Format game time for display
     */
    private formatGameTime(): string {
        if (this.gameState !== "playing" && this.gameState !== "victory") {
            return "11:55:00";
        }

        const elapsed = Date.now() - this.gameStartTime;
        const totalSeconds = Math.floor(elapsed / 1000);
        const minutes = 55 + Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Game lasts 5 minutes (until midnight)
        if (minutes >= 60) {
            return "12:00:00";
        }

        return `11:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    /**
     * Handle user actions from React (button clicks, etc.)
     */
    handleAction(action: string, data?: any): void {
        switch (action) {
            case "startGame":
                this.transitionToState("story");
                break;
            case "nextStoryPage":
                if (this.storyPage < 7) {
                    this.storyPage++;
                } else {
                    this.transitionToState("playing");
                }
                break;
            case "jump":
                // Allow jumping during gameplay
                if (this.gameState === "playing") {
                    this.physicsSystem.jump();
                }
                break;
            case "toggleMute":
                this.isMuted = !this.isMuted;
                this.audioSystem.setMuted(this.isMuted);
                break;
            case "restart":
                this.transitionToState("start");
                break;
            default:
                console.warn(`Unknown action: ${action}`);
        }
    }

    /**
     * Transition to a new game state with proper entry/exit logic
     */
    private transitionToState(newState: GameState): void {
        if (this.gameState === newState) {
            return;
        }

        // Exit current state
        this.exitState(this.gameState);

        // Update state
        this.previousGameState = this.gameState;
        this.gameState = newState;

        // Enter new state
        this.enterState(newState);
    }

    /**
     * Handle state exit logic
     */
    private exitState(state: GameState): void {
        switch (state) {
            case "playing":
                // Clean up gameplay state
                this.obstacles = [];
                this.currentQuestion = null;
                break;
        }
    }

    /**
     * Handle state entry logic
     */
    private enterState(state: GameState): void {
        switch (state) {
            case "start":
                // Reset to menu
                this.storyPage = 1;
                this.score = CONSTANTS.STARTING_SCORE;
                this.lives = CONSTANTS.STARTING_LIVES;
                this.gameStartTime = 0;
                this.lastSpawnTime = 0;
                this.obstacles = [];
                this.currentQuestion = null;
                this.showBenevolence = false;
                this.physicsSystem.reset();
                // Play menu music
                this.audioSystem.play("menu");
                break;

            case "story":
                // Start story sequence
                this.storyPage = 1;
                this.physicsSystem.reset();
                // Start gameplay music when story begins
                this.audioSystem.play("gameplay");
                break;

            case "playing":
                // Start gameplay
                this.gameStartTime = Date.now();
                this.lastSpawnTime = Date.now();
                this.score = CONSTANTS.STARTING_SCORE;
                this.lives = CONSTANTS.STARTING_LIVES;
                this.obstacles = [];
                this.currentQuestion = null;
                this.physicsSystem.resetToRunning();
                // Reset parallax offsets
                this.parallaxOffsets = {
                    cityFar: 0,
                    citySemiFar: 0,
                    citySemiClose: 0,
                    cityClose: 0,
                };
                this.lampOffset = 0;
                // Reset character sprite animation
                this.spriteManager.play(this.characterSpriteId, "running");
                const characterSprite = this.spriteManager.get(
                    this.characterSpriteId,
                );
                if (characterSprite) {
                    characterSprite.clearEffect();
                }
                // Gameplay music should already be playing from story state
                break;

            case "victory":
                // Victory state - music continues playing
                break;

            case "gameover":
                // Game over - play game over music
                this.audioSystem.play("gameover");
                break;

            case "carBonus":
                // Bonus scene (not implemented yet)
                break;
        }
    }

    // Perseus Integration Interface

    /**
     * Get the currently active Perseus question
     */
    getCurrentQuestion(): PerseusItem | null {
        return this.currentQuestion;
    }

    /**
     * Submit an answer to the current question
     */
    submitAnswer(correct: boolean, earnedPoints: number): void {
        if (!this.currentQuestion) {
            return;
        }

        // Find the obstacle with this question
        const obstacle = this.obstacles.find(
            (obs) => obs.question === this.currentQuestion && !obs.answered,
        );

        if (!obstacle) {
            return;
        }

        // Mark obstacle as answered
        obstacle.answered = true;
        obstacle.correct = correct;

        if (correct) {
            // Correct answer: increase score, trigger cool mode
            this.score += earnedPoints;
            this.physicsSystem.triggerCoolMode();
        } else {
            // Incorrect answer: lose a life, trigger alien abduction
            this.lives = Math.max(0, this.lives - 1);
            this.physicsSystem.triggerLoss();
            // TODO: Task 13 - Trigger alien abduction animation

            // Check for game over
            if (this.lives === 0) {
                this.transitionToState("gameover");
            }
        }

        // Clear current question
        this.currentQuestion = null;
        this.notifyQuestionChange();
    }

    /**
     * Register a callback for when the question changes
     */
    onQuestionChange(
        callback: (question: PerseusItem | null) => void,
    ): void {
        this.questionChangeCallback = callback;
    }

    /**
     * Notify React that the question has changed
     */
    private notifyQuestionChange(): void {
        if (this.questionChangeCallback) {
            this.questionChangeCallback(this.currentQuestion);
        }
    }
}
