import {scorePerseusItem} from "@khanacademy/perseus-score";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useEffect, useRef, useState} from "react";

import {storybookDependenciesV2} from "../../../../testing/test-dependencies";
import {ServerItemRenderer} from "../server-item-renderer";

import alexBouncyMixAudio from "./alexbouncymix2.ogg";
import alien1Img from "./alien1.png";
import neonOwlAudio from "./Zodik - Neon Owl.ogg";
import tedoxAudio from "./Zodik - Tedox.ogg";
import alien2Img from "./alien2.png";
import alien3Img from "./alien3.png";
import beamImg from "./beam.png";
import {CarBonusScene} from "./car-bonus-scene";
import car1Img from "./car1.png";
import cityCloseImg from "./city-close.png";
import cityFarImg from "./city-far.png";
import citySemiCloseImg from "./city-semi-close.png";
import citySemiFarImg from "./city-semi-far.png";
import impactImg from "./impact.png";
import lampLightImg from "./lamplight.png";
import loseImg from "./lose.png";
import muteImg from "./mute.png";
import nextImg from "./next.png";
import unmuteImg from "./unmute.png";
import styles from "./math-blaster-game.module.css";
import {createObstacle} from "./math-blaster-utils";
import titleImg from "./title.png";
import run1Img from "./run1.png";
import run2Img from "./run2.png";
import run3Img from "./run3.png";
import run4Img from "./run4.png";
import run5Img from "./run5.png";
import run6Img from "./run6.png";
import skyImg from "./sky.png";
import startImg from "./start.png";
import story1Img from "./story1.png";
import story2Img from "./story2.png";
import story3Img from "./story3.png";
import story4Img from "./story4.png";
import story5Img from "./story5.png";
import story6Img from "./story6.png";
import story7Img from "./story7.png";
import streetLampImg from "./streetlamp.png";
import victoryImg from "./victory.png";

import type {Obstacle} from "./math-blaster-utils";
import type {PerseusScore} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GROUND_Y = 450;
const SCROLL_SPEED = 2.5; // Slowed down from 3
const CHARACTER_X = 100;
const SPRITE_SIZE = 128; // Updated to 128x128 for new sprite sheet
const CHARACTER_WIDTH = SPRITE_SIZE;
const CHARACTER_HEIGHT = SPRITE_SIZE;
const JUMP_HEIGHT = 140; // Increased from 150 to clear obstacles better
const JUMP_DURATION = 1000; // ms
const OBSTACLE_SPAWN_INTERVAL = 5000; // Increased from 3000ms to give more time
const COLLISION_ZONE_X = CHARACTER_X + CHARACTER_WIDTH + 20;
const COOL_MODE_DURATION = 2000; // How long cool mode lasts after correct answer
const LAMP_SPACING = 500; // Distance between street lamps
const GAME_DURATION = 300000; // 5 minutes in milliseconds (11:55 to midnight)

type GameState =
    | "start"
    | "story"
    | "playing"
    | "carBonus"
    | "gameover"
    | "victory";
type CharacterState = "running" | "coolMode" | "impact" | "loss";

type SpriteFrame = {
    imageUrl?: string;
    color?: string;
    label: string;
};

// Sprite frame definitions
const SPRITE_FRAMES: Record<CharacterState, SpriteFrame[]> = {
    running: [
        {imageUrl: run1Img, label: "Run 1"},
        {imageUrl: run2Img, label: "Run 2"},
        {imageUrl: run3Img, label: "Run 3"},
        {imageUrl: run4Img, label: "Run 4"},
        {imageUrl: run5Img, label: "Run 5"},
        {imageUrl: run6Img, label: "Run 6"},
    ],
    coolMode: [
        {imageUrl: run1Img, color: "#9370DB", label: "Cool 1"}, // Tinted purple (will add guitar overlay)
        {imageUrl: run2Img, color: "#8A2BE2", label: "Cool 2"},
        {imageUrl: run3Img, color: "#9400D3", label: "Cool 3"},
        {imageUrl: run4Img, color: "#9370DB", label: "Cool 4"},
        {imageUrl: run5Img, color: "#8A2BE2", label: "Cool 5"},
        {imageUrl: run6Img, color: "#9400D3", label: "Cool 6"},
    ],
    impact: [{imageUrl: impactImg, label: "Impact"}],
    loss: [{imageUrl: impactImg, label: "Loss"}],
};

