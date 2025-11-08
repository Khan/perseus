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

    // Engine systems
    private assetLoader: AssetLoader;
    private audioSystem: AudioSystem;
    private renderSystem: RenderSystem;
    private physicsSystem: PhysicsSystem;
    private spriteManager: SpriteManager;

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
        this.physicsSystem = new PhysicsSystem(450); // Ground Y = 450
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

        console.log("Engine initialized - assets loaded");
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

        // Update sprite animations
        this.spriteManager.updateAll(deltaTime);

        // Update obstacles (move them left)
        const SCROLL_SPEED = 2;
        const currentTime = Date.now();

        this.obstacles = this.obstacles.filter((obs) => {
            obs.x -= SCROLL_SPEED;

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
        const OBSTACLE_SPAWN_INTERVAL = 5000;
        if (currentTime - this.lastSpawnTime > OBSTACLE_SPAWN_INTERVAL) {
            this.spawnObstacle();
            this.lastSpawnTime = currentTime;
        }

        // Update current question based on closest obstacle
        this.updateCurrentQuestion();

        // Check victory condition (5 minutes elapsed)
        const GAME_DURATION = 300000; // 5 minutes
        if (currentTime - this.gameStartTime >= GAME_DURATION) {
            this.transitionToState("victory");
        }
    }

    /**
     * Render everything to canvas
     */
    private render(): void {
        // TODO: Tasks 5, 11-14
        // - Clear canvas
        // - Draw parallax backgrounds
        // - Draw sprites (character, aliens, obstacles)
        // - Draw effects
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
        const CANVAS_WIDTH = 800;
        const obstacle: Obstacle = {
            id: `obstacle-${Date.now()}-${Math.random()}`,
            x: CANVAS_WIDTH,
            y: 0, // Ground level (will adjust in rendering)
            width: 154, // Car sprite at 0.6 scale (256 * 0.6)
            height: 154,
            question: generateQuestion(),
            answered: false,
            correct: false,
        };
        this.obstacles.push(obstacle);
    }

    /**
     * Update current question based on closest obstacle
     * Question is shown when obstacle is within 700px
     */
    private updateCurrentQuestion(): void {
        const closestObstacle = this.obstacles.find(
            (obs) => !obs.answered && obs.x < 700,
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
                this.score = 0;
                this.lives = 3;
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
                this.score = 0;
                this.lives = 3;
                this.obstacles = [];
                this.currentQuestion = null;
                this.physicsSystem.resetToRunning();
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
