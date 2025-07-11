import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";
import {useState} from "react";

import styles from "./choice-indicator.module.css";

export type IndicatorProps = {
    buttonRef: React.Ref<HTMLButtonElement>;
    checked: boolean;
    content: string;
    shape: "circle" | "square";
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
};

const Indicator = (props: IndicatorProps) => {
    const showCorrectness = props.showCorrectness;
    const [isChecked, setIsChecked] = useState(props.checked);
    const iconImage =
        isChecked && showCorrectness === "correct"
            ? checkIcon
            : isChecked && showCorrectness === "wrong"
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
              setIsChecked(!isChecked);
              props.updateChecked(!isChecked);
          };

    return (
        <button
            aria-pressed={isChecked}
            className={classes.join(" ")}
            ref={props.buttonRef}
            onClick={handleClick}
        >
            {icon}
            {props.content}
        </button>
    );
};

export default Indicator;
