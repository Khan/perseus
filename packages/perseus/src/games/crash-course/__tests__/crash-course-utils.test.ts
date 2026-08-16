/**
 * Baseline tests for Crash Course utility functions
 *
 * These tests capture the current behavior before refactoring.
 */
import {createObstacle, generateQuestion} from "../../../__docs__/math-blaster-utils";

describe("Crash Course Utils (Baseline)", () => {
    describe("generateQuestion", () => {
        it("generates a valid Perseus item structure", () => {
            //Arrange, Act
            const question = generateQuestion();

            //Assert
            expect(question).toHaveProperty("question");
            expect(question).toHaveProperty("answerArea");
            expect(question).toHaveProperty("itemDataVersion");
            expect(question).toHaveProperty("hints");
            expect(question.question).toHaveProperty("content");
            expect(question.question).toHaveProperty("images");
            expect(question.question).toHaveProperty("widgets");
        });
    });

    describe("createObstacle", () => {
        it("creates obstacle at specified x position", () => {
            //Arrange, Act
            const obstacle = createObstacle(800);

            //Assert
            expect(obstacle.x).toBe(800);
        });

        it("creates obstacle with correct dimensions", () => {
            //Arrange, Act
            const obstacle = createObstacle(500);

            //Assert
            expect(obstacle.width).toBe(154); // Car sprite at 0.6 scale
            expect(obstacle.height).toBe(154);
            expect(obstacle.y).toBe(0); // Ground level
        });

        it("creates obstacle with a question", () => {
            //Arrange, Act
            const obstacle = createObstacle(600);

            //Assert
            expect(obstacle.question).toBeDefined();
            expect(obstacle.question).toHaveProperty("question");
            expect(obstacle.question.question).toHaveProperty("content");
        });

        it("creates obstacle with unique id", () => {
            //Arrange, Act
            const obstacle1 = createObstacle(100);
            const obstacle2 = createObstacle(200);

            //Assert
            expect(obstacle1.id).not.toBe(obstacle2.id);
            expect(obstacle1.id).toMatch(/^obstacle-/);
            expect(obstacle2.id).toMatch(/^obstacle-/);
        });

        it("creates obstacle with default state", () => {
            //Arrange, Act
            const obstacle = createObstacle(400);

            //Assert
            expect(obstacle.answered).toBe(false);
            expect(obstacle.correct).toBe(false);
            expect(obstacle.jumped).toBeUndefined();
            expect(obstacle.racing).toBeUndefined();
        });

        it("creates multiple obstacles with different questions", () => {
            //Arrange, Act
            const obstacles = Array.from({length: 10}, (_, i) =>
                createObstacle(i * 100),
            );

            //Assert
            // Should have different questions (very unlikely to be all the same)
            const uniqueQuestions = new Set(
                obstacles.map((o) => o.question.question.content),
            );
            expect(uniqueQuestions.size).toBeGreaterThan(1);
        });
    });

    describe("Collision Detection (Logic)", () => {
        it("detects collision when obstacle in collision zone", () => {
            //Arrange
            const obstacleX = 100;
            const obstacleWidth = 154;
            const characterX = 100;
            const characterWidth = 128;
            const collisionZoneX = characterX + characterWidth + 20;

            //Act
            const isInZone =
                obstacleX < collisionZoneX &&
                obstacleX + obstacleWidth > characterX;

            //Assert
            expect(isInZone).toBe(true);
        });

        it("no collision when obstacle far to the right", () => {
            //Arrange
            const obstacleX = 800;
            const obstacleWidth = 154;
            const characterX = 100;
            const characterWidth = 128;
            const collisionZoneX = characterX + characterWidth + 20;

            //Act
            const isInZone =
                obstacleX < collisionZoneX &&
                obstacleX + obstacleWidth > characterX;

            //Assert
            expect(isInZone).toBe(false);
        });

        it("no collision when obstacle passed character", () => {
            //Arrange
            const obstacleX = -200; // Passed the character
            const obstacleWidth = 154;
            const characterX = 100;
            const characterWidth = 128;
            const collisionZoneX = characterX + characterWidth + 20;

            //Act
            const isInZone =
                obstacleX < collisionZoneX &&
                obstacleX + obstacleWidth > characterX;

            //Assert
            expect(isInZone).toBe(false);
        });

        it("collision zone is ahead of character", () => {
            //Arrange
            const characterX = 100;
            const characterWidth = 128;

            //Act
            const collisionZoneX = characterX + characterWidth + 20;

            //Assert
            // Collision zone should be to the right of the character
            expect(collisionZoneX).toBe(248);
            expect(collisionZoneX).toBeGreaterThan(characterX + characterWidth);
        });
    });
});
