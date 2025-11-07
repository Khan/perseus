import * as React from "react";
import {useEffect, useState} from "react";

import styles from "./car-bonus-scene.module.css";
import car1Img from "./car1.png";
import car2Img from "./car2.png";

type CarState = "sliding" | "intact" | "flickering" | "destroyed" | "complete";

type CarBonusSceneProps = {
    onComplete: () => void;
};

export const CarBonusScene = ({onComplete}: CarBonusSceneProps) => {
    const [carState, setCarState] = useState<CarState>("sliding");
    const [displayText, setDisplayText] = useState("");
    const [flickerSprite, setFlickerSprite] = useState<"car1" | "car2">("car1");

    useEffect(() => {
        const fullText = "BONUS LEVEL";
        const targetLength = Math.floor(fullText.length * 0.75); // 75% of the way
        let currentIndex = 0;

        // Car slides in for 800ms, then stops
        const slideTimer = setTimeout(() => {
            setCarState("intact");
        }, 800);

        // Start typing after car stops (wait 800ms for slide + 300ms pause)
        const typingStartDelay = 1100;

        // Type each letter with 150ms delay
        const typingInterval = setInterval(() => {
            if (currentIndex < targetLength) {
                setDisplayText(fullText.substring(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 150);

        // Start flickering at 75% of typing (after typing completes)
        const flickerStartTime = typingStartDelay + targetLength * 150;
        let flickerInterval: ReturnType<typeof setInterval>;

        const flickerTimer = setTimeout(() => {
            setCarState("flickering");
            // Rapidly swap between sprites
            flickerInterval = setInterval(() => {
                setFlickerSprite((prev) => (prev === "car1" ? "car2" : "car1"));
            }, 80); // Very fast flicker
        }, flickerStartTime);

        // Final explosion after 500ms of flickering
        const explodeTimer = setTimeout(() => {
            if (flickerInterval !== undefined) {
                clearInterval(flickerInterval);
            }
            setCarState("destroyed");
            // Update text after explosion
            setTimeout(() => {
                setDisplayText("oh. Nevermind.");
            }, 300);
        }, flickerStartTime + 500);

        // Complete sequence after showing "oh. Nevermind." for 2s
        const completeTimer = setTimeout(
            () => {
                setCarState("complete");
                onComplete();
            },
            flickerStartTime + 500 + 2300,
        );

        // Cleanup timers on unmount
        return () => {
            clearTimeout(slideTimer);
            clearInterval(typingInterval);
            clearTimeout(flickerTimer);
            if (flickerInterval !== undefined) {
                clearInterval(flickerInterval);
            }
            clearTimeout(explodeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    const isSliding = carState === "sliding";
    const showCar = carState !== "complete";

    // Determine which sprite to show
    let carSprite = car1Img;
    if (carState === "destroyed") {
        carSprite = car2Img;
    } else if (carState === "flickering") {
        carSprite = flickerSprite === "car1" ? car1Img : car2Img;
    }

    return (
        <div className={styles.overlay}>
            {displayText && (
                <div className={styles.text}>
                    {displayText}
                    {carState === "intact" && (
                        <span className={styles.cursor}>_</span>
                    )}
                </div>
            )}
            {showCar && (
                <div
                    className={`${styles.carContainer} ${isSliding ? styles.sliding : styles.stopped}`}
                >
                    <img
                        src={carSprite}
                        alt={
                            carState === "destroyed"
                                ? "Destroyed car"
                                : "Intact car"
                        }
                        className={styles.carImage}
                    />
                </div>
            )}
        </div>
    );
};
