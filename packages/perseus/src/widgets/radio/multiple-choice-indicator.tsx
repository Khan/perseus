import Button from "@khanacademy/wonder-blocks-button";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";
import {useState} from "react";

import styles from "./multiple-choice-indicator.module.css";

export type IndicatorProps = {
    checked: boolean;
    content: string;
    shape: "circle" | "square";
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
};

const Indicator = (props: IndicatorProps) => {
    const showCorrectness = props.showCorrectness;
    const [isChecked, setIsChecked] = useState(props.checked);
    const actionType = isChecked ? "progressive" : "neutral";
    const kind = isChecked ? "primary" : "secondary";
    const icon =
        isChecked && showCorrectness === "correct"
            ? checkIcon
            : isChecked && showCorrectness === "wrong"
              ? minusIcon
              : undefined;
    const classes = [styles.base, styles[props.shape + "-shape"]];
    if (showCorrectness) {
        classes.push(styles["is-" + showCorrectness]);
    }
    const handleClick = showCorrectness
        ? undefined // Don't register anything when showing answers
        : () => {
              setIsChecked(!isChecked);
              props.updateChecked(isChecked);
          };

    return (
        <Button
            aria-pressed={isChecked}
            actionType={actionType}
            className={classes.join(" ")}
            kind={kind}
            startIcon={icon}
            size="small"
            onClick={handleClick}
        >
            {props.content}
        </Button>
    );
};

export default Indicator;
