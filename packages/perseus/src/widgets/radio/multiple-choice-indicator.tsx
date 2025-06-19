import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";
import {useState} from "react";

import styles from "./multiple-choice-indicator.module.css";

export interface IndicatorProps {
    checked: boolean;
    content: string;
    shape: "circle" | "square";
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
}

const Indicator = (props: IndicatorProps) => {
    const [isChecked, setIsChecked] = useState(props.checked);
    const actionType = isChecked ? "progressive" : "neutral";
    const kind = isChecked ? "primary" : "secondary";
    const classes = [styles.base, styles[props.shape + "-shape"]];
    if (props.showCorrectness) {
        classes.push(styles["is-" + props.showCorrectness]);
    }
    const handleClick = () => {
        setIsChecked(!isChecked);
        props.updateChecked(isChecked);
    };

    return (
        <Button
            actionType={actionType}
            className={classes.join(" ")}
            kind={kind}
            size="small"
            onClick={handleClick}
        >
            {props.content}
        </Button>
    );
};

export default Indicator;
