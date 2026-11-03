import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import restoreIcon from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import crossOutIcon from "@phosphor-icons/core/bold/prohibit-bold.svg";
import React from "react";

import styles from "./cross-out-button.module.css";

export interface CrossOutButtonProps {
    crossedOut: boolean;
    disabled: boolean;
    hidden: boolean;
    label: string;
    onChange: (crossedOut: boolean) => void;
}

/**
 * Render the button that crosses out a multiple choice option or restores it.
 *
 * Sits at the end of its choice's row, after the choice content, so Tab moves
 * from a choice to its cross-out button and then to the next choice.
 */
const CrossOutButton = (props: CrossOutButtonProps) => {
    const {crossedOut, disabled, hidden, label, onChange} = props;

    const handleClick = () => {
        if (!disabled) {
            onChange(!crossedOut);
        }
    };

    /* Notes on ARIA attributes:
          aria-pressed: The button is a toggle; pressed means crossed out.
          aria-disabled: Used after Check. The button stays focusable so
              screen readers can still announce it and its state.
          aria-label: "Cross out choice A". The pressed state is announced
              separately, so the name doesn't change when crossed out.
          aria-hidden (on the wrapper): When the "Cross out answers" toggle is
              off, the button keeps its space (so rows don't shift when the
              toggle changes) but is hidden visually, from the tab order and
              from screen readers.
     */
    /* The wrapper is a <span> so the button isn't a direct child of the
       choice's <li>. Choice styling looks for a pressed button there to show
       a selected choice, and a pressed cross-out button must not match it.
     */
    const slotClasses = hidden
        ? `${styles.slot} ${styles.hidden}`
        : styles.slot;
    return (
        <span className={slotClasses} aria-hidden={hidden || undefined}>
            <button
                aria-disabled={disabled}
                aria-label={label}
                aria-pressed={crossedOut}
                className={styles.button}
                onClick={handleClick}
                type="button"
            >
                <PhosphorIcon
                    aria-hidden={true}
                    icon={crossedOut ? restoreIcon : crossOutIcon}
                />
            </button>
        </span>
    );
};

export default CrossOutButton;
