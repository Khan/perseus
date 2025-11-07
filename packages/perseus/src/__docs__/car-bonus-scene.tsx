import * as React from "react";
import {useEffect, useRef, useState} from "react";

import bonusGameAudio from "./bonusgame.wav";
import bonus1Img from "./bonus1.png";
import bonus2Img from "./bonus2.png";
import styles from "./car-bonus-scene.module.css";
import explosionAudio from "./explosion.wav";
import nextImg from "./next.png";
import skidImg from "./skid.png";
import tireSquealAudio from "./tires_squal_loop.wav";

type BonusState = "skid" | "bonusLevel" | "explosion" | "complete";

type CarBonusSceneProps = {
    onComplete: () => void;
};

export const CarBonusScene = ({onComplete}: CarBonusSceneProps) => {
    const [bonusState, setBonusState] = useState<BonusState>("skid");
    const [displayText, setDisplayText] = useState("");
    const [flashVisible, setFlashVisible] = useState(true);

    const tireSquealRef = useRef<HTMLAudioElement | null>(null);
    const bonusGameRef = useRef<HTMLAudioElement | null>(null);
    const explosionRef = useRef<HTMLAudioElement | null>(null);

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

        // Phase 1: Skid (show skid image, play tire squeal, show text)
        tireSqueal.play().catch((error) => {
            console.log("Tire squeal audio play failed:", error);
        });

        timers.push(
            setTimeout(() => {
                setDisplayText("Oh. I guess it stopped.");
            }, 500),
        );

        // Phase 2: Bonus Level (show bonus1, flash "BONUS LEVEL" 2 times, play bonus music)
        timers.push(
            setTimeout(() => {
                setBonusState("bonusLevel");
                setDisplayText(""); // Clear previous text

                // Start bonus level music
                bonusGame.play().catch((error) => {
                    console.log("Bonus game audio play failed:", error);
                });

                // Flash "BONUS LEVEL" 2 times (each flash is on + off = 2 cycles per flash)
                let flashCount = 0;
                const flashInterval = setInterval(() => {
                    setFlashVisible((prev) => {
                        const newValue = !prev;
                        // Count complete flashes (when turning visible again after being hidden)
                        if (newValue) {
                            flashCount++;
                            if (flashCount >= 2) {
                                clearInterval(flashInterval);
                            }
                        }
                        return newValue;
                    });
                }, 500); // 500ms on, 500ms off = 1 second per flash
            }, 2500),
        ); // Show skid for 2.5 seconds

        // Phase 3: Explosion (stop music, play explosion, show bonus2, show text)
        // Now 3s for bonus level (was 2s)
        timers.push(
            setTimeout(() => {
                // Abruptly stop bonus music
                if (bonusGameRef.current) {
                    bonusGameRef.current.pause();
                    bonusGameRef.current.currentTime = 0;
                }

                // Play explosion
                explosion.play().catch((error) => {
                    console.log("Explosion audio play failed:", error);
                });

                setBonusState("explosion");
                setFlashVisible(false); // Stop flashing

                // Show explosion text after a brief delay
                setTimeout(() => {
                    setDisplayText("Oh. Maybe not then.");
                }, 300);
            }, 2500 + 3000),
        ); // 2.5s skid + 3s bonus level flashing

        // Phase 4: Complete - now triggered by next button click instead of timer
        // No automatic transition, user must click next button

        // Cleanup
        return () => {
            timers.forEach((timer) => clearTimeout(timer));
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
    if (bonusState === "skid") {
        backgroundImage = skidImg;
    } else if (bonusState === "bonusLevel") {
        backgroundImage = bonus1Img;
    } else if (bonusState === "explosion") {
        backgroundImage = bonus2Img;
    }

    const handleNextClick = () => {
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

            {bonusState === "explosion" && (
                <img
                    src={nextImg}
                    alt="Next"
                    onClick={handleNextClick}
                    className={styles.nextButton}
                />
            )}
        </div>
    );
};
