import * as React from "react";
import {useEffect, useRef, useState} from "react";

import bonusGameAudio from "../games/crash-course/assets/audio/bonusgame.wav";
import bonus1Img from "../games/crash-course/assets/ui/bonus1.png";
import bonus2Img from "../games/crash-course/assets/ui/bonus2.png";
import styles from "./car-bonus-scene.module.css";
import explosionAudio from "../games/crash-course/assets/audio/explosion.wav";
import nextImg from "../games/crash-course/assets/ui/next.png";
import skidImg from "../games/crash-course/assets/ui/skid.png";
import tireSquealAudio from "../games/crash-course/assets/audio/tires_squal_loop.wav";

type BonusState = "skid" | "bonusLevel" | "explosion" | "complete";

type CarBonusSceneProps = {
    onComplete: () => void;
};

export const CarBonusScene = ({onComplete}: CarBonusSceneProps) => {
    const [bonusState, setBonusState] = useState<BonusState>("skid");
    const [displayText, setDisplayText] = useState("");
    const [flashVisible, setFlashVisible] = useState(true);
    const [nevermindFlashVisible, setNevermindFlashVisible] = useState(true);
    const [showSkidImage, setShowSkidImage] = useState(false);

    const tireSquealRef = useRef<HTMLAudioElement | null>(null);
    const bonusGameRef = useRef<HTMLAudioElement | null>(null);
    const explosionRef = useRef<HTMLAudioElement | null>(null);
    const nevermindIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Initialize audio
        const tireSqueal = new Audio(tireSquealAudio);
        tireSqueal.loop = false;
        tireSqueal.volume = 0.7;
        tireSquealRef.current = tireSqueal;

        const bonusGame = new Audio(bonusGameAudio);
        bonusGame.loop = false;
        bonusGame.volume = 0.7;
        bonusGameRef.current = bonusGame;

        const explosion = new Audio(explosionAudio);
        explosion.loop = false;
        explosion.volume = 0.7;
        explosionRef.current = explosion;

        // Sequence timing
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Phase 1a: Black screen + tire squeal (play only 1.5 seconds)
        tireSqueal.play().catch((error) => {
            console.log("Tire squeal audio play failed:", error);
        });

        // Stop tire squeal after 1.5 seconds
        timers.push(
            setTimeout(() => {
                if (tireSquealRef.current) {
                    tireSquealRef.current.pause();
                    tireSquealRef.current.currentTime = 0;
                }
            }, 1500),
        );

        // Phase 1b: Show skid image after black screen
        timers.push(
            setTimeout(() => {
                setShowSkidImage(true);
                setDisplayText("Oh. I guess it stopped.");
            }, 1500),
        );

        // Note: Phase 2 (Bonus Level) is now triggered by user clicking next button on skid screen
        // No automatic transition from skid to bonus level

        // Cleanup
        return () => {
            timers.forEach((timer) => clearTimeout(timer));
            if (nevermindIntervalRef.current) {
                clearInterval(nevermindIntervalRef.current);
            }
            if (tireSquealRef.current) {
                tireSquealRef.current.pause();
                tireSquealRef.current.currentTime = 0;
            }
            if (bonusGameRef.current) {
                bonusGameRef.current.pause();
                bonusGameRef.current.currentTime = 0;
            }
            if (explosionRef.current) {
                explosionRef.current.pause();
                explosionRef.current.currentTime = 0;
            }
        };
    }, [onComplete]);

    // Determine which image to show based on state
    let backgroundImage: string | null = null;
    if (bonusState === "skid" && showSkidImage) {
        backgroundImage = skidImg;
    } else if (bonusState === "bonusLevel") {
        backgroundImage = bonus1Img;
    } else if (bonusState === "explosion") {
        backgroundImage = bonus2Img;
    }

    const handleSkidNext = () => {
        // Transition from skid to bonus level
        setBonusState("bonusLevel");
        setDisplayText(""); // Clear previous text

        // Start bonus level music
        if (bonusGameRef.current) {
            bonusGameRef.current.play().catch((error) => {
                console.log("Bonus game audio play failed:", error);
            });
        }

        // Flash "BONUS LEVEL" continuously for the entire duration
        const flashInterval = setInterval(() => {
            setFlashVisible((prev) => !prev);
        }, 500); // 500ms on, 500ms off

        // After 7 seconds, transition to explosion
        setTimeout(() => {
            clearInterval(flashInterval);

            // Abruptly stop bonus music
            if (bonusGameRef.current) {
                bonusGameRef.current.pause();
                bonusGameRef.current.currentTime = 0;
            }

            // Play explosion
            if (explosionRef.current) {
                explosionRef.current.play().catch((error) => {
                    console.log("Explosion audio play failed:", error);
                });
            }

            setBonusState("explosion");
            setFlashVisible(false);

            // Start flashing "NEVERMIND" text
            nevermindIntervalRef.current = setInterval(() => {
                setNevermindFlashVisible((prev) => !prev);
            }, 500);
        }, 7000); // 7 seconds for bonus level
    };

    const handleExplosionNext = () => {
        // Clear the nevermind flashing interval
        if (nevermindIntervalRef.current) {
            clearInterval(nevermindIntervalRef.current);
        }
        setBonusState("complete");
        onComplete();
    };

    return (
        <div className={styles.overlay}>
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt="Bonus scene"
                    className={styles.backgroundImage}
                />
            )}

            {displayText && (
                <div className={styles.text}>{displayText}</div>
            )}

            {bonusState === "bonusLevel" && flashVisible && (
                <div className={styles.bonusLevelText}>BONUS LEVEL</div>
            )}

            {bonusState === "explosion" && nevermindFlashVisible && (
                <div className={styles.nevermindText}>NEVERMIND</div>
            )}

            {bonusState === "skid" && showSkidImage && (
                <img
                    src={nextImg}
                    alt="Next"
                    onClick={handleSkidNext}
                    className={styles.nextButton}
                />
            )}

            {bonusState === "explosion" && (
                <img
                    src={nextImg}
                    alt="Next"
                    onClick={handleExplosionNext}
                    className={styles.nextButton}
                />
            )}
        </div>
    );
};
