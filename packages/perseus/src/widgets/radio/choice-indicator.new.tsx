import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";

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
    const {checked, showCorrectness} = props;
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
              // eslint-disable-next-line no-console
              console.log("handleClick in indicator", event);
              // eslint-disable-next-line no-console
              console.log("event.stopPropagation()");
              event.stopPropagation();
              // eslint-disable-next-line no-console
              console.log("preventing default");
              event.preventDefault();

              props.updateChecked(!checked);
          };

    return (
        <button
            aria-pressed={checked}
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
