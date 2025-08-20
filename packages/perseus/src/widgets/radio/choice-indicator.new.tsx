import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import React, {useId} from "react";

import styles from "./choice-indicator.module.css";

export interface IndicatorContent {
    visible: string;
    screenReader: string;
    labelledBy?: string;
    describedBy?: string;
}

export interface IndicatorProps {
    buttonRef: React.Ref<HTMLButtonElement>;
    checked: boolean;
    content: IndicatorContent;
    shape: "circle" | "square";
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
}

const Indicator = (props: IndicatorProps) => {
    const {checked, content, showCorrectness} = props;
    const indicatorId = useId();
    const ariaLabelledby = content.labelledBy
        ? `${indicatorId} ${content.labelledBy}`
        : undefined;
    const ariaDisabled = showCorrectness ? "true" : "false";
    const iconImage =
        checked && showCorrectness === "correct"
            ? checkIcon
            : checked && showCorrectness === "wrong"
              ? minusIcon
              : undefined;
    const icon = iconImage ? (
        <PhosphorIcon
            aria-hidden={true}
            className={styles.icon}
            icon={iconImage}
        />
    ) : undefined;
    const classes = [styles.base, styles[props.shape + "-shape"]];
    if (showCorrectness) {
        classes.push(styles["is-" + showCorrectness]);
    }
    const handleClick = showCorrectness
        ? undefined // Don't register anything when showing answers
        : (event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              props.updateChecked(!checked);
          };

    /* Notes on ARIA attributes: (screen reader <==> assistive technology <==> AT)
          aria-pressed: Tells the AT that the button is a toggle button.
          aria-disabled: Used when in review mode.
              We don't disable the button because a learner may want to review
                  the choices and their rationale.
              However, we need to inform the user with AT that the button cannot
                  be changed.
          aria-label: The word "Choice" is prepended to the letter content.
              This helps the learner using AT to distinguish the choice "name"
                  better than if the letter is read alone.
              The word "Correct" is appended when in review mode,
                  and the choice is correct.
          aria-labelledby: Used to build the full text of the choice and associate
                  it with the button.
              It references itself (to get the "Choice A" prefix) and the choice
                  content (e.g. "Choice A: The capital of France is Paris").
              So, while aria-labelledby takes precedence over aria-label,
                  the aria-label provides the proper readout of the choice letter
                  when combined with the choice content.
          aria-describedby: When rationale is present, it is added to the content
                  provided to the AT.
              Since different ATs handle aria-describedby differently, it is
                  understood that the experience may vary.
              The rationale is not added to the aria-labelledby because it could
                  be overwhelming, depending upon what the user is used to.
     */
    return (
        <button
            aria-describedby={content.describedBy}
            aria-disabled={ariaDisabled}
            aria-pressed={checked}
            aria-label={content.screenReader}
            aria-labelledby={ariaLabelledby}
            className={classes.join(" ")}
            id={indicatorId}
            type="button"
            ref={props.buttonRef}
            onClick={handleClick}
        >
            {icon}
            {content.visible}
        </button>
    );
};

export default Indicator;
