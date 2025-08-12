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
            role="img"
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