const MathBlasterGame = (): React.ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const itemRendererRef = useRef<ServerItemRenderer>(null);
    const animationFrameRef = useRef<number>();
    const lastSpawnTimeRef = useRef<number>(0);
    const gameLoopRef = useRef<() => void>();
    const spriteImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
    const menuAudioRef = useRef<HTMLAudioElement | null>(null); // Menu music (bouncy mix)
    const gameAudioRef = useRef<HTMLAudioElement | null>(null); // Gameplay music (tedox)
    const neonOwlAudioRef = useRef<HTMLAudioElement | null>(null); // Extended gameplay music (neon owl)

    // Refs for values that game loop needs to read in real-time
    const isJumpingRef = useRef(false);
    const jumpStartTimeRef = useRef(0);
    const characterYRef = useRef(GROUND_Y);
    const shakeOffsetRef = useRef({x: 0, y: 0});
    const obstaclesRef = useRef<Obstacle[]>([]); // Shared ref for obstacles
    const alienBlinkTimerRef = useRef(0); // Track time until next blink
    const alienFrameRef = useRef(1); // Current alien frame for real-time access
    const alienTimeRef = useRef(0); // Current alien time for floating motion
    const isAlienAbductingRef = useRef(false); // Track abduction mode in real-time
    const isAlienReturningRef = useRef(false); // Track returning mode in real-time
    const alienReturnStartTimeRef = useRef(0); // When return started
    const alienReturnStartPosRef = useRef({x: 0, y: 0}); // Position where return started
    const isAlienFlyingAwayRef = useRef(false); // Track flying away mode in real-time
    const alienFlyAwayStartTimeRef = useRef(0); // When flyaway started
    const totalScrollDistanceRef = useRef(0); // Continuous scroll distance for lamps (never wraps)
    const gameStartTimeRef = useRef(0); // When gameplay started (ref for real-time access)
    const isMutedRef = useRef(false); // Muted state for real-time access in event listeners

    const [gameState, setGameState] = useState<GameState>("start");
    const [storyPage, setStoryPage] = useState(1); // Current story page (1-7)
    const [score, setScore] = useState(0);
    const [gameStartTime, setGameStartTime] = useState<number>(0); // When gameplay started
    const [gameTime, setGameTime] = useState("11:55:00"); // Current game time display
    const [isMuted, setIsMuted] = useState(false); // Audio mute state
    const [lives, setLives] = useState(3);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [currentObstacle, setCurrentObstacle] = useState<Obstacle | null>(
        null,
    );
    const [isJumping, setIsJumping] = useState(false);
    const [jumpStartTime, setJumpStartTime] = useState<number>(0);
    const [characterY, setCharacterY] = useState(GROUND_Y);
    const [walkFrame, setWalkFrame] = useState(0);
    const [userInput, setUserInput] = useState<any>({});
    const [answerFeedback, setAnswerFeedback] = useState<{
        show: boolean;
        correct: boolean;
        message: string;
    }>({show: false, correct: false, message: ""});
    const [debugInfo, setDebugInfo] = useState<string>("");
    const [characterState, setCharacterState] =
        useState<CharacterState>("running");
    const [coolModeEndTime, setCoolModeEndTime] = useState<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [shakeOffset, setShakeOffset] = useState({x: 0, y: 0});
    const [isShaking, setIsShaking] = useState(false);
    const [parallaxOffsets, setParallaxOffsets] = useState([0, 0, 0, 0, 0]);
    const [alienFrame, setAlienFrame] = useState(1); // Current frame (1, 2, or 3)
    const [alienTime, setAlienTime] = useState(0); // Time for floating motion
    const [alienBlinkState, setAlienBlinkState] = useState<
        "idle" | "blink1" | "blink2"
    >("idle");
    const [alienNextBlinkTime, setAlienNextBlinkTime] = useState(2000); // When to next blink (ms)
    const [isAlienAbducting, setIsAlienAbducting] = useState(false); // Is alien in abduction mode
    const [isAlienReturning, setIsAlienReturning] = useState(false); // Is alien returning to floating position
    const [alienReturnStartTime, setAlienReturnStartTime] = useState(0); // When return started
    const [alienReturnStartPos, setAlienReturnStartPos] = useState({
        x: 0,
        y: 0,
    }); // Position where return started
    const [isAlienFlyingAway, setIsAlienFlyingAway] = useState(false); // Is alien flying away
    const [alienFlyAwayStartTime, setAlienFlyAwayStartTime] = useState(0); // When flyaway started
    const [benevolenceMessage, setBenevolenceMessage] = useState(false); // Show "BENEVOLENCE" message

    // Load and setup audio on mount
    useEffect(() => {
        const menuAudio = new Audio(alexBouncyMixAudio);
        menuAudio.loop = true;
        menuAudio.volume = 0.5; // Set to 50% volume
        menuAudioRef.current = menuAudio;

        const gameAudio = new Audio(tedoxAudio);
        gameAudio.loop = false; // Don't loop tedox, we'll transition to neon owl
        gameAudio.volume = 0.5; // Set to 50% volume
        gameAudioRef.current = gameAudio;

        const neonOwl = new Audio(neonOwlAudio);
        neonOwl.loop = true; // Loop neon owl
        neonOwl.volume = 0.5; // Set to 50% volume
        neonOwlAudioRef.current = neonOwl;

        // When tedox ends, automatically start neon owl
        const handleTedoxEnded = () => {
            if (neonOwlAudioRef.current && !isMutedRef.current) {
                neonOwlAudioRef.current.currentTime = 0;
                neonOwlAudioRef.current.play().catch((error) => {
                    console.log("Neon Owl audio play failed:", error);
                });
            }
        };
        gameAudio.addEventListener("ended", handleTedoxEnded);

        return () => {
            // Cleanup audio on unmount
            gameAudio.removeEventListener("ended", handleTedoxEnded);
            if (menuAudioRef.current) {
                menuAudioRef.current.pause();
                menuAudioRef.current = null;
            }
            if (gameAudioRef.current) {
                gameAudioRef.current.pause();
                gameAudioRef.current = null;
            }
            if (neonOwlAudioRef.current) {
                neonOwlAudioRef.current.pause();
                neonOwlAudioRef.current = null;
            }
        };
    }, []);

    // Load sprite images on mount
    useEffect(() => {
        const imagesToLoad = [
            {key: "run1", url: run1Img},
            {key: "run2", url: run2Img},
            {key: "run3", url: run3Img},
            {key: "run4", url: run4Img},
            {key: "run5", url: run5Img},
            {key: "run6", url: run6Img},
            {key: "impact", url: impactImg},
            {key: "alien1", url: alien1Img},
            {key: "alien2", url: alien2Img},
            {key: "alien3", url: alien3Img},
            {key: "beam", url: beamImg},
            {key: "car1", url: car1Img},
            {key: "sky", url: skyImg},
            {key: "cityFar", url: cityFarImg},
            {key: "citySemiFar", url: citySemiFarImg},
            {key: "citySemiClose", url: citySemiCloseImg},
            {key: "cityClose", url: cityCloseImg},
            {key: "streetlamp", url: streetLampImg},
            {key: "lamplight", url: lampLightImg},
            {key: "story1", url: story1Img},
            {key: "story2", url: story2Img},
            {key: "story3", url: story3Img},
            {key: "story4", url: story4Img},
            {key: "story5", url: story5Img},
            {key: "story6", url: story6Img},
            {key: "story7", url: story7Img},
            {key: "victory", url: victoryImg},
            {key: "lose", url: loseImg},
            {key: "title", url: titleImg},
            {key: "start", url: startImg},
            {key: "next", url: nextImg},
            {key: "mute", url: muteImg},
            {key: "unmute", url: unmuteImg},
        ];

        let loadedCount = 0;
        const imageMap = new Map<string, HTMLImageElement>();

        imagesToLoad.forEach(({key, url}) => {
            const img = new Image();
            img.onload = () => {
                imageMap.set(key, img);
                loadedCount++;
                if (loadedCount === imagesToLoad.length) {
                    spriteImagesRef.current = imageMap;
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load sprite: ${key}`);
                loadedCount++;
                if (loadedCount === imagesToLoad.length) {
                    setImagesLoaded(true);
                }
            };
            img.src = url;
        });
    }, []);

    // Handle audio playback based on game state
    useEffect(() => {
        if (isMuted) {
            // Mute all audio
            if (menuAudioRef.current) {
                menuAudioRef.current.pause();
            }
            if (gameAudioRef.current) {
                gameAudioRef.current.pause();
            }
            if (neonOwlAudioRef.current) {
                neonOwlAudioRef.current.pause();
            }
            return;
        }

        if (gameState === "start") {
            // Play menu music (bouncy mix) on title screen only
            if (gameAudioRef.current) {
                gameAudioRef.current.pause();
            }
            if (neonOwlAudioRef.current) {
                neonOwlAudioRef.current.pause();
            }
            if (menuAudioRef.current) {
                menuAudioRef.current.currentTime = 0;
                menuAudioRef.current.play().catch((error) => {
                    console.log("Menu audio play failed:", error);
                });
            }
        } else if (
            gameState === "story" ||
            gameState === "playing" ||
            gameState === "victory"
        ) {
            // Play game music (tedox) during story, gameplay, and victory
            if (menuAudioRef.current) {
                menuAudioRef.current.pause();
            }
            if (gameAudioRef.current) {
                if (gameState === "story") {
                    // Restart game music when story starts
                    gameAudioRef.current.currentTime = 0;
                    // Also stop neon owl if it was playing
                    if (neonOwlAudioRef.current) {
                        neonOwlAudioRef.current.pause();
                    }
                }
                // Ensure it's playing (continues during gameplay and victory)
                gameAudioRef.current.play().catch((error) => {
                    console.log("Game audio play failed:", error);
                });
            }
        } else {
            // Pause all audio (gameover, carBonus)
            if (menuAudioRef.current) {
                menuAudioRef.current.pause();
            }
            if (gameAudioRef.current) {
                gameAudioRef.current.pause();
            }
            if (neonOwlAudioRef.current) {
                neonOwlAudioRef.current.pause();
            }
        }
    }, [gameState, isMuted]);

    // Handle keyboard events for answer submission
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (
                e.key === "Enter" &&
                gameState === "playing" &&
                currentObstacle
            ) {
                e.preventDefault();
                handleCheckAnswer();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [gameState, currentObstacle]);

    // Initialize game
    const startGame = () => {
        setGameState("story");
        setStoryPage(1); // Start at story page 1
        setScore(0);
        setLives(3);
        setObstacles([]);
        setCurrentObstacle(null);
        setIsJumping(false);
        setCharacterY(GROUND_Y);
        setCharacterState("running");
        setCoolModeEndTime(0);
        setShakeOffset({x: 0, y: 0});
        setIsShaking(false);
        setParallaxOffsets([0, 0, 0, 0, 0]);
        setAlienFrame(1); // Start on idle frame
        setAlienTime(0);
        setAlienBlinkState("idle");
        setIsAlienAbducting(false);
        setIsAlienReturning(false);
        setAlienReturnStartTime(0);
        setAlienReturnStartPos({x: 0, y: 0});
        setIsAlienFlyingAway(false);
        setAlienFlyAwayStartTime(0);
        setBenevolenceMessage(false);
        const initialBlinkDelay = 2000 + Math.random() * 3000;
        setAlienNextBlinkTime(initialBlinkDelay);

        // Reset refs
        isJumpingRef.current = false;
        jumpStartTimeRef.current = 0;
        characterYRef.current = GROUND_Y;
        shakeOffsetRef.current = {x: 0, y: 0};
        obstaclesRef.current = [];
        alienBlinkTimerRef.current = initialBlinkDelay;
        alienFrameRef.current = 1;
        alienTimeRef.current = 0;
        isAlienAbductingRef.current = false;
        isAlienReturningRef.current = false;
        alienReturnStartTimeRef.current = 0;
        alienReturnStartPosRef.current = {x: 0, y: 0};
        isAlienFlyingAwayRef.current = false;
        alienFlyAwayStartTimeRef.current = 0;
        totalScrollDistanceRef.current = 0;

        lastSpawnTimeRef.current = Date.now();

        // Music will be handled by the useEffect based on game state
    };

    // Handle story next button
    const handleStoryNext = () => {
        if (storyPage < 7) {
            setStoryPage(storyPage + 1);
        } else {
            // Last story page, transition to gameplay
            setGameState("playing");
            const startTime = Date.now();
            setGameStartTime(startTime); // Record when gameplay starts
            gameStartTimeRef.current = startTime; // Also set ref for real-time access
        }
    };

    // TEMPORARY: Debug button to jump to 11:59:30 (30 seconds before victory)
    const jumpToAlmostMidnight = () => {
        // Jump to 4.5 minutes (270 seconds) into the game
        const targetElapsedMs = 270 * 1000; // 270 seconds
        const newStartTime = Date.now() - targetElapsedMs;
        setGameStartTime(newStartTime);
        gameStartTimeRef.current = newStartTime; // Update ref for real-time access
    };

    // Toggle mute
    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        isMutedRef.current = newMutedState;
    };

    // Shake effect for impact
    const triggerShake = () => {
        setIsShaking(true);
        const duration = 300; // ms
        const intensity = 5; // pixels
        const startTime = Date.now();

        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const offset = {
                    x: (Math.random() - 0.5) * intensity * 2,
                    y: (Math.random() - 0.5) * intensity * 2,
                };
                shakeOffsetRef.current = offset;
                setShakeOffset(offset);
                requestAnimationFrame(shake);
            } else {
                shakeOffsetRef.current = {x: 0, y: 0};
                setShakeOffset({x: 0, y: 0});
                setIsShaking(false);
            }
        };
        shake();
    };

    // Draw the game
    const drawGame = (
        ctx: CanvasRenderingContext2D,
        obstaclesList: Obstacle[],
        charState: CharacterState,
        frame: number,
        shake: {x: number; y: number},
        bgOffsets: number[],
        alienAnimFrame: number,
        alienAnimTime: number,
        isAbducting: boolean,
        isReturning: boolean,
        returnStartTime: number,
        returnStartPos: {x: number; y: number},
        isFlyingAway: boolean,
        flyAwayStartTime: number,
    ) => {
        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Parallax background layers (back to front)
        const backgroundLayers = [
            {key: "sky", speed: 0, height: CANVAS_HEIGHT}, // Sky doesn't scroll
            {key: "cityFar", speed: 0.2, height: CANVAS_HEIGHT * 0.6},
            {key: "citySemiFar", speed: 0.4, height: CANVAS_HEIGHT * 0.6},
            {key: "citySemiClose", speed: 0.7, height: CANVAS_HEIGHT * 0.6},
            {key: "cityClose", speed: 1.0, height: CANVAS_HEIGHT * 0.6},
        ];

        backgroundLayers.forEach(({key, height}, index) => {
            const img = spriteImagesRef.current.get(key);
            if (img) {
                const offset = bgOffsets[index];
                const y = CANVAS_HEIGHT - height;

                // Draw two copies for seamless looping
                ctx.drawImage(img, -offset, y, CANVAS_WIDTH, height);
                ctx.drawImage(
                    img,
                    CANVAS_WIDTH - offset,
                    y,
                    CANVAS_WIDTH,
                    height,
                );
            }
        });

        // Draw floating alien in the sky
        // alienAnimFrame now directly contains the frame number (1, 2, or 3)
        const alienImgKey = `alien${alienAnimFrame}`;
        const alienImg = spriteImagesRef.current.get(alienImgKey);

        // Variables to store alien position for tractor beam
        let alienXForBeam = 0;
        let alienYForBeam = 0;

        if (alienImg) {
            const alienSize = 96; // Size of alien sprite
            let alienX: number;
            let alienY: number;

            if (isFlyingAway) {
                // Flying away mode: alien flies off to the upper right
                const now = Date.now();
                const flyProgress = (now - flyAwayStartTime) / 2000; // 2 seconds to fly away
                const startX = CANVAS_WIDTH * 0.65; // Start from floating position
                const startY = 120;

                // Fly up and to the right, accelerating
                alienX =
                    startX + flyProgress * flyProgress * CANVAS_WIDTH * 1.5; // Accelerate horizontally
                alienY = startY - flyProgress * flyProgress * 400; // Accelerate upward
            } else if (isReturning) {
                // Returning mode: smoothly drift back to floating position
                const now = Date.now();
                const returnDuration = 1500; // 1.5 seconds to return
                const returnProgress = Math.min(
                    (now - returnStartTime) / returnDuration,
                    1,
                );

                // Use ease-out for smooth deceleration
                const easedProgress = 1 - Math.pow(1 - returnProgress, 3);

                // Target floating position - calculate what the floating position SHOULD be right now
                const alienBaseX = CANVAS_WIDTH * 0.65;
                const alienBaseY = 120;
                const targetX =
                    alienBaseX +
                    Math.sin(alienAnimTime * 0.4) * 80 +
                    Math.sin(alienAnimTime * 0.7) * 30;
                const targetY =
                    alienBaseY +
                    Math.sin(alienAnimTime * 0.5) * 50 +
                    Math.cos(alienAnimTime * 0.3) * 25;

                // Interpolate from start position to target
                alienX =
                    returnStartPos.x +
                    (targetX - returnStartPos.x) * easedProgress;
                alienY =
                    returnStartPos.y +
                    (targetY - returnStartPos.y) * easedProgress;

                // Check if return is complete
                if (returnProgress >= 1 && isAlienReturningRef.current) {
                    isAlienReturningRef.current = false;
                    setIsAlienReturning(false);
                }
            } else if (isAbducting) {
                // Abduction mode: position alien centered above character
                const currentY = characterYRef.current;
                const abductionOffset = 80; // How far above the character

                alienX = CHARACTER_X + CHARACTER_WIDTH / 2 - alienSize / 2; // Center horizontally over character
                alienY = currentY - abductionOffset; // Position above character
            } else {
                // Normal floating mode
                const alienBaseX = CANVAS_WIDTH * 0.65; // Float around 65% across the screen
                const alienBaseY = 120; // Height in the sky

                // Create floating motion with sine waves at different frequencies for more dynamic movement
                // Combine multiple sine waves for more organic hovering
                alienX =
                    alienBaseX +
                    Math.sin(alienAnimTime * 0.4) * 80 + // Main horizontal drift
                    Math.sin(alienAnimTime * 0.7) * 30; // Smaller secondary movement

                alienY =
                    alienBaseY +
                    Math.sin(alienAnimTime * 0.5) * 50 + // Main vertical float
                    Math.cos(alienAnimTime * 0.3) * 25; // Secondary bobbing motion
            }

            // Store alien position for tractor beam
            alienXForBeam = alienX;
            alienYForBeam = alienY;

            // Draw tractor beam behind alien during abduction
            if (isAbducting) {
                const beamImage = spriteImagesRef.current.get("beam");
                if (beamImage) {
                    // Beam starts 2/3 down the alien sprite
                    const beamTopY = alienY + (alienSize * 2) / 3;
                    const beamCenterX = alienX + alienSize / 2;

                    // Beam extends down to the character
                    const currentY = characterYRef.current;
                    const charCenterX = CHARACTER_X + CHARACTER_WIDTH / 2;
                    const charTopY = currentY + CHARACTER_HEIGHT / 2;

                    // Calculate beam dimensions
                    const beamHeight = charTopY - beamTopY;
                    const beamWidth = 80; // Width of beam at base

                    // Draw the beam image stretched to fit
                    ctx.save();
                    ctx.globalAlpha = 0.8; // Slight transparency
                    ctx.drawImage(
                        beamImage,
                        beamCenterX - beamWidth / 2,
                        beamTopY,
                        beamWidth,
                        beamHeight,
                    );
                    ctx.restore();
                }
            }

            ctx.drawImage(alienImg, alienX, alienY, alienSize, alienSize);
        }

        // Draw ground
        ctx.fillStyle = "#3b3d3e";
        ctx.fillRect(
            0,
            GROUND_Y + CHARACTER_HEIGHT,
            CANVAS_WIDTH,
            CANVAS_HEIGHT - (GROUND_Y + CHARACTER_HEIGHT),
        );

        // Draw ground line
        ctx.strokeStyle = "#2b2c2d";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y + CHARACTER_HEIGHT);
        ctx.lineTo(CANVAS_WIDTH, GROUND_Y + CHARACTER_HEIGHT);
        ctx.stroke();

        // Draw street lamps
        const lampImg = spriteImagesRef.current.get("streetlamp");
        if (lampImg) {
            const lampHeight = 270; // Height of lamp post (50% larger)
            const lampWidth = 120; // Width of lamp post (50% larger)
            const groundLevel = GROUND_Y + CHARACTER_HEIGHT;

            // Use continuous scroll distance for smooth movement
            const scrollOffset = totalScrollDistanceRef.current;

            // Draw lamps at regular intervals, accounting for scroll
            for (
                let lampX = -(scrollOffset % LAMP_SPACING);
                lampX < CANVAS_WIDTH + lampWidth;
                lampX += LAMP_SPACING
            ) {
                ctx.drawImage(
                    lampImg,
                    lampX,
                    groundLevel - lampHeight,
                    lampWidth,
                    lampHeight,
                );
            }
        }

        // Draw character sprite (use ref for current Y position)
        const currentY = characterYRef.current;
        const frames = SPRITE_FRAMES[charState];
        const frameIndex =
            charState === "impact" || charState === "loss"
                ? 0
                : Math.floor(frame / 10) % frames.length; // Change frame every 10 ticks
        const currentFrame = frames[frameIndex];

        // Apply shake offset if shaking
        const drawX = CHARACTER_X + shake.x;
        const drawY = currentY + shake.y;

        // Draw sprite
        if (currentFrame.imageUrl) {
            // Get the loaded image from the map
            const imgKey =
                currentFrame.imageUrl === run1Img
                    ? "run1"
                    : currentFrame.imageUrl === run2Img
                      ? "run2"
                      : currentFrame.imageUrl === run3Img
                        ? "run3"
                        : currentFrame.imageUrl === run4Img
                          ? "run4"
                          : currentFrame.imageUrl === run5Img
                            ? "run5"
                            : currentFrame.imageUrl === run6Img
                              ? "run6"
                              : "impact";
            const img = spriteImagesRef.current.get(imgKey);

            if (img) {
                // Apply color tinting for cool mode
                if (charState === "coolMode" && currentFrame.color) {
                    ctx.save();
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = currentFrame.color;
                    ctx.fillRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(img, drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
                    ctx.restore();
                } else {
                    ctx.drawImage(img, drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
                }
            } else {
                // Fallback if image not loaded
                ctx.fillStyle = "#FFD700";
                ctx.fillRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
            }
        } else {
            // Use colored rectangle for states without images (impact, loss)
            ctx.fillStyle = currentFrame.color || "#FFD700";
            ctx.fillRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);

            // Add border for non-image sprites
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.strokeRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
        }

        // Draw obstacles
        const carImg = spriteImagesRef.current.get("car1");
        const carOriginalSize = 256; // Original car sprite size
        const carScale = 0.6; // Scale to 60%
        const carSize = carOriginalSize * carScale; //

        obstaclesList.forEach((obstacle) => {
            const carX = obstacle.x;
            const carY = GROUND_Y + CHARACTER_HEIGHT - carSize;

            if (carImg) {
                // Apply color tint for answered obstacles
                if (obstacle.answered) {
                    ctx.save();
                    if (obstacle.correct) {
                        // Green tint for correct
                        ctx.globalAlpha = 0.3;
                        ctx.fillStyle = "#90EE90";
                    } else {
                        // Red tint for incorrect
                        ctx.globalAlpha = 0.3;
                        ctx.fillStyle = "#FFB6C1";
                    }
                    ctx.fillRect(carX, carY, carSize, carSize);
                    ctx.globalAlpha = 1.0;
                    ctx.restore();
                }

                // Draw car sprite
                ctx.drawImage(carImg, carX, carY, carSize, carSize);
            } else {
                // Fallback to rectangle if car not loaded
                ctx.fillStyle = obstacle.answered
                    ? obstacle.correct
                        ? "#90EE90"
                        : "#FFB6C1"
                    : "#8B4513";
                ctx.fillRect(carX, carY, carSize, carSize);
            }

            // Draw question indicator
            if (!obstacle.answered) {
                ctx.fillStyle = "#FF6B6B";
                ctx.font = "bold 32px Arial";
                ctx.textAlign = "center";
                ctx.fillText("?", obstacle.x + carSize / 2, carY - 10);
            }
        });

        // Draw lamp light beams OVER everything
        const lampLightImg = spriteImagesRef.current.get("lamplight");
        if (lampLightImg) {
            const lampHeight = 270; // Height of lamp post (same as above)
            const lampWidth = 120; // Width of lamp post
            const groundLevel = GROUND_Y + CHARACTER_HEIGHT;
            const beamWidth = 256; // Width of light beam (also scaled up)
            const beamHeight = 256; // Fixed height for light beam

            // Use same scroll offset as lamp posts
            const scrollOffset = totalScrollDistanceRef.current;

            // Draw light beams at same positions as lamp posts
            for (
                let lampX = -(scrollOffset % LAMP_SPACING);
                lampX < CANVAS_WIDTH + lampWidth;
                lampX += LAMP_SPACING
            ) {
                // Center the beam on the lamp post
                const beamX = lampX + lampWidth / 2 - beamWidth / 2;

                // Beam starts 1/5 down from the top of the lamp
                const lampTopY = groundLevel - lampHeight;
                const beamStartY = lampTopY;

                // Draw with some transparency so we can see through it
                ctx.save();
                ctx.globalAlpha = 0.4; // Semi-transparent light beam
                ctx.drawImage(
                    lampLightImg,
                    beamX,
                    beamStartY,
                    beamWidth,
                    beamHeight,
                );
                ctx.restore();
            }
        }
    };

    // Game loop
    useEffect(() => {
        if (gameState !== "playing") {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        let localCurrentObstacle = currentObstacle;
        let localWalkFrame = walkFrame;
        const localScore = score;
        let localLives = lives;
        let localCharacterState = characterState;
        let localCoolModeEndTime = coolModeEndTime;
        let localParallaxOffsets = [...parallaxOffsets];

        const gameLoop = () => {
            if (gameState !== "playing") {
                return;
            }

            const now = Date.now();

            // Update game timer (use ref for real-time access)
            const elapsedMs = now - gameStartTimeRef.current;
            if (elapsedMs >= GAME_DURATION) {
                // Player survived 5 minutes - VICTORY!
                setGameState("victory");
                return;
            }

            // Calculate time display (11:55:00 to 00:00:00)
            const elapsedSeconds = Math.floor(elapsedMs / 1000);
            const startTimeInSeconds = 11 * 3600 + 55 * 60; // 11:55:00 in seconds
            const currentTimeInSeconds = startTimeInSeconds + elapsedSeconds;

            // Handle midnight rollover
            let hours = Math.floor(currentTimeInSeconds / 3600) % 24;
            const minutes = Math.floor((currentTimeInSeconds % 3600) / 60);
            const seconds = currentTimeInSeconds % 60;

            const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            setGameTime(timeString);

            // Update character state based on cool mode timer
            if (localCoolModeEndTime > 0 && now > localCoolModeEndTime) {
                localCharacterState = "running";
                localCoolModeEndTime = 0;
                setCharacterState("running");
                setCoolModeEndTime(0);
            }

            // Update parallax background offsets
            const parallaxSpeeds = [0, 0.2, 0.4, 0.7, 1.0];
            localParallaxOffsets = localParallaxOffsets.map((offset, index) => {
                const newOffset = offset + SCROLL_SPEED * parallaxSpeeds[index];
                // Loop when offset reaches canvas width
                return newOffset >= CANVAS_WIDTH ? 0 : newOffset;
            });
            setParallaxOffsets(localParallaxOffsets);

            // Update continuous scroll distance for lamps
            totalScrollDistanceRef.current += SCROLL_SPEED;

            // Update walk animation
            localWalkFrame += 1;

            // Update alien floating time
            alienTimeRef.current += 0.02; // Increment time for smooth floating
            setAlienTime(alienTimeRef.current); // Also update state for consistency

            // Update alien blink animation (only if not flying away or returning)
            if (!isAlienFlyingAwayRef.current && !isAlienReturningRef.current) {
                alienBlinkTimerRef.current -= 16; // Subtract ~16ms per frame (assuming 60fps)
            }

            if (
                alienBlinkTimerRef.current <= 0 &&
                !isAlienFlyingAwayRef.current &&
                !isAlienReturningRef.current
            ) {
                // Time to blink! Start the blink sequence
                setAlienBlinkState("blink1");
                setAlienFrame(2); // Start with frame 2
                alienFrameRef.current = 2;

                // Schedule frame 3
                setTimeout(() => {
                    setAlienFrame(3);
                    alienFrameRef.current = 3;
                    setAlienBlinkState("blink2");

                    // Return to frame 1 after a short delay
                    setTimeout(() => {
                        setAlienFrame(1);
                        alienFrameRef.current = 1;
                        setAlienBlinkState("idle");

                        // Schedule next blink randomly between 2-5 seconds
                        const nextBlinkDelay = 2000 + Math.random() * 3000;
                        alienBlinkTimerRef.current = nextBlinkDelay;
                        setAlienNextBlinkTime(nextBlinkDelay);
                    }, 100); // Frame 3 duration
                }, 100); // Frame 2 duration
            }

            // Handle jumping (read from refs for real-time values)
            if (isJumpingRef.current) {
                const jumpProgress = now - jumpStartTimeRef.current;
                if (jumpProgress < JUMP_DURATION) {
                    // Parabolic jump
                    const progress = jumpProgress / JUMP_DURATION;
                    const jumpHeight =
                        Math.sin(progress * Math.PI) * JUMP_HEIGHT;
                    const newY = GROUND_Y - jumpHeight;
                    characterYRef.current = newY;
                    setCharacterY(newY);
                } else {
                    // Jump complete - end abduction if it was active
                    isJumpingRef.current = false;
                    characterYRef.current = GROUND_Y;
                    setIsJumping(false);
                    setCharacterY(GROUND_Y);

                    if (isAlienAbductingRef.current) {
                        // Start return animation
                        const abductionOffset = 80;
                        const alienSize = 96;
                        const startX =
                            CHARACTER_X + CHARACTER_WIDTH / 2 - alienSize / 2;
                        const startY = GROUND_Y - abductionOffset;

                        isAlienAbductingRef.current = false;
                        setIsAlienAbducting(false);

                        isAlienReturningRef.current = true;
                        alienReturnStartTimeRef.current = now;
                        alienReturnStartPosRef.current = {x: startX, y: startY};
                        setIsAlienReturning(true);
                        setAlienReturnStartTime(now);
                        setAlienReturnStartPos({x: startX, y: startY});
                    }
                }
            }

            // Move obstacles using the ref
            obstaclesRef.current = obstaclesRef.current.map((obs) => {
                let speed = SCROLL_SPEED;

                // Racing cars accelerate away!
                if (obs.racing && obs.racingStartTime) {
                    const racingDuration = now - obs.racingStartTime;
                    // Accelerate over 2 seconds, reaching 5x speed
                    const acceleration = Math.min(racingDuration / 500, 5); // Reaches 5x in 2.5 seconds
                    speed = SCROLL_SPEED * (1 + acceleration * 2);
                }

                return {
                    ...obs,
                    x: obs.x - speed,
                };
            });

            // Check for collisions and handle obstacle passing
            obstaclesRef.current = obstaclesRef.current.filter((obs) => {
                // Remove obstacles that are off-screen
                if (obs.x + obs.width < 0) {
                    // If obstacle passed and character was in impact state, return to running
                    if (
                        obs.answered &&
                        !obs.correct &&
                        localCharacterState === "impact"
                    ) {
                        localCharacterState = "running";
                        setCharacterState("running");
                    }

                    if (obs === localCurrentObstacle) {
                        localCurrentObstacle = null;
                        setCurrentObstacle(null);
                        // Clear feedback when obstacle leaves screen
                        setAnswerFeedback({
                            show: false,
                            correct: false,
                            message: "",
                        });
                    }
                    return false;
                }

                // Check if obstacle has reached the collision zone
                if (
                    obs.x < COLLISION_ZONE_X &&
                    obs.x + obs.width > CHARACTER_X
                ) {
                    // Obstacle is in collision zone
                    if (!obs.answered) {
                        // Not answered yet - check if alien can still save us
                        localLives -= 1;
                        obs.answered = true;
                        obs.correct = false;

                        // Always clear current obstacle on collision
                        localCurrentObstacle = null;
                        setCurrentObstacle(null);
                        setAnswerFeedback({
                            show: false,
                            correct: false,
                            message: "",
                        });

                        setLives(localLives);

                        if (localLives <= 0) {
                            // Out of lives! Show impact and alien flies away
                            localCharacterState = "impact";
                            setCharacterState("impact");
                            triggerShake();

                            isAlienFlyingAwayRef.current = true;
                            alienFlyAwayStartTimeRef.current = now;
                            setIsAlienFlyingAway(true);
                            setAlienFlyAwayStartTime(now);

                            // Delay game over transition to let alien fly away
                            setTimeout(() => {
                                setGameState("carBonus");
                                setCharacterState("loss");
                                // Clear all obstacles for car bonus scene
                                obstaclesRef.current = [];
                                setObstacles([]);
                            }, 2000); // 2 seconds for alien to fly away
                        } else {
                            // Still have lives - alien abduction to the rescue!
                            if (!isJumpingRef.current) {
                                isAlienAbductingRef.current = true;
                                setIsAlienAbducting(true);

                                // Show BENEVOLENCE message
                                setBenevolenceMessage(true);
                                setTimeout(
                                    () => setBenevolenceMessage(false),
                                    2000,
                                );

                                // Start the jump and mark car as racing
                                obs.jumped = true;
                                obs.racing = true;
                                obs.racingStartTime = now;
                                isJumpingRef.current = true;
                                jumpStartTimeRef.current = now;
                                setIsJumping(true);
                                setJumpStartTime(now);
                            }
                        }
                    } else if (obs.correct && !obs.jumped) {
                        // Correct answer - trigger jump!
                        if (!isJumpingRef.current) {
                            obs.jumped = true; // Mark so we only jump once per obstacle
                            obs.racing = true; // Car races away
                            obs.racingStartTime = now;
                            isJumpingRef.current = true;
                            jumpStartTimeRef.current = now;
                            setIsJumping(true);
                            setJumpStartTime(now);
                        }
                    }
                }

                return true;
            });

            // Set current obstacle (closest unanswered obstacle that's close enough)
            // Only show question when obstacle is reasonably close (within 700px)
            const closestObstacle = obstaclesRef.current.find(
                (obs) => !obs.answered && obs.x < 700,
            );
            if (
                closestObstacle &&
                closestObstacle.id !== localCurrentObstacle?.id
            ) {
                // New question - clear feedback
                localCurrentObstacle = closestObstacle;
                setCurrentObstacle(closestObstacle);
                setUserInput({});
                setAnswerFeedback({
                    show: false,
                    correct: false,
                    message: "",
                });
            }

            // Spawn new obstacles
            if (now - lastSpawnTimeRef.current > OBSTACLE_SPAWN_INTERVAL) {
                const newObstacle = createObstacle(CANVAS_WIDTH);
                obstaclesRef.current.push(newObstacle);
                lastSpawnTimeRef.current = now;
            }

            // Update state with current obstacles
            setObstacles([...obstaclesRef.current]);
            setWalkFrame(localWalkFrame);

            // Draw (use refs for real-time shake and character Y values)
            drawGame(
                ctx,
                obstaclesRef.current,
                localCharacterState,
                localWalkFrame,
                shakeOffsetRef.current,
                localParallaxOffsets,
                alienFrameRef.current,
                alienTimeRef.current,
                isAlienAbductingRef.current,
                isAlienReturningRef.current,
                alienReturnStartTimeRef.current,
                alienReturnStartPosRef.current,
                isAlienFlyingAwayRef.current,
                alienFlyAwayStartTimeRef.current,
            );

            // Continue loop
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoopRef.current = gameLoop;
        gameLoop();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [gameState]);

    // Handle answer submission
    // Handle car bonus scene completion
    const handleCarBonusComplete = () => {
        setGameState("gameover");
    };

    const handleCheckAnswer = () => {
        if (!currentObstacle) {
            return;
        }

        const rendererUserInput = itemRendererRef.current?.getUserInput();
        if (!rendererUserInput) {
            return;
        }

        try {
            const scoreResult: PerseusScore = scorePerseusItem(
                currentObstacle.question.question,
                rendererUserInput,
                "en",
            );

            const isCorrect =
                scoreResult.type === "points" &&
                scoreResult.earned === scoreResult.total &&
                scoreResult.earned > 0;

            if (isCorrect) {
                // CRITICAL: Update the obstacles ref directly so game loop sees it immediately
                const obstacle = obstaclesRef.current.find(
                    (obs) => obs.id === currentObstacle.id,
                );
                if (obstacle) {
                    obstacle.answered = true;
                    obstacle.correct = true;
                }

                // Enter cool mode!
                setCharacterState("coolMode");
                setCoolModeEndTime(Date.now() + COOL_MODE_DURATION);

                setScore((prev) => prev + 10);
                setAnswerFeedback({
                    show: true,
                    correct: true,
                    message: "Correct! 🎉",
                });

                // Clear current obstacle after a short delay
                setTimeout(() => {
                    setCurrentObstacle(null);
                    setAnswerFeedback({
                        show: false,
                        correct: false,
                        message: "",
                    });
                }, 1000);
            } else {
                setAnswerFeedback({
                    show: true,
                    correct: false,
                    message:
                        scoreResult.type === "invalid"
                            ? "Please enter an answer!"
                            : "Try again! You can keep answering until you get it right!",
                });
                // Keep feedback visible - don't auto-clear for incorrect answers
            }
        } catch (error) {
            console.error("Error scoring answer:", error);
        }
    };

    return (
        <View>
            <div className={styles.gameContainer}>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className={styles.gameCanvas}
                />

                {/* Mute Button */}
                {(() => {
                    const muteButton = isMuted
                        ? spriteImagesRef.current.get("mute")
                        : spriteImagesRef.current.get("unmute");
                    if (muteButton) {
                        return (
                            <img
                                src={muteButton.src}
                                alt={isMuted ? "Unmute" : "Mute"}
                                onClick={toggleMute}
                                className={styles.muteButton}
                            />
                        );
                    }
                    return null;
                })()}

                {/* HUD */}
                {gameState === "playing" && (
                    <div className={styles.hud}>
                        <div className={styles.score}>Score: {score}</div>
                        <div className={styles.gameTime}>{gameTime}</div>
                        <div className={styles.lives}>
                            <span>Alien Benevolence:</span>
                            <span
                                className={
                                    lives > 0
                                        ? styles.alien
                                        : `${styles.alien} ${styles.alienLost}`
                                }
                            >
                                👽
                            </span>
                            <span
                                className={
                                    lives > 1
                                        ? styles.alien
                                        : `${styles.alien} ${styles.alienLost}`
                                }
                            >
                                👽
                            </span>
                            <span
                                className={
                                    lives > 2
                                        ? styles.alien
                                        : `${styles.alien} ${styles.alienLost}`
                                }
                            >
                                👽
                            </span>
                        </div>
                    </div>
                )}

                {/* TEMPORARY Debug Button */}
                {gameState === "playing" && (
                    <button
                        onClick={jumpToAlmostMidnight}
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            background: "#ff6b6b",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            zIndex: 25,
                            pointerEvents: "all",
                        }}
                    >
                        DEBUG: Jump to 11:59:30
                    </button>
                )}

                {/* Question Overlay */}
                {gameState === "playing" &&
                    currentObstacle &&
                    (() => {
                        // Find the live obstacle position from the obstacles array
                        const liveObstacle = obstacles.find(
                            (obs) => obs.id === currentObstacle.id,
                        );
                        const obstacleX = liveObstacle?.x ?? currentObstacle.x;
                        const remainingDistance = obstacleX - COLLISION_ZONE_X;
                        const totalDistance = 700 - COLLISION_ZONE_X;
                        const progressPercent = Math.max(
                            0,
                            Math.min(
                                100,
                                (remainingDistance / totalDistance) * 100,
                            ),
                        );
                        const secondsLeft = Math.max(
                            0,
                            remainingDistance / (SCROLL_SPEED * 60),
                        );

                        return (
                            <div
                                className={styles.questionOverlay}
                                style={{
                                    top: "100px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            >
                                {/* Timer Progress Bar */}
                                <div className={styles.timerContainer}>
                                    <div
                                        className={styles.timerBar}
                                        style={{
                                            width: `${progressPercent}%`,
                                            backgroundColor:
                                                remainingDistance >
                                                totalDistance * 0.66
                                                    ? "#4CAF50"
                                                    : remainingDistance >
                                                        totalDistance * 0.33
                                                      ? "#FFC107"
                                                      : "#F44336",
                                        }}
                                    />
                                    <div className={styles.timerText}>
                                        {secondsLeft.toFixed(1)}s left
                                    </div>
                                </div>

                                <ServerItemRenderer
                                    key={currentObstacle.id}
                                    ref={itemRendererRef}
                                    item={currentObstacle.question}
                                    dependencies={storybookDependenciesV2}
                                    problemNum={parseInt(
                                        currentObstacle.id.split("-")[1] || "0",
                                        10,
                                    )}
                                    apiOptions={{
                                        isMobile: false,
                                    }}
                                />
                                <button
                                    className={styles.checkButton}
                                    onClick={handleCheckAnswer}
                                >
                                    Check Answer
                                </button>
                                {answerFeedback.show && (
                                    <div
                                        className={
                                            answerFeedback.correct
                                                ? `${styles.feedback} ${styles.feedbackCorrect}`
                                                : `${styles.feedback} ${styles.feedbackIncorrect}`
                                        }
                                    >
                                        {answerFeedback.message}
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                {/* Benevolence Message */}
                {benevolenceMessage && (
                    <div className={styles.benevolenceMessage}>BENEVOLENCE</div>
                )}

                {/* Car Bonus Scene */}
                {gameState === "carBonus" && (
                    <CarBonusScene onComplete={handleCarBonusComplete} />
                )}

                {/* Start Screen */}
                {gameState === "start" && (
                    <div className={styles.startScreen}>
                        {!imagesLoaded && <p>Loading sprites...</p>}
                        {imagesLoaded && (() => {
                            const titleImage = spriteImagesRef.current.get("title");
                            const startButton = spriteImagesRef.current.get("start");

                            if (titleImage && startButton) {
                                return (
                                    <>
                                        <img
                                            src={titleImage.src}
                                            alt="Grand Khan Auto"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        />
                                        <img
                                            src={startButton.src}
                                            alt="Start Game"
                                            onClick={startGame}
                                            className={styles.startButton}
                                        />
                                    </>
                                );
                            }
                            return <p>Loading...</p>;
                        })()}
                    </div>
                )}

                {/* Story Screen */}
                {gameState === "story" && (
                    <div className={styles.storyScreen}>
                        {(() => {
                            const storyImg = spriteImagesRef.current.get(
                                `story${storyPage}`,
                            );
                            const nextButton = spriteImagesRef.current.get("next");
                            const startButton = spriteImagesRef.current.get("start");
                            const buttonToUse = storyPage < 7 ? nextButton : startButton;

                            if (storyImg && buttonToUse) {
                                return (
                                    <>
                                        <img
                                            src={storyImg.src}
                                            alt={`Story page ${storyPage}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                        <img
                                            src={buttonToUse.src}
                                            alt={storyPage < 7 ? "Next" : "Start"}
                                            onClick={handleStoryNext}
                                            className={styles.storyNextButton}
                                        />
                                    </>
                                );
                            }
                            return <p>Loading story...</p>;
                        })()}
                    </div>
                )}

                {/* Game Over Screen */}
                {gameState === "gameover" && (
                    <div className={styles.gameOver}>
                        {(() => {
                            const loseImage = spriteImagesRef.current.get("lose");
                            const startButton = spriteImagesRef.current.get("start");
                            if (loseImage && startButton) {
                                return (
                                    <>
                                        <img
                                            src={loseImage.src}
                                            alt="Game Over"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        />
                                        <img
                                            src={startButton.src}
                                            alt="Play Again"
                                            onClick={startGame}
                                            className={styles.gameOverButton}
                                        />
                                    </>
                                );
                            }
                            return <p>Loading game over screen...</p>;
                        })()}
                    </div>
                )}

                {/* Victory Screen */}
                {gameState === "victory" && (
                    <div className={styles.victoryScreen}>
                        {(() => {
                            const victoryImage =
                                spriteImagesRef.current.get("victory");
                            const startButton = spriteImagesRef.current.get("start");
                            if (victoryImage && startButton) {
                                return (
                                    <>
                                        <img
                                            src={victoryImage.src}
                                            alt="Victory!"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                            }}
                                        />
                                        <img
                                            src={startButton.src}
                                            alt="Play Again"
                                            onClick={startGame}
                                            className={styles.victoryButton}
                                        />
                                    </>
                                );
                            }
                            return <p>Loading victory screen...</p>;
                        })()}
                    </div>
                )}
            </div>
        </View>
    );
};

const meta: Meta = {
    title: "Games/Math Blaster",
    component: MathBlasterGame,
    parameters: {
        docs: {
            description: {
                component:
                    "An endless runner game where players answer math questions to jump over obstacles. " +
                    "Features Perseus widget integration for questions, with support for addition, subtraction, " +
                    "multiplication, and division using numeric-input, expression, and radio widgets.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof MathBlasterGame>;

export const Default: Story = {};
