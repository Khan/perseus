import React, {useRef} from "react";

import Indicator from "./choice-indicator.new";
import styles from "./choice.module.css";

import type {IndicatorContent} from "./choice-indicator.new";

export interface IndicatorProps {
    checked: boolean;
    children: React.ReactNode | React.ReactNode[];
    indicatorContent: IndicatorContent;
    isMultiSelect: boolean;
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
    "data-testid"?: string;
}

const Choice = (props: IndicatorProps) => {
    const showCorrectness = props.showCorrectness;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const indicatorShape = props.isMultiSelect ? "square" : "circle";
    const clickHandler = showCorrectness
        ? undefined
        : () => {
              buttonRef.current?.click();
          };
    const classes = [styles.choice]
        .concat(showCorrectness ? [styles["is-" + showCorrectness]] : [])
        .join(" ");
    return (
        /*
            A click handler is added to the <li> element to accommodate mouse users.
            Keyboard users will still be able to use the <button> element inside
                the <Indicator>.
            Therefore, WCAG 2.1.1 is still satisfied since functionality is
                aligned with the input method.
         */
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <li className={classes} onClick={clickHandler} data-testid={props["data-testid"]}>
            <Indicator
                buttonRef={buttonRef}
                checked={props.checked}
                content={props.indicatorContent}
                shape={indicatorShape}
                showCorrectness={showCorrectness}
                updateChecked={props.updateChecked}
            />
            {props.children}
        </li>
    );
};

export default Choice;
