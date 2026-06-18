/**
 * Controlled list of answer choices, handles adding and removing answers.
 */

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import minusCircleIcon from "@phosphor-icons/core/regular/minus-circle.svg";
import plusCircleIcon from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";

import styles from "./answer-choices.module.css";

interface AddAnswerProps {
    // Callback to add new answer choice.
    onClick: () => void;
    editingDisabled: boolean;
}

interface AnswerProps {
    // The answer string, can be plain text or a TeX expression.
    answer: string;
    // Callback for when an answer is changed.
    onChange: (answer: string) => void;
    // Callback to remove answer from list of choices.
    onRemove: () => void;
    editingDisabled: boolean;
}

export interface AnswerChoicesProps {
    // The list of possible answers in a specific order.
    choices: ReadonlyArray<string>;
    // Callback for when answers change.
    onChange: (choices: ReadonlyArray<string>) => void;
    // Whether the editor is disabled. Can be set via API options
    // to make the editor read-only when needed.
    editingDisabled: boolean;
}

/**
 * A button to add a new answer.
 */
const AddAnswer = ({
    onClick,
    editingDisabled,
}: AddAnswerProps): React.ReactElement => (
    <Clickable
        className={styles.addAnswer}
        disabled={editingDisabled}
        onClick={onClick}
    >
        {() => (
            <span className={styles.addAnswerContent}>
                <PhosphorIcon
                    icon={plusCircleIcon}
                    size="medium"
                    aria-hidden={true}
                />
                Add an answer choice
            </span>
        )}
    </Clickable>
);

/**
 * An answer item in the choices list.
 */
const Answer = ({
    answer,
    onChange,
    onRemove,
    editingDisabled,
}: AnswerProps): React.ReactElement => (
    <li className={styles.answer}>
        <Clickable
            className={styles.removeButton}
            aria-label="Remove answer"
            onClick={onRemove}
            disabled={editingDisabled}
        >
            {() => (
                <span className={styles.removeButtonContent}>
                    <PhosphorIcon
                        icon={minusCircleIcon}
                        size="medium"
                        aria-hidden={true}
                    />
                </span>
            )}
        </Clickable>

        <FormWrappedTextField
            grow={1}
            onChange={(e) => onChange(e.target.value)}
            value={answer}
        />
    </li>
);

/**
 * The list of choices, handles adding, removing and reording of answers.
 */
const AnswerChoices = ({
    choices,
    editingDisabled,
    onChange,
}: AnswerChoicesProps): React.ReactElement => (
    <div>
        <div className={styles.title}>Answer Choices</div>

        <ul className={styles.answers}>
            {choices.map((answer, index) => (
                <Answer
                    answer={answer}
                    key={index}
                    editingDisabled={editingDisabled}
                    // Update answer for choice.
                    onChange={(answer) => {
                        if (editingDisabled) {
                            return;
                        }
                        onChange([
                            ...choices.slice(0, index),
                            answer,
                            ...choices.slice(index + 1),
                        ]);
                    }}
                    // Remove answer from choices.
                    onRemove={() => {
                        if (editingDisabled) {
                            return;
                        }
                        onChange([
                            ...choices.slice(0, index),
                            ...choices.slice(index + 1),
                        ]);
                    }}
                />
            ))}
        </ul>

        <AddAnswer
            editingDisabled={editingDisabled}
            // Append a new empty answer to choices.
            onClick={() => {
                if (editingDisabled) {
                    return;
                }
                onChange([...choices, ""]);
            }}
        />
    </div>
);

export default AnswerChoices;
