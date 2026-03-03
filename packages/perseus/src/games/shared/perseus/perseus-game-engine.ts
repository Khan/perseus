/**
 * Perseus Game Engine Interface
 *
 * Standard interface that all educational games must implement
 * to integrate Perseus questions.
 *
 * This ensures consistent behavior across all games.
 */
import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Interface for game engines that integrate Perseus questions
 *
 * All educational games should implement this interface to provide
 * a consistent way for React components to interact with Perseus questions.
 */
export interface PerseusGameEngine {
    /**
     * Get the currently active Perseus question
     *
     * @returns The current question, or null if no question is active
     */
    getCurrentQuestion(): PerseusItem | null;

    /**
     * Submit an answer to the current question
     *
     * Called by React when the player submits an answer through the Perseus widget.
     *
     * @param correct - Whether the answer was correct
     * @param earnedPoints - Points earned (typically 1 for correct, 0 for incorrect)
     */
    submitAnswer(correct: boolean, earnedPoints: number): void;

    /**
     * Register a callback for when the question changes
     *
     * The game engine should call this callback when:
     * - A new question is presented to the player
     * - A question is answered and removed
     * - The game ends and all questions are cleared
     *
     * @param callback - Function to call with the new question (or null)
     */
    onQuestionChange(callback: (question: PerseusItem | null) => void): void;
}

/**
 * Example usage:
 *
 * ```typescript
 * class MyGameEngine implements PerseusGameEngine {
 *     private currentQuestion: PerseusItem | null = null;
 *     private callback: ((question: PerseusItem | null) => void) | null = null;
 *
 *     getCurrentQuestion(): PerseusItem | null {
 *         return this.currentQuestion;
 *     }
 *
 *     submitAnswer(correct: boolean, earnedPoints: number): void {
 *         // Handle answer in game logic
 *         if (correct) {
 *             this.score += earnedPoints;
 *         } else {
 *             this.lives -= 1;
 *         }
 *         this.currentQuestion = null;
 *         this.notifyQuestionChange();
 *     }
 *
 *     onQuestionChange(callback: (question: PerseusItem | null) => void): void {
 *         this.callback = callback;
 *     }
 *
 *     private presentQuestion(question: PerseusItem): void {
 *         this.currentQuestion = question;
 *         this.notifyQuestionChange();
 *     }
 *
 *     private notifyQuestionChange(): void {
 *         if (this.callback) {
 *             this.callback(this.currentQuestion);
 *         }
 *     }
 * }
 * ```
 */
