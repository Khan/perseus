/**
 * Controlled list of answer choices, handles adding and removing answers.
 */

import {components} from "@khanacademy/perseus";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";
import Link from "../../components/link";
import {gray17} from "../../styles/global-colors";

import styles from "./answer-choices.module.css";

const {Icon} = components;

interface AddAnswerProps {
    // Callback to add new answer choice.
    onClick: () => void;
    // Whether the editor is disabled (read-only).
    editingDisabled: boolean;
}

interface AnswerProps {
    // The answer string, can be plain text or a TeX expression.
    answer: string;
    // Callback for when an answer is changed.
    onChange: (answer: string) => void;
    // Callback to remove answer from list of choices.
    onRemove: () => void;
    // Whether the editor is disabled (read-only).
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

const addIcon = {
    path: "M11 11V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4zm1 13C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
    width: 24,
    height: 24,
} as const;

const removeIcon = {
    path: "M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-5-9a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2H7z",
    width: 24,
    height: 24,
} as const;

const DraggableGripIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
        <filter
            id="draggable-grip-shadow"
            width="112.5%"
            height="116.7%"
            x="-6.2%"
            y="-8.3%"
            filterUnits="objectBoundingBox"
        >
            <feGaussianBlur
                in="SourceAlpha"
                stdDeviation=".5"
                result="shadowBlurInner"
            />

            <feOffset in="shadowBlurInner" dy="1" result="shadowOffsetInner" />

            <feComposite
                in="shadowOffsetInner"
                in2="SourceAlpha"
                k2="-1"
                k3="1"
                operator="arithmetic"
                result="shadowInnerInner"
            />

            <feColorMatrix
                in="shadowInnerInner"
                values="0 0 0 0 0.129411765 0 0 0 0 0.141176471 0 0 0 0 0.17254902 0 0 0 0.2 0"
            />
        </filter>

        <path
            d="M1 4a1 1 0 1 1 0-2h14a1 1 0 0 1 0 2H1zm0 10a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2H1zm0-5a1 1 0 1 1 0-2h14a1 1 0 0 1 0 2H1z"
            fill={gray17}
            filter="url(#draggable-grip-shadow)"
        />
    </svg>
);

/**
 * A button link to add a new answer.
 */
const AddAnswer = ({
    onClick,
    editingDisabled,
}: AddAnswerProps): React.ReactElement => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid -- TODO(LEMS-2871): Address a11y error
    <Link
        className={
            editingDisabled
                ? `${styles.addAnswer} ${styles.disabledLink}`
                : styles.addAnswer
        }
        aria-disabled={editingDisabled || undefined}
        onClick={onClick}
    >
        <Icon icon={addIcon} size={24} />
        Add an answer choice
    </Link>
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
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid -- TODO(LEMS-2871): Address a11y error, TODO(LEMS-2871): Address a11y error */}
        <Link
            onClick={onRemove}
            className={editingDisabled ? styles.disabledLink : undefined}
            aria-disabled={editingDisabled || undefined}
        >
            <Icon icon={removeIcon} size={24} color="#D92916" />
        </Link>

        <FormWrappedTextField
            grow={1}
            onChange={(e) => onChange(e.target.value)}
            value={answer}
        />

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- TODO(LEMS-2871): Address a11y error */}
        <Link
            className={styles.disabled}
            title="Answer reordering is not implemented."
        >
            <DraggableGripIcon />
        </Link>
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
